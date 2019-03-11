function clearTextFromSpecialChar (text) {
    var tempStr = text;
    var regExp = /&(.*?);/g;
    
    var clearedText = tempStr.replace(regExp, ' ');
    
    return clearedText;
}

function clearTextFromCompositeTag (tag, text) {
    var startTag = '<' + tag + ' (.*?)>';
    var endTag = '</' + tag + '>';
    var clearedText = text;
    
    clearedText = clearedText.replace(new RegExp(startTag, 'g'), ' ');
    clearedText = clearedText.replace(new RegExp(endTag, 'g'), ' ');
    
    return clearedText;
}

function clearTextFromCommonTag (tag, text) {
    var startTag = '<' + tag + '>';
    var endTag = '</' + tag + '>';
    var clearedText = text;
    
    clearedText = clearedText.replace(new RegExp(startTag, 'g'), ' ');
    clearedText = clearedText.replace(new RegExp(endTag, 'g'), ' ');
    
    return clearedText;
}

function clearTextFromSingleTag (tag, text) {
    var regExp = '<' + tag + ' />';
    var clearedText = text;
    
    clearedText = clearedText.replace(new RegExp(regExp, 'g'), ' ');
    
    return clearedText;
}

function fullCleaning (commonTags, compositeTags, singleTags, text) {
    var clearedText = text;
    
    for( var i = 0; i < commonTags.length; i++) {
        clearedText = clearTextFromCommonTag(commonTags[i], clearedText);
    }
    
    for ( var j = 0; j < compositeTags.length; j++) {
        clearedText = clearTextFromCompositeTag(compositeTags[j], clearedText);
    }
    
    for ( var k = 0; k < singleTags.length; k++) {
        clearedText = clearTextFromSingleTag(singleTags[k], clearedText);
    }
    
    clearedText = clearTextFromSpecialChar(clearedText);
    
    clearedText = clearedText.replace(/\s+/g, " ");
    
    return clearedText;
}









