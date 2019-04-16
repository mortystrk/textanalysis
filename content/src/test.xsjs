var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");
var regexp = $.import("textanalysis.content.src.lib", "clearTextByRegExp");
var loader = $.import("textanalysis.content.src.lib", "loadBlogs");
var dbController = $.import("textanalysis.content.src.lib", "dbController");
var jobManager = $.import("textanalysis.content.src.lib", "tmCheckJobManager");

var destinationPackage = "textanalysis.content.src.artifacts.destinations";
var destinationName = "blogs";

var dest = $.net.http.readDestination(destinationPackage, destinationName);
var client = new $.net.http.Client();
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);


function loadData () {
    try {
        var bodies = loader.loadBlogs(dest, 5, client);
        if (bodies.length === 0) {
            $.response.contentType = "application/json";
            $.response.setBody("Number of loading pages is less of 1");
            $.response.status = $.net.http.OK;
        } else {
            var links = parser.getLinkArray2(bodies);

            var allBlogs = extractor.extractTextByLinks(links, client);
       
            var commonTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'code', 'li', 'ul', 'ol', 'br', 'b', 'td', 'tr', 'div'];
            var compositeTags = ['img', 'a', 'p', 'span', 'ol', 'h1', 'h2', 'h3', 'h4', 'div'];
            var singleTags = ['br'];
            
            var clearedBlogs = [];
            
            for (var i = 0; i < allBlogs.length; i++) {
                clearedBlogs.push(regexp.fullCleaning(commonTags, compositeTags, singleTags, allBlogs[i]));
            }
        
            controller.insert(clearedBlogs);
            
            return "Data was inserted";
            
        }
    } catch (e) {
       return JSON.stringify(e.message);
    }
}

function prepareJSON (wrongJSON) {
    var valideJSON = [];
    
    for (let i = 0; i < wrongJSON.length; i++) {
        let jsonEntry = { word : wrongJSON[i].WORD, weight : wrongJSON[i].WEIGHT };
        valideJSON.push(jsonEntry);
    }
    
    return valideJSON;
}

function getJSON () {
    
    var result = controller.selectByColumnName();
    
    var valideJSON = prepareJSON(result);
    
    $.response.contentType = "application/json";
    $.response.setBody(JSON.stringify(valideJSON));
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
        
        var message = loadData();
        
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(message));
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
        
    case "stop" :
        
        jobManager.scheduleManage("stop");
        
        break;
        
    case "getJSON" :
        
        getJSON();
        
        break;
        
    default:
        var errorMessage = "Unsupported command";
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(errorMessage));
        $.response.status = $.net.http.OK;
        
        break;
}


