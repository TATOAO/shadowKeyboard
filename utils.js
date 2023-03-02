
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');

// Get document, or throw exception on error
const doc = yaml.load(fs.readFileSync(path.join(__dirname, 'key_map_complete.yml'), 'utf8'));
var shift_key = require('./shift_key.json')

console.log("load");

const sentPress = (characteristic) => {

		let try_key = new Uint16Array([1,0,0x22,0,0]);
		characteristic.write(try_key);
}


const test_console = (text) => {console.log(text);}



const check_english_text = (text) => {
		return /^[\x00-\x7F]*$/.test(text);
	}

const check_shift_not_needed = (text) => {
	return /[0-9a-z\[\]';\.,\-=\\\/`]/.test(text);
};

const special_past = () => {
		console.log("special_paste");
	}

const plain_text_to_order = (keys_input) => {

		// input keys in any length of inputs, 
		// from ["shift", "a"] -> array([1,1,4,0,0]); 
		var modified_key = 0;
		var normal_keys = [];
		for (let index = 0; index < keys_input.length; index++) {
			if (index >= 5){
				break;
			}
			const element = keys_input[index];


			switch (element) {
				case 'shift':
					modified_key += 2;
					break;

				case 'ctrl':
				// control 
					modified_key += 1;
					break;
				
				case 'command':
				// alt
					modified_key += 4;
					break;

				case 'alt':
				// windows
					modified_key += 8;
			
				default:
					normal_keys.push(doc['key_code'][element]);
			}
			
		}

		var result_code = [1, modified_key,0,0,0]

		for (let index = 0; index < 3; index++) {
			if (index < normal_keys.length) {
				result_code[index+2] = normal_keys[index]
			}
		}

		if(keys_input[0] == ''){
			let pressed_key = new Uint16Array([1,0, 0,0,0]);
			return pressed_key
		} else {
			let pressed_key = new Uint16Array(result_code);
			return pressed_key
		}
	}



const generate_keypress_orders =  (input_slice) => {

		// from [[ "a","b","c"]] to ["abc", ""]

		// or [["a"], ["a"], ["B"]] to ["a", "", "a", "", "shfit + b", ""]
		var total_orders = [];

		for (let index = 0; index < input_slice.length; index++) {
			const single_press = input_slice[index];
			var single_order = [];
			// console.log('single_press', single_press);
			for (let index = 0; index < single_press.length; index++) {
				const element = single_press[index];
				
				let is_small = check_shift_not_needed(element)
				if (is_small){
					// single_order[2+index] = doc['key_code'][element];
					single_order.push(element);
				} else{
					// below is the case when there is upper case
					// make sure the big character only has single value

					single_order = shift_key.shift_key[element]
				}
			}
			// plain_text_to_order
			// console.log(single_order);
			total_orders = total_orders.concat(plain_text_to_order(single_order));
			total_orders.push(plain_text_to_order([]));
		}
	    // console.log(total_orders);
		return total_orders;
	}

const cut_by_pressable = (x) => {
		// 

		// if B is received, then need to return shift + b
		// input: is a slice of string with max 3 characteristic
		// return: a list of list [[], [], []] at least 1 list inside
		// only when the encounter a big element or a repeated element it
		// need to run a new list 
			

		var result_list = [];

		var temp_list = [];
		var current_char = '';

		for (let index = 0; index < x.length; index++) {
			const element = x[index];
			
			let is_small = check_shift_not_needed(element)
			if (is_small & element != current_char) {
				temp_list.push(element);
			} else {
				result_list.push(temp_list);
				temp_list = [element];
			}
			current_char = element;
		}


		var result_list = [];
		var temp_list = [];
		var last_char = '';

		for (let index = 0; index < x.length; index++) {
			const element = x.charAt(index);
			
			let is_small = check_shift_not_needed(element)
			let is_last_small = check_shift_not_needed(last_char)

			if (is_small & element != last_char & is_last_small | last_char == '') {
				temp_list.push(element);
			} else {
				result_list.push(temp_list);
				temp_list = [element];

			}
			last_char = element;
		}

		if (temp_list.length > 0){
			result_list.push(temp_list);
		}
		// console.log(result_list);
		return result_list

	};

function paste_control(clipboard_text) {

	if(check_english_text(clipboard_text)){

		let N = clipboard_text.length;
		var total_command_write = [];
		
		for (let index = 0; index < clipboard_text.length; index+=3) {
			let slice_3 = clipboard_text.slice(index, index + 3)
			var pressable = cut_by_pressable(slice_3);
			// total_command_write = total_command_write.concat(generate_keypress_orders(pressable));
			var result = generate_keypress_orders(pressable);
			result.forEach((x)=>total_command_write.push(x));
		}
		return total_command_write;
	}
		
}

module.exports = {
	sentPress : sentPress,
	test_console : test_console,
	check_english_text: check_english_text,
	special_past: special_past,
	plain_text_to_order: plain_text_to_order, 
	generate_keypress_orders : generate_keypress_orders,
	cut_by_pressable: cut_by_pressable,
	paste_control: paste_control,
	check_shift_not_needed: check_shift_not_needed 
}

