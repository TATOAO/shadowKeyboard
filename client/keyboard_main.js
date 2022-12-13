
// window.onload = function() {
//     window.document.body.onkeydown = function() {
//         if (event.ctrlKey) {
//             event.stopPropagation();
//             event.preventDefault();
//             try {
//                 event.keyCode = 0;
//             }
//             catch (event) {
//
//             }
//             return false;
//         }
//         return true;
//     }
// }

var theUrl = "http://localhost:8340/h?key="
var theComboUrl = "http://localhost:8340/c?combo="
var holding_keys = [];


var mac2Win = {
	"command + a" : "control + a",
	"command + c" : "control + c",
	"command + v" : "control + v",
	"command + s" : "control + s",
	"command + w" : "control + w",
	"command + n" : "control + n",
	"command + left" : "control + left",
	"command + right" : "control + right",
	"capslock"    : "control + spacebar",
	// duplicate
	"control + w" : "control + w",
	"control + h" : "control + h",
	"control + j" : "control + j",
	"control + k" : "control + k",
	"control + l" : "control + l",
	"control + p" : "control + p",
	"control + n" : "control + n",
	"control + c" : "control + c",
	"control + d" : "control + d",
	"shift + left" : "shfit + left",
	"shift + right" : "shfit + right",
	"shift + up" : "shfit + up",
	"shift + down" : "shfit + down",
	// special function
	// paste by entering
	"control + command + v" : "special_paste",
}
  







// Object.keys(mac2Win).forEach((x) => {
// 		keyboardJS.unbind(x);
// 		keyboardJS.bind(x, (e) => {
// 				let target_map = mac2Win[x]
// 				console.log(x, " => ", target_map);
// 				pressCombo(target_map);
// 		});
// })
//
var registed_pressed = []


var nonuse_keys = ['windows', 'win', 'super', 'leftcommand', 'leftwindows', 'leftwin', 'leftsuper', 'mod', 'modifier', 'menu', 'spacebar', 'comma', 'period', 
	'apostrophe', 'graveaccent', 'one', 'two', 'three', 'four', 'five', 'six', 
	'seven', 'eight', 'nine', 'zero', 'dash', 'equal', 'equalsign', 'openbracket',
	'closebracket', 'backslash', 'slash', 'forwardslash', 'semicolon', 'colon',
	'exclamation', 'exclamationpoint', '!', 'at', '@', 'number', '#', 
	'dollar', 'dollars', 'dollarsign', '$', 'percent', '%',
	'caret', '^', 'ampersand', 'and', '&', 'asterisk', '*',
	'openparen', '(', 'closeparen', ')', 'underscore', '_', ':',
	'plus', '+', 'verticalbar', '|', 'questionmark', '?',
	'closeanglebracket', '>', 'closecurlybrace', 'closecurlybracket'
	, '}', 'opencurlybrace', 'opencurlybracket', '{', 'quotationmark'
]
// command, alt, space, enter


function parse_nonuse_tag(listOfKeyPress){

	return listOfKeyPress.filter((x) => ! (nonuse_keys.includes(x)))

}


function pressCombo(pressedCombo){

	console.log(pressedCombo)
	var pressedKeys = pressedCombo.split(" + ");
	const send_query = theComboUrl + pressedKeys.join("&combo=");
	// console.log(send_query);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", send_query, true ); // false for synchronous request
  xmlHttp.send( "wdjfowdjf");
	// return xmlHttp.responseText;

};

function pressKey(pressedKeys){

	// console.log("just being pressed", pressedKeys);
	const send_query = theUrl + pressedKeys.join("&key=");
	// console.log(send_query);
	// var xmlHttp = new XMLHttpRequest();
	// console.log(pressedKeys);
	var current_keys =  parse_nonuse_tag(pressedKeys);

	current_keys.foreach((x) => {

		if (holding_keys.includes(x)) {
			// do nothing
		} else {
			holding_keys.push(x);
		}

	})
	// xmlHttp.open( "GET", send_query, true ); // false for synchronous request
	// xmlHttp.send( "hhhhhh");
	
};


function releaseKey(pressedKeys){

}


keyboardJS.bind(e => pressKey(e.pressedKeys), e => pressKey(e.pressedKeys));
// keyboardJS.bind(e => currentKey(e.pressedKeys), e => currentKey(e.pressedKeys));

