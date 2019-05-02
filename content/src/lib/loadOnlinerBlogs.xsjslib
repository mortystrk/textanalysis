function loadBlogs (blogsType, destination, client) {
    
    var blogsBody;
    var request, response;
    
    
    switch (blogsType) {
        
        case "people": 
            request = new $.web.WebRequest($.net.http.GET, "/");
            client.request(request, destination);
            response = client.getResponse();
            blogsBody = response.body.asString();
    }
    
    return blogsBody;
}

function getOnlinerBlogsText (bodies) {
    
    var body, content, text;
    var textOfAllBlogs = [];
    
    for (var i = 0; i < bodies.length; i++) {
        
        body = bodies[i];
        content = body.match(/<p>(.*?)<\/p>/g);
        text = '';
        
        for (var j = 0; j < content.length; j++) {
            
            content[j] = content[j].replace(/<p>/g, ' ');
            content[j] = content[j].replace(/<\/p>/g, ' ');
            content[j] = content[j].replace(/<em>/g, ' ');
            content[j] = content[j].replace(/<\/em>/g, ' ');
            
            text += content[j];
        }
        
        textOfAllBlogs.push(text);
    }
    
    return textOfAllBlogs;
}

function cutLinksFromMainBlogPage (mainBlogBody) {
    
    var clearedLinks = [];
    var clearedLink;
    
    var regexp = /<a href=(.*?) class="news-tiles__stub">/g;
    var grimyLinks = mainBlogBody.match(regexp);
    
    regexp = /"(.*?) class/g;
    
    for (var i = 0; i < grimyLinks.length; i++) {
        
        clearedLink = grimyLinks[i];
        clearedLink = clearedLink.replace(/<a href="/, '');
        clearedLink = clearedLink.replace(/" class(.*)/, '');
        
        clearedLinks.push(clearedLink);
    }
    
    return clearedLinks;
}


function extractOnlinerBlog(link, client, destination) {
    
    var request, response, body;
    
    
    try {
        
            if (link.indexOf('https://') === -1) {
            
            request = new $.web.WebRequest($.net.http.GET, link);
            client.request(request, destination);
            response = client.getResponse();
            body = response.body.asString();
        } else {
            
            request = new $.web.WebRequest($.net.http.GET, "");
            client.request(request, link);
            response = client.getResponse();
            body = response.body.asString();
        }
    } catch (e) {
        
        return e.message;
    }

    return body;
}

function extractOnlinerBlogs(links, client, destination) {
    
    var blog;
    var blogs = [];
    client.setTrustStore("Onliner");
    
    for (var i = 0; i < links.length; i++) {
        
        blog = extractOnlinerBlog(links[i], client, destination);
        blogs.push(blog);
    }
    
    return blogs;
}




