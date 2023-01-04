// import shift_key from './shift_key.json' assert {type: 'json'};
const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');
var shift_key = require('./shift_key.json')
// const doc = yaml.load(fs.readFileSync(path.join(__dirname, 'shift_key.yml'), 'utf8'));
//

// let code_key_map = doc['code_key'];
// console.log(code_key_map);
// let key_code_map = Object.keys(code_key_map).reduce((ret, key) => {
// 	ret[code_key_map[key]] = key;
// 	return ret
// }, {})
// doc['key_code'] = key_code_map;
//
// console.log(key_code_map);
//
// fs.writeFile("./key_map_complete.yml", yaml.dump(doc), (err) => {console.log(err)});

// const utils = require('./utils');
//
// console.log(utils.look_up_code('`'));
//

console.log(shift_key);
debugger;
