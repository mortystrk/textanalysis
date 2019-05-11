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

DBController.prototype.insertStackoverflowBlogs = function (aBlogs, vTableName) {
    
    try {
        
        for (var i = 0; i < aBlogs.length; i++) {
            
            this.oConnection.executeUpdate('INSERT INTO "TA_SCHEMA"."' + vTableName + '"(ID, CONTENT, AUTHOR, TITLE, LINK) VALUES("TA_SCHEMA"."textanalysis.content.src.artifacts.sequences::auto_increment".NEXTVAL, ?, ?, ?, ?)', aBlogs[i].content, aBlogs[i].author, aBlogs[i].title, aBlogs[i].link);
        
        }
        
        this.oConnection.commit();
        return 'Succesfully inserted';
        
    } catch (e) {
        
        return e.message;
        
    }
};

DBController.prototype.insertOnlinerPeople = function (aBlogs) {
    try {
        for (var i = 0; i < aBlogs.length; i++) {
            this.oConnection.executeUpdate('INSERT INTO "TA_SCHEMA"."textanalysis.content.src.artifacts.cds::ONLINER_PEOPLE_BLOGS"(ID, CONTENT) VALUES("TA_SCHEMA"."textanalysis.content.src.artifacts.sequences::auto_increment".NEXTVAL, ?)', aBlogs[i]);
        }
        this.oConnection.commit();
        return 'Succesfully inserted';
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.insertAppleNews = function (aBlogs) {
    try {
        
        for (var i = 0; i < aBlogs.length; i++) {
            
            this.oConnection.executeUpdate('INSERT INTO "TA_SCHEMA"."textanalysis.content.src.artifacts.cds::APPLE_NEWSROOM"(ID, CONTENT, CATEGORY, TITLE, LINK) VALUES("TA_SCHEMA"."textanalysis.content.src.artifacts.sequences::auto_increment".NEXTVAL, ?, ?, ?, ?)', aBlogs[i].content, aBlogs[i].category, aBlogs[i].title, aBlogs[i].link);
        
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
        
        return true;
        
    } catch (e) {
        
        return false;
        
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

DBController.prototype.selectByColumnName = function () {
    
    try {
        var query = 'SELECT TOP 25 "TM_TERM" AS word, SUM("TM_TERM_FREQUENCY") AS weight FROM "TA_SCHEMA"."$TM_MATRIX_TM_IDX" WHERE TM_TERM_TYPE = \'PRODUCT\' OR TM_TERM_TYPE = \'ORGANIZATION/COMMERCIAL\' GROUP BY TM_TERM ORDER BY SUM("TM_TERM_FREQUENCY") DESC';
        var queryResult = this.oConnection.executeQuery(query);
        
        return queryResult;
    } catch (e) {
        return e.message;
    }
};

DBController.prototype.selectTermArray = function (tmMatrixTable, numberOfTop, termsTypes) {
    
    var termsTypesConditions = '';
    
    for (var i = 0; i < termsTypes.length; i++) {
        
        if (i + 1 !== termsTypes.length) {
            
            termsTypesConditions += "TM_TERM_TYPE = \'" + termsTypes[i] + "\' OR ";
            
        } else {
            
            termsTypesConditions += "TM_TERM_TYPE = \'" + termsTypes[i] + "\' ";
        }
        
    }
    
    var querySelectPart = 'SELECT TOP ' + numberOfTop + ' "TM_TERM" AS word, SUM("TM_TERM_FREQUENCY") AS weight FROM "TA_SCHEMA"."' + tmMatrixTable + '" WHERE ';
    var queryGroupByPart = 'GROUP BY TM_TERM ORDER BY SUM("TM_TERM_FREQUENCY") DESC';
    
    var query = querySelectPart + termsTypesConditions + queryGroupByPart;
    
    try {
        
        var queryResult = this.oConnection.executeQuery(query);
        var successfulMessage = { code: 0, result: queryResult };
        
        return successfulMessage;
        
    } catch (e) {
        
        var errorMessage = { code: -1, result: e.message };
        
        return errorMessage;
        
    }
};

DBController.prototype.selectLinkForUpperBlog = function (tableName) {
    
    try {
        var query = 'SELECT TOP 1 "LINK" FROM "TA_SCHEMA".' + '"' + tableName + '"';
        var queryResult = this.oConnection.executeQuery(query);
        
        return queryResult[0];
    } catch (e) {
        return e.message;
    }
};





