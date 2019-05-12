var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");
var regexp = $.import("textanalysis.content.src.lib", "clearTextByRegExp");
var loader = $.import("textanalysis.content.src.lib", "loadBlogs");
var appleLoader = $.import("textanalysis.content.src.lib", "LoadAppleBlogs");
var stackoverflowLoader = $.import("textanalysis.content.src.lib", "LoadStackoverflowBlogs");
var dbController = $.import("textanalysis.content.src.lib", "dbController");
var extractorBlogInfo =  $.import("textanalysis.content.src.lib", "ExtractingBlogInfo");
var destinationPackage = "textanalysis.content.src.artifacts.destinations";

var client = new $.net.http.Client();

var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);


function _loadSapBlogs () {
    
    var destinationName = "blogs";
    var sapDestination = $.net.http.readDestination(destinationPackage, destinationName);
    
    try {
        
        var bodies = loader.loadBlogs(sapDestination, 10, client);

        var links = parser.getLinkArray2(bodies);

        var allBlogs = extractor.extractBlogsInfo(links, client, extractorBlogInfo);
       
        var commonTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'code', 'li', 'ul', 'ol', 'br', 'b', 'td', 'tr', 'div', 'sup', 'de', 'po', 'i'];
        var compositeTags = ['img', 'a', 'p', 'span', 'ol', 'h1', 'h2', 'h3', 'h4', 'div', 'td', 'de', 'po'];
        var singleTags = ['br'];

        var clearedBlogsWithInfo = [];
        var regExp = /&#8211;/g;
        var regExp2 = /&#8217;/g;
        var regExp3 = /&#038;/g;
        var regExp4 = /&#8220;/g;
        var regExp5 = /&#8221;/g;
            
        for (var i = 0; i < allBlogs.length; i++) {
            let clearedText = regexp.fullCleaning(commonTags, compositeTags, singleTags, allBlogs[i].text);
                
            allBlogs[i].title = allBlogs[i].title.replace(regExp, '-');
            allBlogs[i].title = allBlogs[i].title.replace(regExp2, '\'');
            allBlogs[i].title = allBlogs[i].title.replace(regExp3, '&');
            allBlogs[i].title = allBlogs[i].title.replace(regExp4, '"');
            allBlogs[i].title = allBlogs[i].title.replace(regExp5, '"');
                
            let blogWithInfo = { text: clearedText, title: allBlogs[i].title, author: allBlogs[i].author, link: allBlogs[i].link };
            clearedBlogsWithInfo.push(blogWithInfo);
        }
        
        controller.insert(clearedBlogsWithInfo);
        
        return "Data was inserted";

    } catch (e) {
        
       return JSON.stringify(e.message);
       
    }
}

function _loadAppleNewsroom () {
    
    var blogs = appleLoader.getAppleBlogs(client, 4);
    var message = controller.insertAppleNews(blogs);
    
    return message;
}


var blogType = $.request.parameters.get('blogtype');
var message = '';

switch (blogType) {
    
    case "SAP" :
        
        message = _loadSapBlogs();
        
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(message));
        $.response.status = $.net.http.OK;
        
        break;
        
    case "APPLE" :
        
        message = _loadAppleNewsroom();
        
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(message));
        $.response.status = $.net.http.OK;
        
        break;
        
    default :
    
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify("message"));
        $.response.status = $.net.http.OK;
}

















