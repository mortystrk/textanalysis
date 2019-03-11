function cutBodyText (messyBody) {
    var startTag = '<div class="dm-contentDetail__body-content">';
    var endTag = '</div>';
    var bodyText;
    var tempStr = messyBody;
    var sliceStart, sliceEnd;
    
    sliceStart = tempStr.search(startTag) + startTag.length;
    sliceEnd = tempStr.length;
    tempStr = tempStr.slice(sliceStart, sliceEnd);
    
    sliceStart = 0;
    sliceEnd = tempStr.search(endTag);
    
    bodyText = tempStr.slice(sliceStart, sliceEnd);
    
    return bodyText;
}

function getBodyByLink (link) {
    var client = new $.net.http.Client();
    var req = new $.web.WebRequest($.net.http.GET, "");
    
    client.setTrustStore("Blogs");
    client.request(req, link);
    
    var response = client.getResponse();
    var body = response.body.asString();
    
    return body;
}

function extractTextByLinks (links) {
    var body;
    var text = [];
    
    for (var i = 0; i < links.length; i++) {
        body = getBodyByLink(links[i]);
        text.push(cutBodyText(body));
    }
    
    return text;
}





