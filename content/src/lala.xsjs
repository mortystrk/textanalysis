function fnHandleGet() {
    var answer = "Ok";
    
    $.response.setBody(JSON.stringify(answer));
    $.response.contentType = "text/plain";
    $.response.status = $.net.http.OK;
}


var aCmd = $.request.parameters.get('cmd');
switch(aCmd) {
    case "tryGet": fnHandleGet(); break;
    default:
        $.response.status = $.net.http.OK;
        $.response.setBody("Invalid command: " + aCmd);
}