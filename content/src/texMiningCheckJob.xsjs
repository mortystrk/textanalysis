var jobManager = $.import("textanalysis.content.src.lib", "tmCheckJobManager");
var dbController = $.import("textanalysis.content.src.lib", "dbController");

var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);

function textMiningTableCheck () {
    var count = controller.selectAndCountTM();
    
    /*if (count !== 0) {
        jobManager.scheduleManage("stop");
    }*/
}
