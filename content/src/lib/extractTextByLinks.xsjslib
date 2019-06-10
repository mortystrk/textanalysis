function cutBodyText(messyBody) {
	var startTag = '<div class="dm-contentDetail__body-content">';
	var endTag = '</div>';
	var bodyText;
	var tempStr = messyBody;
	var sliceStart, sliceEnd;

	sliceStart = tempStr.search(startTag) + startTag.length;
	sliceEnd = tempStr.length;
	tempStr = tempStr.slice(sliceStart, sliceEnd);

	sliceStart = 0;
	sliceEnd = tempStr.search(endTag);

	bodyText = tempStr.slice(sliceStart, sliceEnd);

	return bodyText;
}

function getBodyByLink(link, client, extractor) {
	//var client = new $.net.http.Client();

	var req = new $.web.WebRequest($.net.http.GET, "");

	client.setTrustStore("SecureBlogs");
	client.request(req, link);

	var response = client.getResponse();
	var body = response.body.asString();

	var author = extractor.extractAuthors(body);
	var title = extractor.extractTitle(body);

	var blogInfo = {
		author: author,
		body: body,
		title: title
	};

	return blogInfo;
}

function extractBlogsInfo(links, client, extractor) {
	var blogInfo;
	var blogsInfo = [];

	for (var i = 0; i < links.length; i++) {
		try {

			blogInfo = getBodyByLink(links[i], client, extractor);

			var info = {
				title: blogInfo.title,
				text: cutBodyText(blogInfo.body),
				author: blogInfo.author,
				link: links[i]
			};
			blogsInfo.push(info);
		} catch (e) {
			continue;
		}

	}

	return blogsInfo;
}