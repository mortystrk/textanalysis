function getLink (xmlString) {
    const tag = 'div class="dm-contentListItem__title"';
    var tempStr = xmlString;
    var slicedStr;
    
    var startSlice, endSlice;
    
    startSlice = tempStr.search(tag) + tag.length;
    endSlice = tempStr.length;
    slicedStr = tempStr.slice(startSlice, endSlice);
    tempStr = slicedStr;
    
    endSlice = slicedStr.search("</div>");
    slicedStr = slicedStr.slice(0, endSlice);
    
    var hrefOffset = 6;
    startSlice = slicedStr.search("href=") + hrefOffset;
    slicedStr = slicedStr.slice(startSlice, slicedStr.length);
    
    var titleOffset = 2;
    endSlice = slicedStr.search("title") - titleOffset;
    
    slicedStr = slicedStr.slice(0, endSlice);
    var link = slicedStr;
    
    var result = {};
    
    result.link = link;
    result.cutString = tempStr;
    
    return result;
}

function getLinkArray (xmlString) {
    const tag = 'div class="dm-contentListItem__title"';
    var tempStr = xmlString;
    var links = [];
    var result;
    var flag;
    
    do {
        result = getLink(tempStr);
        links.push(result.link);
        tempStr = result.cutString;
        flag = tempStr.search(tag);
    } while (flag !== -1);
    
    return links;
}

function getLinkArray2 (bodies) {
    const tag = 'div class="dm-contentListItem__title"';
    var body;
    var links = [];
    var result;
    var flag;
    
    for (let i = 0; i < bodies.length; i++) {
        body = bodies[i];
        
        do {
            result = getLink(body);
            links.push(result.link);
            body = result.cutString;
            flag = body.search(tag);
        } while (flag !== -1);
    }
    
    return links;
}