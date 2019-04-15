var dbController = $.import("textanalysis.content.src.lib", "dbController");
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);

var jobName = "textanalysis.content.src.lib::tm_check";
var job = new $.jobs.Job({
        uri: "tm_check.xsjob"
    });

function scheduleManage (action) {
    
    try {
        if (action === "start") {
            
        var cron = "* * * * * * */3";
        job.schedules.add({
            description: "Enable Text Mining Tables Check",
            xscron: cron
        });
            
        } else if (action === "stop") {
        
            var jobId = controller.selectJobIdByName(jobName);
            job.schedules.delete( {id:  jobId } );
            
            $.response.contentType = "application/json";
            $.response.setBody("Entries are prepared");
            $.response.status = $.net.http.OK;
        }
    } catch (e) {
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(e.message));
        $.response.status = $.net.http.OK;
    }
}