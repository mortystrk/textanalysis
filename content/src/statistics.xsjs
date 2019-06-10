var dbController = $.import("textanalysis.content.src.lib", "dbController");
var dbConnection = $.hdb.getConnection();
var controller = new dbController.DBController(dbConnection);

function insert(blog, term) {
	var message = controller.addStatistics(blog, term);
	return message;
}

function prepareArray(statistics) {
	var valideJSON = {
		terms: []
	};

	var entries = [];

	for (var i = 0; i < statistics.length; i++) {
		var entry = {
			term: statistics[i].TERM,
			number: statistics[i].NUMBER
		};

		entries.push(entry);
	}

	for (var j = 0; j < entries.length; j++) {

		valideJSON.terms.push({
			'term': entries[j].term,
			'number': entries[j].number
		});
	}

	return valideJSON;
}

function getStatistics(blog) {
	var statistics = controller.getStatistics(blog);

	var result = prepareArray(statistics);

	return result;
}

var action = $.request.parameters.get('action');

switch (action) {
	case "insert":
		var blog = $.request.parameters.get('blog');
		var term = $.request.parameters.get('term');

		var message = insert(blog, term);

		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify(message));
		$.response.status = $.net.http.OK;

		break;

	case "statistics":
		var blog = $.request.parameters.get('blog');
		var statistics = getStatistics(blog);

		$.response.contentType = "application/json";
		$.response.setBody(JSON.stringify(statistics));
		$.response.status = $.net.http.OK;

		break;
}