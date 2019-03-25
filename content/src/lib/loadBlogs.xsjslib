function loadBlogs (destination, numberOfPage, client) {
    var bodies = [];
    var request;
    //var client = new $.net.http.Client();
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
    if (numberOfPage !== 1) {
        for (var i = 2; i <= numberOfPage; i++) {
            request = '/page/' + i + '/';
            webReq = new $.web.WebRequest($.net.http.GET, request);
            client.request(webReq, destination);
            response = client.getResponse();
           // client.close();
    
            bodies.push(response.body.asString());
        }
    }
    
    return bodies;
}