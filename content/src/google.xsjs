var destination_package = "textanalysis.content.src.artifacts.destinations";
var destination_name = "google";

try {
       var dest = $.net.http.readDestination(destination_package, destination_name);
       var client = new $.net.http.Client();
       var req = new $.web.WebRequest($.net.http.GET, "?origins=Frankfurt&destinations=Cologne&mode=driving&language=en-US&sensor=false"); 
       client.request(req, dest);
       var response = client.getResponse();  
       
    $.response.contentType = "application/json";
       $.response.setBody(response.body.asString());
       $.response.status = $.net.http.OK;
} catch (e) {
       $.response.contentType = "text/plain";
       $.response.setBody(e.message);
}