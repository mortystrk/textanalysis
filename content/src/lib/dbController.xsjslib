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
            this.oConnection.executeUpdate('INSERT INTO "SYSTEM"."BLOGS"(BLOGCONTENT) VALUES(?)', aBlogs[i]);
        }
        this.oConnection.commit();
        var message = 'Succesfully inserting';
        return message;
    } catch (e) {
        return e.message;
        
    }
    
    
    
	/*if (vTarget) {
		if (aParameters) {
			this.oConnection.executeUpdate("INSERT INTO " + vName + "(" + vTarget + ") " + vSource, aParameters);
		} else {
			this.oConnection.executeUpdate("INSERT INTO " + vName + "(" + vTarget + ") " + vSource);
		}
	} else {
		if (aParameters) {
			this.oConnection.executeUpdate("INSERT INTO " + vName + " " + vSource, aParameters);
		} else {
			this.oConnection.executeUpdate("INSERT INTO " + vName + " " + vSource);
		}
	}*/
};
