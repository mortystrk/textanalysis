var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");
var regexp = $.import("textanalysis.content.src.lib", "clearTextByRegExp");
var loader = $.import("textanalysis.content.src.lib", "loadBlogs");
var dbController = $.import("textanalysis.content.src.lib", "dbController");

var destinationPackage = "textanalysis.content.src.artifacts.destinations";
var destinationName = "blogs";

var dest = $.net.http.readDestination(destinationPackage, destinationName);
var client = new $.net.http.Client();
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);

/*try {
       var bodies = loader.loadBlogs(dest, 3, client);
       
       if (bodies.length === 0) {
            $.response.contentType = "application/json";
            $.response.setBody("Number of loading pages is less of 1");
            $.response.status = $.net.http.OK;
        } else {
            var links = parser.getLinkArray(bodies[2]);

            var allBlogs = extractor.extractTextByLinks(links, client);
       
            var commonTags = ['p', 'h1', 'h2', 'h3', 'h4', 'strong', 'em', 'code', 'li', 'ul', 'ol', 'br', 'b'];
            var compositeTags = ['img', 'a', 'p', 'span', 'ol', 'h1', 'h2', 'h3', 'h4'];
            var singleTags = ['br'];
            
            var clearedBlogs = [];
            
            for (var i = 0; i < allBlogs.length; i++) {
                clearedBlogs.push(regexp.fullCleaning(commonTags, compositeTags, singleTags, allBlogs[i]));
            }
            
            //var connection = $.hdb.getConnection();
            //var controller = new dbController.DBController(connection);
            
             var message = controller.insert(clearedBlogs);
            message += controller.truncate('\"TA_SCHEMA\".\"$TA_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"');
            message += controller.truncate('\"TA_SCHEMA\".\"$TM_DOCUMENTS_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"');
            message += controller.truncate('\"TA_SCHEMA\".\"$TM_MATRIX_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"');
            message += controller.truncate('\"TA_SCHEMA\".\"$TM_TERMS_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"');
            $.response.contentType = "application/json";
            $.response.setBody(JSON.stringify(message));
            $.response.status = $.net.http.OK;

            
            var text = ' Hello, &nbsp; Introduction: During SAP PO development all of us at some point in time have come across an issue where we need to re-use methods/functions defined in a Function Library inside our local UDF&#8217;s. It is fairly easy to use UDF&#8217;s of a function library inside Graphical Mapping but when it comes to calling methods written in &#8220;Attributes and methods&#8221; section it becomes tricky. Here we will have a look at a solution to the problem! &nbsp; Solution: I had a requirement where I wrote a Function library(with no UDF&#8217;s) for writing Custom Audit Log Entries and I wanted to call the method defined in Attributes and method of the Function Library inside my message mapping. The aim here is to be able to call the function &#8220;putAuditLogEntry&#8221; inside a message mappings UDF. (why I am not writing these as a UDF in FL itself and using them in the MM&#8230;because I needed to use these methods inside my code multiple times depending on some variables&#8230;.) Step 1) Have a closer look at your Function Library ! Function Library. Now if you look at the highlighted part the Class Name is &#8220;AuditLogEntry&#8221; and the package name is abc.functionlibrary &nbsp; To be able to call this method first add this function library to the definition tab of message mapping. Message Mapping(Definition Tab) &nbsp; Next import the class in the import area of Functions Tab. packageName.className Functions tab &nbsp; Then create an object of the class inside the UDF or globally! &nbsp; Now the final part&#8230;..calling the method &nbsp; Conclusion: This is just a way to access Function Library methods inside a MessageMapping&#8217;s UDF. It gives more flexibility when we are able to use global methods in local Message mapping UDF code instead of using them as UDF&#8217;s in Graphical Mapping. Note: You can also call the UDF&#8217;s defined in the FunctionLibrary in Similar Fashion. &nbsp; &nbsp; Cheers Vinay Mittal &nbsp; ';
            var result = regexp.decodeHtmlCharCodes(text);
            result = regexp.fixSingleQuoteError(result);
            $.response.contentType = "application/json";
            $.response.setBody(result);
            $.response.status = $.net.http.OK;
        } 
} catch (e) {
       $.response.contentType = "text/plain";
       $.response.setBody(JSON.stringify(e.message));
}*/

function loadData () {
    try {
        var bodies = loader.loadBlogs(dest, 10, client);
        if (bodies.length === 0) {
            $.response.contentType = "application/json";
            $.response.setBody("Number of loading pages is less of 1");
            $.response.status = $.net.http.OK;
        } else {
            var links = parser.getLinkArray(bodies[2]);

            var allBlogs = extractor.extractTextByLinks(links, client);
       
            var commonTags = ['p', 'h1', 'h2', 'h3', 'h4', 'strong', 'em', 'code', 'li', 'ul', 'ol', 'br', 'b'];
            var compositeTags = ['img', 'a', 'p', 'span', 'ol', 'h1', 'h2', 'h3', 'h4'];
            var singleTags = ['br'];
            
            var clearedBlogs = [];
            
            for (var i = 0; i < allBlogs.length; i++) {
                clearedBlogs.push(regexp.fullCleaning(commonTags, compositeTags, singleTags, allBlogs[i]));
            }
        
            return controller.insert(clearedBlogs);
            
        }
    } catch (e) {
       return JSON.stringify(e.message);
    }
}

function textMiningTableCheck () {
    //var mainTimer = setTimeout(function runCheck () {
        
    //})
    var response = controller.selectAndCountTM();
    
    $.response.contentType = "application/json";
    $.response.setBody(JSON.stringify(response));
    $.response.status = $.net.http.OK;
}

function truncateAllData (controller) {
    var message = '';
    
    message += controller.truncate('\"TA_SCHEMA\".\"textanalysis.content.src.artifacts.cds::BLOGS\"') + '\n';
    message += controller.truncate('\"TA_SCHEMA\".\"$TA_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"') + '\n';
    message += controller.truncate('\"TA_SCHEMA\".\"$TM_DOCUMENTS_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"') + '\n';
    message += controller.truncate('\"TA_SCHEMA\".\"$TM_MATRIX_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"') + '\n';
    message += controller.truncate('\"TA_SCHEMA\".\"$TM_TERMS_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx\"');
    
    return JSON.stringify(message);
}

function updateData () {
    truncateAllData(controller);
    loadData();
    
    var message = "Successful updated";
    
    $.response.contentType = "application/json";
    $.response.setBody(JSON.stringify(message));
    $.response.status = $.net.http.OK;
}

var func = $.request.parameters.get('func');
switch (func) {
    case "load" :
        
        loadData();
        
        var message = "Successful loaded";
        $.response.contentType = "application/json";
        $.response.setBody(message);
        $.response.status = $.net.http.OK;
        
        break;
        
    case "update" :
        
        updateData();
        
        break;
        
    case "truncate" :
        
        truncateAllData(controller);
        
        var message = "Successful truncated";
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(message));
        $.response.status = $.net.http.OK;
        
        break;
        
    case "count" :
        
        textMiningTableCheck();
        
        break;
        
    default:
        var errorMessage = "Unsupported command";
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(errorMessage));
        $.response.status = $.net.http.OK;
}


