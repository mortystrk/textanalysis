function _cleaningLinks (messyLinks) {
    
    var clearedLinks = [];
    
    for (var i = 0; i < messyLinks.length; i++) {
        
        messyLinks[i] = messyLinks[i].replace(/<a href="/g, '');
        messyLinks[i] = messyLinks[i].replace(/" class="result__item row-anchor/g, '');
        
        clearedLinks.push(messyLinks[i]);
    }

    return clearedLinks;
}

function _prepareLinksFromNewsRoom (newsRooms) {
    
    try {
        
        var regexp = /<a href="(.*) class="result__item row-anchor/g;
        var links = [];
        
        
        for (var i = 0; i < newsRooms.length; i++) {
            
            var messyLinks = newsRooms[i].match(regexp);
            var clearedLinks = _cleaningLinks(messyLinks);
            
            Array.prototype.push.apply(links, clearedLinks);
        }
        
        return links;
        
    } catch (e) {
        
        
    }
}

function _cleaningText (messyText) {
    
    var regexp = /<div class="pagebody-copy">/g;
    var cleanedText = '';
    
    for (var i = 0; i < messyText.length; i++) {
        
        cleanedText += messyText[i].replace(regexp, '');
    }
    
    return cleanedText;
}

function _cleaningBlogsContent (blogsContent) {
    
    var regexp = /<div class="pagebody-copy">(.*)/g;
    var cleanedBlogsText = [];
 
    for (var i = 0; i < blogsContent.length; i++) {
        
        try {
        
            var messyText = blogsContent[i].match(regexp);
            cleanedBlogsText.push(_cleaningText(messyText));
            
        } catch (e) {
        
            continue;
            
        }
        
    }
    
    return cleanedBlogsText;
}

function _getBlogsText (links, client) {
    
    var response;
    var blogsContent = [];
    var url = "https://www.apple.com";
    
    for (var i = 0; i < links.length; i++) {
        
        var request = new $.web.WebRequest($.net.http.GET, links[i]);
        client.request(request, url);
        response = client.getResponse();
        
        blogsContent.push(response.body.asString());
    }
    
    var blogsText = _cleaningBlogsContent(blogsContent);
    
    return blogsText;
}


function _loadNewsRoom (client, numberOfPages) {
    
    try {
        
        var newsRoomBodies = [];
        var response, request;
        var url = "https://www.apple.com/newsroom/archive";
        
        client.setTrustStore("Apple");
        
        for (var i = 1; i <= numberOfPages; i++) {
            var path = "/?page=" + i;
            request = new $.web.WebRequest($.net.http.GET, path);
            client.request(request, url);
            response = client.getResponse();
            newsRoomBodies.push(response.body.asString());
        }
        
        return newsRoomBodies;
        
    } catch (e) {
        
        return e.message;
    }
}

function getAppleBlogs (client, numberOfPages) {
    
    var newsRooms = _loadNewsRoom(client, numberOfPages);
    var links = _prepareLinksFromNewsRoom(newsRooms);
    var blogs = _getBlogsText(links, client);
    
    return blogs;
}