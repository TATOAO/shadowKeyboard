
var express = require('express');
var app = express();
const noble = require('@abandonware/noble');
const path = require('path');

// debugger;

app.use(express.static( __dirname + '/client' ));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
		console.log("Got a GET request for the homepage");
		res.sendFile( path.join( __dirname, 'client', 'keyboard_page.html' ));
})

//
app.get('/key=:id', function (req, res) {
		//res.send();
		// res.sendFile('keyboard_page.html',  { root: __dirname });
		if (ffe3_characterist != null){
				console.log(req.params.id + " got");

				let try_key = new Uint16Array([1,0,0x22,0,0]);
				ffe3_characterist.write(try_key);

				let release_key = new Uint16Array([1,0,0,0,0]);
				ffe3_characterist.write(release_key);

		} else {

			console.log(req.params.id);

		}
		
})
//

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
	// console.log('discover is triggered');
  // await noble.stopScanningAsync();
	// console.log('stop Scanning signal received');
	// console.log(typeof peripheral);
	//
	// console.log('new device is discovered');
	if(peripheral.advertisement.localName){
		console.log(peripheral.advertisement.localName);
	}

	// sddsdfs

	if(peripheral.id == d_id){
			// if the usbble is found, stop scanning;
			await noble.stopScanningAsync();
			device = peripheral;
			await device.connectAsync();
			console.log('usbble is connected');

			await device.discoverAllServicesAndCharacteristicsAsync()

			ffe_service = device.services.filter((x)=> (x.uuid == "ffe0") ? 1 : 0)[0];
			ffe3_characterist = ffe_service.characteristics.filter((x)=> (x.uuid == "ffe3") ? 1 : 0)[0];


			let try_key = new Uint16Array([1,0,34,0,0]);
			ffe3_characterist.write(try_key);
			
			let release_key = new Uint16Array([1,0,0,0,0]);
			ffe3_characterist.write(release_key);

	}

	// console.log(peripheral);

  // await peripheral.connectAsync();
	// console.log('Connection signal received');
  //const {characteristics} = await peripheral.discoverSomeServicesAndCharacteristicsAsync(['180f'], ['2a19']);
  // const batteryLevel = (await characteristics[0].readAsync())[0];

  // console.log(`${peripheral.address} (${peripheral.advertisement.localName}): ${batteryLevel}%`);

  // await peripheral.disconnectAsync();
  // process.exit(0);
});


noble.on('warning', (message) => {
	console.log("warning is triggered ", message);

});


/*
noble.startScanningAsync(['224553d6d34c51eabe0a8a0b4ab4fd93'], true, async ()=>{
		console.log("error happen in start scanning");
		//console.log(error);
});
*/

console.log("start scanning the second time");
let d_id = '224553d6d34c51eabe0a8a0b4ab4fd93';
noble.startScanningAsync();
var device = null;
var ffe_service = null;
var ffe3_characterist = null;
setTimeout(()=> {
	noble.startScanningAsync();
	console.log('wait end');
	debugger;
	// console.log(noble._peripherals[d_id]);
	// try plug in 
	// console.log(noble._peripherals);
},  1000)

