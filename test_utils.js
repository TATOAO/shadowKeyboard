
const utils = require('./utils');
var shift_key = require('./shift_key.json')
// let result = utils.plain_text_to_order(["shift", ";"]);
		// or [["a"], ["a"], ["B"]] to ["a", "", "a", "", "shfit + b", ""]
// let result = utils.generate_keypress_orders([["a"], [":"]]);

// let is_small = /[0-9a-z\[\]';\.,\-=\\`]/.test(':')
// let is_small = /[0-9a-z\[\]';\.,\-=\\\/`]/.test('');
let result = utils.paste_control("aaaa \n return /[0-9a-z\[\]';\.,\-=\\\/`]/.test(text);"
);
console.log(result);
// console.log(is_small);
// console.log(shift_key.shift_key[':']);


