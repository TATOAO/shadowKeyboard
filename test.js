
var x = "acD"
var result_list = [];

var temp_list = [];
var last_char = '';

for (let index = 0; index < x.length; index++) {
	const element = x.charAt(index);
	
	let is_small = /[0-9a-z\[\]';\.,-=\\`]/.test(element)
	let is_last_small = /[0-9a-z\[\]';\.,-=\\`]/.test(last_char)

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
console.log(result_list);
debugger;
