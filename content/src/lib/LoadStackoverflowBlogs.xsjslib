function _cleaningLinks (messyLinks) {
    
    var clearedLinks = [];
    var regexpForCleaning1 = /<h2 class="m-post-card__title" itemprop="headline"><a href="/;
    var regexpForCleaning2 = /">(.*)/;
    
    for (var i = 0; i < messyLinks.length; i++) {
        
        messyLinks[i] = messyLinks[i].replace(regexpForCleaning1, '');
        messyLinks[i] = messyLinks[i].replace(regexpForCleaning2, '');
        
        clearedLinks.push(messyLinks[i]);
    }
    
    return clearedLinks;
}

function _getLinksFromBodies (bodies) {
    
    var regexp = /<h2 class="m-post-card__title" (.*)/g;
    var links = [];
    
    for (var i = 0; i < bodies.length; i++) {
        
        var messyLinks = bodies[i].match(regexp);
        var clearedLinks = _cleaningLinks(messyLinks);
        
        Array.prototype.push.apply(links, clearedLinks);
    }
    
    return links;
}

function _extractingBlogsContent (blogs) {
    
    const tag = 'm-post-content">';
    var slicedBlogs = [];
    
    for (var i = 0; i < blogs.length; i++) {
        
        var tempStr = blogs[i];
        var slicedStr;
        
        var startSlice, endSlice;
        
        startSlice = tempStr.search(tag) + tag.length;
        endSlice = tempStr.length;
        slicedStr = tempStr.slice(startSlice, endSlice);
        tempStr = slicedStr;
        
        endSlice = slicedStr.search("</div>");
        slicedStr = slicedStr.slice(0, endSlice);
        
        slicedBlogs.push(slicedStr);
    }
    
    return slicedBlogs;
}

function _getBlogsByLinks (client, destination, links) {
    
    var blogs = [];
    
    client.setTrustStore("Stackoverflow");
    
    try {
        
        for (var i = 0; i < links.length; i++) {
        
            var request = new $.web.WebRequest($.net.http.GET, "");
            client.request(request, links[i]);
            var response = client.getResponse();
            
            blogs.push(response.body.asString());
        }
        
        return blogs;
        
    } catch (e) {
        
        return e.message;
    }
}

function loadingBlogs (connectionInformation, numberOfPages, cleaner, blogsType) {
    
    var bodies = [];
    var request;
    var response;
    
    if (numberOfPages < 1) {
        return bodies;
    }
    
    request = new $.web.WebRequest($.net.http.GET, "/" + blogsType + "/");
    connectionInformation.client.request(request, connectionInformation.destination);
    response = connectionInformation.client.getResponse();
    bodies.push(response.body.asString());
    
    // loop for to get necessary number of blogs pages
    // start from page 2
    if (numberOfPages !== 1) {
        for (var i = 2; i <= numberOfPages; i++) {
            var path = '/company/page/' + i + '/';
            request = new $.web.WebRequest($.net.http.GET, path);
            connectionInformation.client.request(request, connectionInformation.destination);
            response = connectionInformation.client.getResponse();
           // client.close();
    
            bodies.push(response.body.asString());
        }
    }
    
    var links = _getLinksFromBodies(bodies);
    var blogs = _getBlogsByLinks(connectionInformation.client, connectionInformation.destination, links);
    var slicedBlogs = _extractingBlogsContent(blogs);
    
    var commonTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'code', 'li', 'ul', 'ol', 'br', 'b', 'td', 'tr', 'div', 'sup', 'de', 'po', 'i'];
    var compositeTags = ['img', 'a', 'p', 'span', 'ol', 'h1', 'h2', 'h3', 'h4', 'div', 'td', 'de', 'po'];
    var singleTags = ['br'];
    
    var clearedBlogs = [];
    
    for (var j = 0; j < slicedBlogs.length; j++) {
        
        clearedBlogs.push(cleaner.fullCleaning(commonTags, compositeTags, singleTags, slicedBlogs[j]));
    }
    
    return clearedBlogs;
}