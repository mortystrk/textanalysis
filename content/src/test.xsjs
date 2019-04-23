var parser = $.import("textanalysis.content.src.lib", "linkParsing");
var extractor = $.import("textanalysis.content.src.lib", "extractTextByLinks");
var regexp = $.import("textanalysis.content.src.lib", "clearTextByRegExp");
var loader = $.import("textanalysis.content.src.lib", "loadBlogs");
var dbController = $.import("textanalysis.content.src.lib", "dbController");
var jobManager = $.import("textanalysis.content.src.lib", "tmCheckJobManager");
var extractorBlogInfo =  $.import("textanalysis.content.src.lib", "ExtractingBlogInfo");


var destinationPackage = "textanalysis.content.src.artifacts.destinations";
var destinationName = "blogs";

var dest = $.net.http.readDestination(destinationPackage, destinationName);
var client = new $.net.http.Client();
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);



function test () {
    var blog1 = 'This blog focuses on how to resolve errors in SAP Central Finance project when we are SAP doing code the simulation postings before doing the initial load code. This step SAP is recommended as it gives the errors before the load and those should be resolved before doing the load. It reduces SAP the error in Initial load.Execute Double click on Error messages Click on “Show Error Overview” and it will show the error summary Now select any error and click “Show detail” Copy package detail from here. Now go back to previous screen and filter on package Now it shows which document/company code is in error and what is the exact error all about. This needs to be resolved and then the process needs to be re-executed. Hope it will help users working on CFIN project….';
    var blog2 = 'Application debugging on android phones form a major part of the application development cycle. SAP Fiori Client Cordova android app can offer an easy way to get into the nuts and bolts of a SAP Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic functions of the handset such as the SAP camera, geo-location,SAP  and pretty much anything that SAP the android  SAP device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our SAP Fiori app through our android handset.';
    var blog3 = 'Application debugging on android phones form a major part of the application development cycle. SAP Fiori Client Cordova android app can offer an easy way to get into the nuts and bolts of a SAP Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic SAP functions of the handset such SAP as the camera, geo-location, and pretty much anything that the android device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our SAP Fiori app through our android handset.';
    var blog4 = 'Application debugging on android phones form a major part of the application development cycle. SAP Fiori Client Cordova android app can offer an easy way to get into the nuts and bolts of a SAP Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic functions of the handset such SAP as the camera, geo-location, and pretty much anything that the android device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our SAP Fiori app through our android handset.';
    var blog5 = 'Application debugging on SAP android phones form a major part of SAP the application development cycle. SAP Fiori Client Cordova android app can offer an easy way to get into the SAP nuts and bolts of a SAP Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic functions of the handset such as the camera, SAP geo-location, and pretty much anything that the android device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our SAP Fiori app through our android handset.';
    var blog6 = 'Application debugging on android phones form a major part of the application development cycle. SAP Fiori Client Cordova android  SAP app can offer an easy way to get into the nuts and bolts of a SAP Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic functions of the handset such as the camera, geo-location, and pretty much anything that the android device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our SAP Fiori app through our android handset.';
    var blog7 = 'Application debugging on android phones form a major part of the application development cycle.  Fiori Client Cordova  android app can offer an easy way to get into the nuts and bolts of a  Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic functions of the handset such as the camera, geo-location, and pretty much anything that the android device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our Fiori app through our android handset.';

    var blog8 = 'Application debugging on android phones form a major part of the application development cycle. SAP Fiori Client Cordova android app can offer an easy way to get into the nuts and bolts of a SAP Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic functions of the handset such as the camera, geo-location, and pretty much anything that the android device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our SAP Fiori app through our android handset.  database table, where the text is put into one column and the assigned subject category value is put into another column. Text analysis is performed on the text, which allows the base forms and parts of speech of words to be used as terms by text mining. Then text mining is initialized on this reference document table to generate the internal TermDocument matrix data that is needed for text mining functions. At run time, you receive a new test document that you want to classify. The role of the text mining functions at run time is to analyze the input document and determine the K documents from the reference set that are most similar to it based on the terms used. Text mining automatically determines which terms are sLJnLficant';
    var blog9 = 'Application debugging on android phones form a major part of the application development cycle. SAP Fiori Client Cordova android app can offer an easy way to get into the nuts and bolts of a SAP Fiori application through an android device for the purpose of debugging the code and ensuring it works as expected. The Fiori Client App is based in Android and allows for interaction with all of the basic functions of the handset such as the camera, geo-location, and pretty much anything that the android device offers in terms of functionality to its native applications. For this particular explanation, we’re going to use a standard android device for the handset and a MacBook Pro, with Google Chrome installed on it. Let’s dive right into debugging our SAP Fiori app through our android handset.';

    
    var info1 = { text: blog1, title: 'title1', author: 'author1', link: 'link1' };
    var info2 = { text: blog2, title: 'title2', author: 'author2', link: 'link2' };
    var info3 = { text: blog3, title: 'title2', author: 'author2', link: 'link2' };
    var info4 = { text: blog4, title: 'title2', author: 'author2', link: 'link2' };
    var info5 = { text: blog5, title: 'title2', author: 'author2', link: 'link2' };
    var info6 = { text: blog6, title: 'title2', author: 'author2', link: 'link2' };
    var info7 = { text: blog7, title: 'title2', author: 'author2', link: 'link2' };
    var info8 = { text: blog8, title: 'title2', author: 'author2', link: 'link2' };
    var info9 = { text: blog9, title: 'title2', author: 'author2', link: 'link2' };
    var blogs = [];
    /*blogs.push(info1);
    blogs.push(info2);
    blogs.push(info3);
    blogs.push(info4);
    blogs.push(info5);
    blogs.push(info6);
    blogs.push(info7);*/
    blogs.push(info8);
    blogs.push(info9);
    
    controller.insert(blogs);
}


var output = "<body>";
output += "<h2>Text Mining function test</h2>";

function displayID (results) {
    var propertyName = "ID";
    var result = null;
    var IDs = [];
    output += "<table border='1'>";
	
	// Get and save property names from first result row and put in the table header.
	output += "<tr>";
	output += "<th>" + propertyName + "</th>";
	output += "</tr>";

	// For each result row, put in the table property values.
	for (var row = 0; row < results.length; ++row) {
		result = results[row];
		output += "<tr>";
		output += "<td>" + result[propertyName].slice(0,50) + "</td>";
		output += "</tr>";
		
		IDs.push(result[propertyName].slice(0,50));
	}
    
    controller.insertID(IDs);
	output += "</table>";
}

function displayResults(results) {
	var propName = null;
	var propNames = [];
	var result = null;
	var row = 0;
	var col = 0;

	if (results.length === 0) {
		output += "<p>(empty result table)</p>";
		return;
	}

	output += "<table border='1'>";
	
	// Get and save property names from first result row and put in the table header.
	output += "<tr>";
	for (propName in results[0]) {
		if (results[0].hasOwnProperty(propName)) {
			propNames[propNames.length] = propName;
			output += "<th>" + propName + "</th>";
		}
	}
	output += "</tr>";

	// For each result row, put in the table property values.
	for (row = 0; row < results.length; ++row) {
		result = results[row];
		output += "<tr>";
		for (col = 0; col < propNames.length; ++col) {
			output += "<td>" + result[propNames[col]].slice(0,50) + "</td>";
		}
		output += "</tr>";
	}

	output += "</table>";
}

function testTextMiningFunctions (tag) {
    try {
	output += "<p>create session</p>";
	var TM = new $.text.mining.Session({
	    referenceTable: '"TA_SCHEMA"."textanalysis.content.src.artifacts.cds::BLOGS"',
	    referenceColumn: "CONTENT"
	});
	
	output += "<p>initialize</p>";
	var init = TM.initialize({	});
	
	output += "<p>getRelevantDocuments</p>";
	var documentResults = TM.getRelevantDocuments({
		top: 16,
		inputTermText: tag,
		includeColumns: ["ID", "CONTENT"]
	});
	displayID(documentResults);

	output += "<p>Done -- no errors detected.</p>";
}
catch(err) {
	output += "<p>" + err + "</p>";
}
}


function loadData () {
    try {
        var bodies = loader.loadBlogs(dest, 1, client);
        if (bodies.length === 0) {
            $.response.contentType = "application/json";
            $.response.setBody("Number of loading pages is less of 1");
            $.response.status = $.net.http.OK;
        } else {
            var links = parser.getLinkArray2(bodies);

            var allBlogs = extractor.extractBlogsInfo(links, client, extractorBlogInfo);
       
            var commonTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'code', 'li', 'ul', 'ol', 'br', 'b', 'td', 'tr', 'div', 'sup'];
            var compositeTags = ['img', 'a', 'p', 'span', 'ol', 'h1', 'h2', 'h3', 'h4', 'div'];
            var singleTags = ['br'];
            
            var clearedBlogs = [];
            var clearedBlogsWithInfo = [];
            
            for (var i = 0; i < allBlogs.length; i++) {
                let clearedText = regexp.fullCleaning(commonTags, compositeTags, singleTags, allBlogs[i].text);
                let blogWithInfo = { text: clearedText, title: allBlogs[i].title, author: allBlogs[i].author, link: allBlogs[i].link };
                clearedBlogsWithInfo.push(blogWithInfo);
                //clearedBlogs.push(regexp.fullCleaning(commonTags, compositeTags, singleTags, allBlogs[i].text));
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
    
        //truncateAllData(controller);
        //test();
        
        var flag = controller.loadBlogsInfo("sap");
        
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(flag));
        $.response.status = $.net.http.OK;
        
    
        /*testTextMiningFunctions("sap");
        
        output += "</body>";
        $.response.contentType = "text/html";
        $.response.setBody(output);*/
        
        /*var errorMessage = "Unsupported command";
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(controller.testSelect(5487)));
        $.response.status = $.net.http.OK;*/
        
        break;
}


