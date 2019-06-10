function loadBlogs (destination, numberOfPage, client) {
    var bodies = [];
    var request;
    var response;
    
    if (numberOfPage < 1) {
        return bodies;
    }
    
    //load first page
    var webReq = new $.web.WebRequest($.net.http.GET, "/");
    client.request(webReq, destination);
    response = client.getResponse();
    //client.close();
    
    bodies.push(response.body.asString());
    
    // loop for to get necessary number of blogs pages
    // start from page 2
    
    var url = 'https://blogs.sap.com';
    client.setTrustStore("SecureBlogs");
    
    if (numberOfPage !== 1) {
        for (var i = 2; i <= numberOfPage; i++) {
            
            request = '/page/' + i + '/';
            webReq = new $.web.WebRequest($.net.http.GET, request);
            client.request(webReq, url);
            response = client.getResponse();
           // client.close();
    
            bodies.push(response.body.asString());
        }
    }
    
    return bodies;
}