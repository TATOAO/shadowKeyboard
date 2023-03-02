
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
var holding_keys = [];

import { test_console } from './utils.js';
console.log(test_console);
test_console('ssssaaaadddd');

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
	, '}', 'opencurlybrace', 'opencurlybracket', '{', 'quotationmark', 'rightcommand',
	'rightwindows', 'rightwin', 'rightsuper', 'ins', 'del', 'escape'
]
// command, alt, space, enter


function parse_nonuse_tag(listOfKeyPress) {

	return listOfKeyPress.filter((x) => ! (nonuse_keys.includes(x)))

}


// function pressCombo(pressedCombo){
//
// 	console.log(pressedCombo)
// 	var pressedKeys = pressedCombo.split(" + ");
// 	const send_query = theComboUrl + pressedKeys.join("&combo=");
// 	// console.log(send_query);
// 	var xmlHttp = new XMLHttpRequest();
// 	xmlHttp.open( "GET", send_query, true ); // false for synchronous request
//   xmlHttp.send( "wdjfowdjf");
// 	// return xmlHttp.responseText;
//
// };
//

function pressKey(pressedKeys){

	// console.log("just being pressed", pressedKeys);
	// console.log(pressedKeys);
	var current_keys =  parse_nonuse_tag(pressedKeys);

	current_keys.forEach((x) => {

		if (holding_keys.includes(x)) {
			// do nothing
		} else {
			holding_keys.push(x);
		// 	console.log("current_keys", holding_keys);
		}

	})


	var xmlHttp = new XMLHttpRequest();
	const send_query = theUrl + holding_keys.join("&key=");
	xmlHttp.open( "GET", send_query, true ); // false for synchronous request
	xmlHttp.send( "hhhhhh");
	
};


function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


function releaseKey(pressedKeys){

	var current_keys =  parse_nonuse_tag(pressedKeys);

	var to_be_deleted = [];

	holding_keys.forEach((x) => {
		if (current_keys.includes(x)) {
			// do nothing
		} else {
			to_be_deleted.push(x);
		}
	})
	
	to_be_deleted.forEach(x => {
		removeItemOnce(holding_keys, x);
	});

	var xmlHttp = new XMLHttpRequest();
	const send_query = theUrl + holding_keys.join("&key=");
	xmlHttp.open( "GET", send_query, true ); // false for synchronous request
	xmlHttp.send( "hhhhhh");
	
}

const paste_activate_function = function(){
	// const text = await navigator.clipboard.readText();
	// console.log(text);

	navigator.clipboard.readText()
	.then(text => {
		var xmlHttp = new XMLHttpRequest();
		// text = text.replaceAll('\n', '%0A');
		text = encodeURIComponent(text)
		const send_query = "http://localhost:8340/paste?text=" + text;
		// console.log(text.replaceAll('\n', '%0A'));
		xmlHttp.open( "GET", send_query, true ); // false for synchronous request
		xmlHttp.send( "paste stuff");
	})
	.catch(err => {
		console.error('Failed to read clipboard contents: ', err);
	});
}

keyboardJS.bind('capslock', 
	(e) => {
		console.log("ctrl then space");	
		// paste_activate_function();
		pressKey(["ctrl", "space"])
	},

	(e) => { 
		releaseKey([]);	
	}
);

keyboardJS.bind('ctrl + shift + q', (e) => {
	console.log("the function is activated");	
	paste_activate_function();
});

keyboardJS.bind(e => {
	pressKey(e.pressedKeys)

}, e => releaseKey(e.pressedKeys));
// keyboardJS.bind(e => currentKey(e.pressedKeys), e => currentKey(e.pressedKeys));

// const button = document.getElementById('thebutton');
// button.onclick = function () {

