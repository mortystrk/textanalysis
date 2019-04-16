function DBController(oConnection) {
	if (oConnection) {
		this.oConnection = oConnection;
	} else {
		this.oConnection = $.hdb.getConnection();
	}
}

DBController.prototype.insert = function (aBlogs) {
    try {
        for (var i = 0; i < aBlogs.length; i++) {
            this.oConnection.executeUpdate('INSERT INTO "TA_SCHEMA"."textanalysis.content.src.artifacts.cds::BLOGS"(ID, CONTENT) VALUES("TA_SCHEMA"."textanalysis.content.src.artifacts.sequences::auto_increment".NEXTVAL, ?)', aBlogs[i]);
        }
        this.oConnection.commit();
        return 'Succesfully inserted';
    } catch (e) {
        return e.message;
    }
};
    
DBController.prototype.truncate = function (vTableName) {
    try {
        var query = 'TRUNCATE TABLE ' + vTableName;
        this.oConnection.executeUpdate(query);
        return "Successfully truncated";
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.selectAndCountTM = function () {
    var query = 'SELECT TOP 5 ID FROM "TA_SCHEMA"."$TM_MATRIX_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx"';
    try {
        var queryResult = this.oConnection.executeQuery(query);
        var idCount = queryResult.length;
        return idCount;
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.selectJobIdByName = function (jobName) {
    var query = 'SELECT ID FROM "_SYS_XS"."JOB_SCHEDULES" WHERE JOB_NAME = \'' + jobName + '\'';
    try {
        var queryResult = this.oConnection.executeQuery(query);
        
        var row = queryResult[0];
        var id = row.ID;
        var bigIntId = Number(ctypes.Int64(id));
        
        return bigIntId;
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.selectByColumnName = function () {
    /*var columnsConditions = '';
    
    for (let i = 0; i < columns.length; i++) {
        let checkLastColumn = i + 1;
        if (checkLastColumn === columns.length) {
            columnsConditions += columns[i];
        } else {
            columnsConditions += columns[i] + ', ';
        }
    }
    
    var query = 'SELECT TOP 100 ' + columnsConditions + ' FROM "TA_SCHEMA"."$TM_MATRIX_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx"';*/
    
    try {
        var query = 'SELECT "TM_TERM" AS word, SUM("TM_TERM_FREQUENCY") AS weight FROM "TA_SCHEMA"."$TM_MATRIX_textanalysis.content.src.artifacts.cds::BLOGS.blog_content_idx" GROUP BY TM_TERM HAVING SUM("TM_TERM_FREQUENCY") > 60 ORDER BY SUM("TM_TERM_FREQUENCY") DESC';
        var queryResult = this.oConnection.executeQuery(query);
        
        return queryResult;
    } catch (e) {
        return e.message;
    }
    
    
};

