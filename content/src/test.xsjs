var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");
var regexp = $.import("textanalysis.content.src.lib", "clearTextByRegExp");
var loader = $.import("textanalysis.content.src.lib", "loadBlogs");
var dbController = $.import("textanalysis.content.src.lib", "dbController");
var extractorBlogInfo =  $.import("textanalysis.content.src.lib", "ExtractingBlogInfo");
var converter = $.import("textanalysis.content.src.lib", "htmlToJson");
var onlinerLoader = $.import("textanalysis.content.src.lib", "loadOnlinerBlogs");
var appleLoader = $.import("textanalysis.content.src.lib", "LoadAppleBlogs");
var stackoverflowLoader = $.import("textanalysis.content.src.lib", "LoadStackoverflowBlogs");
var blogsUpdateController = $.import("textanalysis.content.src.lib", "updateBlogs");

var destinationPackage = "textanalysis.content.src.artifacts.destinations";
var destinationName = "blogs";

var dest = $.net.http.readDestination(destinationPackage, destinationName);
var client = new $.net.http.Client();
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);

function loadData () {
    try {
        var bodies = loader.loadBlogs(dest, 10, client);
        if (bodies.length === 0) {
            $.response.contentType = "application/json";
            $.response.setBody("Number of loading pages is less of 1");
            $.response.status = $.net.http.OK;
        } else {
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
    message += controller.truncate('\"TA_SCHEMA\".\"$TA_TM_IDX\"') + '\n';
    message += controller.truncate('\"TA_SCHEMA\".\"$TM_DOCUMENTS_TM_IDX\"') + '\n';
    message += controller.truncate('\"TA_SCHEMA\".\"$TM_MATRIX_TM_IDX\"') + '\n';
    message += controller.truncate('\"TA_SCHEMA\".\"$TM_TERMS_TM_IDX\"');
    
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

function fetchPeopleOnlinerData() {
    var onlinerDestinationName = "peopleonliner";

    var destination = $.net.http.readDestination(destinationPackage, onlinerDestinationName);
    
    var peopleOnlinerBody = onlinerLoader.loadBlogs("people", destination, client);
    var links = onlinerLoader.cutLinksFromMainBlogPage(peopleOnlinerBody);
    var blogs = onlinerLoader.extractOnlinerBlogs(links, client, destination);
    var textOfAllBlogs = onlinerLoader.getOnlinerBlogsText(blogs);
    return textOfAllBlogs;
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
        
    case "getJSON" :
        
        getJSON();
        
        break;
        
    case "loadAppleBlogs" :
        
        var numberOfLoadingPages = 1;
        var blogs = appleLoader.getAppleBlogs(client, numberOfLoadingPages);
        var message = controller.insertAppleNews(blogs);
        
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(message));
        $.response.status = $.net.http.OK;
        
        break;
        
    default:
    
        //truncateAllData(controller);
        //test();
        
        /*var flag = controller.loadBlogsInfo("sap");
        
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(flag));
        $.response.status = $.net.http.OK;*/
        
    
        /*testTextMiningFunctions("sap");
        
        output += "</body>";
        $.response.contentType = "text/html";
        $.response.setBody(output);*/
        
        //var onlinerPeopleBlogs = fetchPeopleOnlinerData();
        //var message = controller.insertOnlinerPeople(onlinerPeopleBlogs);
        
        //var errorMessage = "Unsupported command";
        //var link = blogsUpdateController.updateBlogs(controller, dest, "SAP");
        
        var stackoverflowDestName = "stackoverflow";
        var numberOfPages = 1;
        
        var stackoverflowDest = $.net.http.readDestination(destinationPackage, stackoverflowDestName);
        
        var companyBlogs = stackoverflowLoader.loadingCompanyBlogs(client, stackoverflowDest, numberOfPages, regexp);
        var codeBlogs = stackoverflowLoader.loadingCodeBlogs(client, stackoverflowDest, numberOfPages, regexp);
        var engineeringBlogs = stackoverflowLoader.loadingEngineeringBlogs(client, stackoverflowDest, numberOfPages, regexp);
        
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify("Ok"));
        $.response.status = $.net.http.OK;
        
        break;
}


