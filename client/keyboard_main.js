

var xmlHttp = new XMLHttpRequest();
var theUrl = "http://localhost:8340/h?key="
function pressKey(pressedKeys){

	console.log("just being pressed", pressedKeys);
	const send_query = theUrl + pressedKeys.join("&key=");
	console.log(send_query);
	xmlHttp.open( "GET", send_query, true ); // false for synchronous request
  xmlHttp.send( "hhhhhh");
	// return xmlHttp.responseText;

};


// only triggered when release
function currentKey(pressedKeys){
	console.log("current keys being holding", pressedKeys);

}

keyboardJS.bind(e => pressKey(e.pressedKeys), e => currentKey(e.pressedKeys));

