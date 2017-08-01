// An example of a simple Express.js Web server.
// Tom Weatherhead - August 1, 2017

// require('rootpath')();
var express = require('express');
var app = express();

// **** Server Listen Port Configuration: Begin ****

// Set the server listen port: Method 1:
// const serverListenPort = 3000;

// Set the server listen port: Method 2: Factor the data (the port number) out of the code:
var config = require('./config.json');
let serverListenPort = config.serverListenPort;	// 3000;

// **** Server Listen Port Configuration: End ****

// **** Cross-Origin Resource Sharing: Begin ****

// See https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
// See https://enable-cors.org/server_expressjs.html

// General:

// app.use(function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// next();
// });

// Minimal:

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "null");
	res.header("GET");
	next();
});

// **** Cross-Origin Resource Sharing: End ****

// **** Request Event Handlers: Begin ****

app.get('/', function (req, res) {
	var result = {
		message: 'GitHub!',
		number: 343
	};

	console.log('GET / : Responding with JSON result:', result);
	res.json(result);
});

app.get('/error', function (req, res) {
	console.error('GET /error : Responding with HTTP status code 500 : Internal Server Error.');
	res.status(500).send('Boom; HTTP status code code 500. Internal server error.');
});

// **** Request Event Handlers: End ****

// **** Start the Server: Begin ****

var server = app.listen(serverListenPort, function () {
	console.log('The Express.js server is listening at http://' + server.address().address + ':' + server.address().port);
});

// **** Start the Server: End ****

// End of File.
