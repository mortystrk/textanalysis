// not use for <a> or for <img> tags
function sliceByTag (tag, text) {
    var startTag = '<' + tag + '>';
    var endTag = '</' + tag + '>';
    var clearedText = text;
    
    clearedText = clearedText.replace(new RegExp(startTag, 'g'), ' ');
    clearedText = clearedText.replace(new RegExp(endTag, 'g'), ' ');
    /*var sliceStart, sliceEnd;
    
    while(clearedText.search(startTag) !== -1) {
        
        sliceStart = clearedText.search(startTag);
        sliceEnd = sliceStart + startTag.length;
        
        clearedText = clearedText.slice(sliceStart, sliceEnd);
        
        sliceStart = clearedText.search(endTag);
        sliceEnd = sliceStart + endTag.length;
        
        clearedText = clearedText.slice(sliceStart, sliceEnd);
    }*/
    
    return clearedText;
}

function deleteATag (text) {
    var startTag = '<a';
    var endStartTag = '>';
    var endTag = '</a>';
    var deleteStart, deleteEnd;
    var clearedText = text;
    var tempStr;
    
    while (clearedText.search(startTag) !== -1) {
        deleteStart = clearedText.search(startTag);
        deleteEnd = clearedText.search(endStartTag) + 1;
        
        clearedText = clearedText.slice(deleteStart, deleteEnd);
        
        deleteStart = clearedText.search(endTag);
        deleteEnd = endTag.length;
        
        tempStr = clearedText.slice(deleteStart, deleteEnd);
        clearedText = clearedText.replace(tempStr, ' ');
    }
    
    return clearedText;
}

function deleteImgTag (text) {
    var startTag = '<img';
    var endTag = '/>';
    var deleteStart, deleteEnd;
    var clearedText = text;
    var tempStr;
    
    while (clearedText.search(startTag) !== -1) {
        deleteStart = clearedText.search(startTag);
        deleteEnd = clearedText.search(endTag) + endTag.length;
        
        tempStr = clearedText.slice(deleteStart, deleteEnd);
        clearedText = clearedText.replace(tempStr, ' ');
    }
    
    return clearedText;
}

function deletePreTag (text) {
    var startTag = '<pre';
    var endTag = '</pre>';
    var deleteStart, deleteEnd;
    var clearedText = text;
    var tempStr;
    
    while (clearedText.search(startTag) !== -1) {
        deleteStart = clearedText.search(startTag);
        deleteEnd = clearedText.search(endTag) + endTag.length;
        
        tempStr = clearedText.slice(deleteStart, deleteEnd);
        clearedText = clearedText.replace(tempStr, ' ');
    }
    
    return clearedText;
}


function cutBodyText (text) {
    var startTag = '<div class="dm-contentDetail__body-content">';
    var endTag = '</div>';
    var bodyText;
    var tempStr = text;
    var sliceStart, sliceEnd;
    
    sliceStart = tempStr.search(startTag) + startTag.length;
    sliceEnd = tempStr.length;
    tempStr = tempStr.slice(sliceStart, sliceEnd);
    
    sliceStart = 0;
    sliceEnd = tempStr.search(endTag);
    
    bodyText = tempStr.slice(sliceStart, sliceEnd);
    
    return bodyText;
}

function clearText (text) {
    var clearedText = text;
    
    //clearedText = deletePreTag(clearedText);
    clearedText = deleteImgTag(clearedText);
    //clearedText = deleteATag(clearedText);
    clearedText = sliceByTag('p', clearedText);
    clearedText = sliceByTag('li', clearedText);
    clearedText = sliceByTag('ul', clearedText);
    clearedText = sliceByTag('strong', clearedText);
    clearedText = clearedText.replace(/\s+/g, " ");
    clearedText = deleteATag(clearedText);
    
    //clearedText = clearedText.normalize('NFC');
    
    return clearedText;
}

/*function getTextByLinks (links) {
    
}


function extractText (links) {
    
}*/