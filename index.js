
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const noble = require('@abandonware/noble');
const path = require('path');
const utils = require('./utils');



//import {sentPress, test_console} from './utils.js';


// debugger;

app.use(express.static( __dirname + '/client' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
	console.log("Got a GET request for the homepage");
	res.sendFile( path.join( __dirname, 'client', 'keyboard_page.html' ));
})

app.get('/c', function (req, res) {
	console.log(req.query['combo']);

	if (ffe3_characterist != null){
		console.log(req.params.id + " got");

		var modifier_num = 0;
		var keys_slot = [];
		req.query['combo'].forEach((key_name) => {
			switch (key_name) {
			case 'control':
				modifier_num += 1;
				break;

			case 'shift':
				modifier_num += 2;
				break;

			case 'alt':
				modifier_num += 4;
				break;

			default:
				if (keys_slot.length <= 2){
					keys_slot.push(utils.look_up_code(key_name));
					break
				} else {
					// not able to load so much keys
					break;
				}
			
			}
		})
		
		while (keys_slot.length < 3){
			keys_slot.push(0);
		}

		let pressed_key = new Uint16Array([1, modifier_num, keys_slot[0],  keys_slot[1],keys_slot[2]]);
		console.log(pressed_key)
		ffe3_characterist.write(pressed_key);

		let release_key = new Uint16Array([1,0,0,0,0]);
		ffe3_characterist.write(release_key);

	} else {
		// console.log("ffe3 characteristics is null");
	}

	res.send('combo reived');

})
//
app.get('/h', function (req, res) {
		//res.send();
		// res.sendFile('keyboard_page.html',  { root: __dirname });
		// console.log(req.query['key']);
		var id = req.query.key;
		if (typeof id != "object"){
				id = [id];
		}

		var key_code = 0
		if (id) {
				if (id.length==1){
						key_code = utils.look_up_code(id[0])
						// console.log(key_code);

				} else {
						
						// console.log("multiple_keys", id[id.length-1]);
						key_code = utils.look_up_code(id[id.length-1]);
						// console.log(utils.look_up_code(id[0]));
						// console.log(key_code);
				}

		}

		if (ffe3_characterist != null){
				console.log(req.params.id + " got");

				let pressed_key = new Uint16Array([1,0, key_code,0,0]);
				console.log(pressed_key);
				ffe3_characterist.write(pressed_key);


				let release_key = new Uint16Array([1,0,0,0,0]);
				ffe3_characterist.write(release_key);

		} else {
			// console.log("ffe3 characteristics is null");
		}

		res.send("received");
})

var server = app.listen(8340, function (req, res) {
		console.log("Ble-Keybr-Server is listening")
})


noble.on('scanStart', async (event) => {
		console.log("scanStart event is trigered");
		debugger;
		
})

noble.on('scanStop', async (event) => {
		console.log("scan Stop is trigered");
})


noble.on('discover', async (peripheral) => {

	if(peripheral.advertisement.localName){
			console.log(peripheral.advertisement.localName);
			console.log(peripheral.id);
	}


	if(peripheral.id == d_id){
			// if the usbble is found, stop scanning;
			await noble.stopScanningAsync();
			device = peripheral;
			await device.connectAsync();
			console.log('usbble is connected');

			await device.discoverAllServicesAndCharacteristicsAsync()

			ffe_service = device.services.filter((x)=> (x.uuid == "ffe0") ? 1 : 0)[0];
			ffe3_characterist = ffe_service.characteristics.filter((x)=> (x.uuid == "ffe3") ? 1 : 0)[0];
	}

});


noble.on('warning', (message) => {
	console.log("warning is triggered ", message);

});


console.log("start scanning the second time");
// let d_id = '224553d6d34c51eabe0a8a0b4ab4fd93';
let d_id = '740153ea0a560141ef38c3194cd798d6';
noble.startScanningAsync();
var device = null;
var ffe_service = null;
var ffe3_characterist = null;

