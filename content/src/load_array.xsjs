var dbController = $.import("textanalysis.content.src.lib", "dbController");
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);

function _prepareJSON (wrongJSON) {
    var valideJSON = [];
    
    for (let i = 0; i < wrongJSON.length; i++) {
        let jsonEntry = { word : wrongJSON[i].WORD, weight : wrongJSON[i].WEIGHT };
        valideJSON.push(jsonEntry);
    }
    
    return valideJSON;
}

function _getArray (blogType) {
    
    var tmMatrixTable;
    var numberOfTop = 25;
    var termsTypes = ['ORGANIZATION/COMMERCIAL', 'ORGANIZATION/EDUCATIONAL', 'PRODUCT'];
    
    switch (blogType) {
    
        case "SAP" : 
            
            tmMatrixTable = '$TM_MATRIX_TM_IDX';
            
            break;
            
        case "APPLE" : 
            
            tmMatrixTable = '$TM_TERMS_TM_APPLE_IDX';
            
            break;
            
        case "STACK_COM" : 
            
            tmMatrixTable = '$TM_MATRIX_TM_SOF_COMPANY_IDX';
            
            break;
            
        case "STACK_CODE" : 
            
            tmMatrixTable = '$TM_MATRIX_TM_SOF_CODE_IDX';
            
            break;
            
        case "STACK_ENG" : 
            
            tmMatrixTable = '$TM_MATRIX_TM_SOF_ENG_IDX';
            
            break;
            
        default:
        
            var errorMessage = { code: -1, result: "wrong parameter" };
            return errorMessage;
    }
    
    var result = controller.selectTermArray(tmMatrixTable, numberOfTop, termsTypes);
    
    return result;
}

var blogType = $.request.parameters.get('blogtype');

var result = _getArray(blogType);

if (result.code === 0) {
            
    var valideJSON = _prepareJSON(result.result);
            
    $.response.contentType = "application/json";
    $.response.setBody(JSON.stringify(valideJSON));
    $.response.status = $.net.http.OK;
            
    } else {
            
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(result.result));
        $.response.status = $.net.http.OK;
    }
