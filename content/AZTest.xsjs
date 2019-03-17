//parse XML from String
var parser = new $.util.SAXParser();
//var xml = //'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n\
        //   <!-- this is a note -->\n\
        //   <notes>\n\
var xml =              '<note noteName="My first note">\n\
                  <to>To &gt; &amp; &#8211; AAAA</to>\n\
              </note>\n';
        //   </notes>\n';

var rootElement;
var characterData = [];
var elementStack = [];

parser.startElementHandler = function(name, attrs) {
  var data = attrs; // use attrs object with all properties as template
  data.name = name; // add the name to the object

  if(!rootElement) { // the first element we see is the root element we want to send as response
     rootElement = data;
  } else {
     var currentElement = elementStack[elementStack.length - 1];
     if(!currentElement.children) { // first time we see a child we have to create the children array
       currentElement.children = [ data ];
     } else {
       currentElement.children.push(data);
     }
  }
  elementStack.push(data);
};

parser.endElementHandler = function(name) {
  elementStack.pop();
};

parser.characterDataHandler = function(s) {
  var currentElement = elementStack[elementStack.length - 1];
  if (!currentElement.characterData) { // the first time we see char data we store it as string
     currentElement.characterData = s;
  } else if (!Array.isArray(currentElement.characterData)) { // if we already have a string we convert it to an array and append the new data
     currentElement.characterData = [currentElement.characterData, s];
  } else { // just append new data to the existing array
     currentElement.characterData.push(s);
  }
};

// parser.parse(xml);

$.response.contentType = "text/plain";//"application/json";
$.response.setBody('Hello world!'.quote());
// $.response.setBody(JSON.stringify({
//   rootElement: rootElement,
//   characterData: characterData
// }));