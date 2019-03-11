var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");
var regexp = $.import("textanalysis.content.src.lib", "clearTextByRegExp");

var destination_package = "textanalysis.content.src.artifacts.destinations";
var destination_name = "blogs";

try {
       var dest = $.net.http.readDestination(destination_package, destination_name);
       var client = new $.net.http.Client();
       var req = new $.web.WebRequest($.net.http.GET, "/"); 
       client.request(req, dest);
       var response = client.getResponse();
       
       var xmlString = response.body.asString();
       
       var links = parser.getLinkArray(xmlString);

       var allBlogs = extractor.extractTextByLinks(links);
       
       var commonTags = ['p', 'h2', 'h3', 'strong', 'em', 'code', 'li', 'ul', 'br', 'b'];
       var compositeTags = ['img', 'a', 'p', 'span'];
       var singleTags = ['br'];
       var clearText = regexp.fullCleaning(commonTags, compositeTags, singleTags, allBlogs[2]);

    $.response.contentType = "application/json";
       $.response.setBody(clearText);
       $.response.status = $.net.http.OK;
} catch (e) {
       $.response.contentType = "text/plain";
       $.response.setBody(e.message);
}