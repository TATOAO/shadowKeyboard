
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');

// Get document, or throw exception on error
const doc = yaml.load(fs.readFileSync(path.join(__dirname, 'key_map_complete.yml'), 'utf8'));


console.log("load");

module.exports = {
	sentPress : (characteristic) => {

		let try_key = new Uint16Array([1,0,0x22,0,0]);
		characteristic.write(try_key);

},
	test_console : (text) => {console.log(text);},


	uniq_key: (key_array) => {


	},

	look_up_code: (key_buttom) => {
			console.log(key_buttom);
			return doc['key_code'][key_buttom];
	},
}

