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
            this.oConnection.executeUpdate('INSERT INTO "TA_SCHEMA"."textanalysis.content.src.artifacts.cds::BLOGS"(ID, CONTENT, TITLE, LINK, AUTHOR) VALUES("TA_SCHEMA"."textanalysis.content.src.artifacts.sequences::auto_increment".NEXTVAL, ?, ?, ?, ?)', aBlogs[i].text, aBlogs[i].title, aBlogs[i].link, aBlogs[i].author);
        }
        this.oConnection.commit();
        return 'Succesfully inserted';
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.insertID = function (IDs) {
    try {
        for (var i = 0; i < IDs.length; i++) {
            this.oConnection.executeUpdate('INSERT INTO "TA_SCHEMA"."textanalysis.content.src.artifacts.cds::ID_STORE"(ID) VALUES(?)', IDs[i]);
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

DBController.prototype.testSelect = function (number) {
    var query = 'SELECT CONTENT FROM "TA_SCHEMA"."textanalysis.content.src.artifacts.cds::BLOGS" WHERE ID = ' +  number;
    try {
        var queryResult = this.oConnection.executeQuery(query);
        return queryResult;
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.selectByColumnName = function () {
    
    try {
        var query = 'SELECT TOP 25 "TM_TERM" AS word, SUM("TM_TERM_FREQUENCY") AS weight FROM "TA_SCHEMA"."$TM_MATRIX_TM_IDX" WHERE TM_TERM_TYPE = \'PRODUCT\' OR TM_TERM_TYPE = \'ORGANIZATION/COMMERCIAL\' GROUP BY TM_TERM ORDER BY SUM("TM_TERM_FREQUENCY") DESC';
        var queryResult = this.oConnection.executeQuery(query);
        
        return queryResult;
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.loadBlogsInfo = function (tag) {
    var blogsInfoByTag = this.oConnection.loadProcedure("TA_SCHEMA", "textanalysis.content.src.artifacts.procedures::BlogsInfoByTag");
    var flag = null;
    
    flag = blogsInfoByTag(tag, null);
    
    return flag.FLAG;
};





