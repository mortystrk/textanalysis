var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");
var regexp = $.import("textanalysis.content.src.lib", "clearTextByRegExp");
var loader = $.import("textanalysis.content.src.lib", "loadBlogs");
var dbController = $.import("textanalysis.content.src.lib", "dbController");
        
        var errorMessage = "Unsupported command!!!";
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(errorMessage));
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;