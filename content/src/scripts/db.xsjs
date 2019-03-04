var connection = $.hdb.getConnection();
var query = 'SELECT TM_TERM FROM "TM_SCHEMA"."$TM_MATRIX_TEST_FULL_INDEX"';

try{
    var rs = connection.executeQuery(query);
} catch(e) {
    $.response.contentType = "text/plain";
    $.response.setBody(e.message);
}

var body = '';

for(var i = 0; i < rs.length; i++){
    body += "Term: " + rs[i]["TM_TERM"] + "\n";
}

$.response.contentType = "text/plain; charset=utf-8";
$.response.setBody(body);
