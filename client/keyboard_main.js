

var xmlHttp = new XMLHttpRequest();
var theUrl = "http://localhost:8340/key=j"
function updateReadout(pressedKeys){

	console.log(pressedKeys);
	xmlHttp.open( "GET", theUrl+pressedKeys, true ); // false for synchronous request
  xmlHttp.send( "hhhhhh");
	console.log("open is done");
	// return xmlHttp.responseText;

};

keyboardJS.bind(e => updateReadout(e.pressedKeys), e => updateReadout(e.pressedKeys));

