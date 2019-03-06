var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");

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
       
       var link = links[1];
       
       req = new $.web.WebRequest($.net.http.GET, "");
       client.setTrustStore("Blogs");
       client.request(req, link);
       response = client.getResponse();
       
       var body = response.body.asString();
       var clearBody = extractor.cutBodyText(body);
       var clearText = extractor.clearText(clearBody);
       
    $.response.contentType = "application/json";
       $.response.setBody(clearText);
       //$.response.setBody(link);
       $.response.status = $.net.http.OK;
} catch (e) {
       $.response.contentType = "text/plain";
       $.response.setBody(e.message);
}