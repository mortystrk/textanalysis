function DBController(oConnection) {
	if (oConnection) {
		this.oConnection = oConnection;
	} else {
		this.oConnection = $.hdb.getConnection();
	}
}

DBController.prototype.insert = function(aBlogs) {
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
    
DBController.prototype.truncate = function(vTableName) {
    try {
        var query = 'TRUNCATE TABLE ' + vTableName;
        this.oConnection.executeUpdate(query);
        return "Successfully truncated";
    } catch (e) {
        return e.message;
    }
};

