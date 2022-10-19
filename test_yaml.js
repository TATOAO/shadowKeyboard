// Get document, or throw exception on error
/*
const doc = yaml.load(fs.readFileSync(path.join(__dirname, 'key_map.yml'), 'utf8'));


let code_key_map = doc['code_key'];
console.log(code_key_map);
let key_code_map = Object.keys(code_key_map).reduce((ret, key) => {
	ret[code_key_map[key]] = key;
	return ret
}, {})
doc['key_code'] = key_code_map;

console.log(key_code_map);

fs.writeFile("./key_map_complete.yml", yaml.dump(doc), (err) => {console.log(err)});
*/

const utils = require('./utils');

console.log(utils.look_up_code('`'));

debugger;






