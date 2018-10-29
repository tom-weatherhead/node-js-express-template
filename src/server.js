// node-js-express-template/src/server.js

// A REST Web service with a database back end.

// For information about "npm link" and the "bin" section of the package.json file, see:
// http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

'use strict';

// require('rootpath')();

// The parameter 'nop' indicated the database back end that we wish to use.
const app = require('..')('nop');

const config = require('../config/config');			// I.e. ./config.json

const serverListenPort = config.serverListenPort || 3000;
// const serverListenPort = 80;

// Start the server:

var server = app.listen(serverListenPort, function () {
	let host = server.address().address;

	if (host === '::') {
		host = 'localhost';
	}

	console.log('The Express.js server is listening at http://%s:%s (protocol %s)', host, server.address().port, server.address().family);
});

// End of File.
