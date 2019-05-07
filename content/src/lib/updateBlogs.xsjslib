/*
        + 1) get a last entry from the blogs table
        + 2) get a link value from this entry
    3) download the first page of a sap blog
    4) get array of blogs links from this page
    5) compare stored link with links received
    6) if stored link contains in the array then save array position of this link and download all links before
    7) if stored link doesn't contains in the array then download new page and reply previous steps
*/
function _getLinkForUpperBlog (controller, table) {
    
    var link = controller.selectLinkForUpperBlog(table);
    
    return link;
}

function _downloadBlogs (client, destination, link, numberOfPage) {
    
    
}

function updateBlogs (client, controller, destination, blogType) {
    
    var tableName, linkForUpperBlog;
    
    switch (blogType) {
        
        case "SAP": 
            tableName = 'textanalysis.content.src.artifacts.cds::BLOGS';
            
            break;
    }
    
    linkForUpperBlog = _getLinkForUpperBlog(controller, tableName);
    
    return linkForUpperBlog;
}