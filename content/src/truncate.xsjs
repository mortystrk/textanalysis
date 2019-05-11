var dbController = $.import("textanalysis.content.src.lib", "dbController");
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);

function _truncateData (blogType) {
    
    var idxName = '';
    var tableName = '';
    
    switch (blogType) {
        
        case "SAP" :
            
            idxName = 'TM_IDX';
            tableName = 'textanalysis.content.src.artifacts.cds::BLOGS';
            break;
            
        case "APPLE" : 
            
            idxName = 'TM_APPLE_IDX';
            tableName = 'textanalysis.content.src.artifacts.cds::APPLE_NEWSROOM';
            break;
            
        case "STACK_COMPANY" : 
            
            idxName = 'TM_SOF_COMPANY_IDX';
            tableName = 'textanalysis.content.src.artifacts.cds::STACKOVERFLOW_COMPANY';
            break;
            
        case "STACK_CODE" :
            
            idxName = 'TM_SOF_CODE_IDX';
            tableName = 'textanalysis.content.src.artifacts.cds::STACKOVERFLOW_CODE';
            break;
            
        case "STACK_ENG" :
            
            idxName = 'TM_SOF_ENG_IDX';
            tableName = 'textanalysis.content.src.artifacts.cds::STACKOVERFLOW_ENGINEERING';
            break;
            
        default : 
        
            return false;
    }

    controller.truncate('\"TA_SCHEMA\".\"' + tableName + '\"');
    controller.truncate('\"TA_SCHEMA\".\"$TA_' + idxName + '\"');
    controller.truncate('\"TA_SCHEMA\".\"$TM_DOCUMENTS_' + idxName + '\"');
    controller.truncate('\"TA_SCHEMA\".\"$TM_MATRIX_' + idxName + '\"');
    controller.truncate('\"TA_SCHEMA\".\"$TM_TERMS_' + idxName + '\"');
    
    return true;
}

var blogType = $.request.parameters.get('blogtype');

var flag = _truncateData(blogType);
var message;
    
if (flag) {
    
    message = "Successful truncate";
    
} else {
    
    message = "Error parameter";
        
}
        
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(message));
$.response.status = $.net.http.OK;

