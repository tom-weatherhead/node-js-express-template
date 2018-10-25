// metatrader/test-web-service/src/server.js

// A MongoDB REST Web service.

// For information about "npm link" and the "bin" section of the package.json file, see:
// http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

'use strict';

// require('rootpath')();
// const app = require('..');
const app = require('..')('nop');

// const config = require('../config/config');			// I.e. ./config.json

// const serverListenPort = config.serverListenPort || 3000;
const serverListenPort = 80;

// Start the server:

var server = app.listen(serverListenPort, function () {
	let host = server.address().address;

	if (host === '::') {
		host = 'localhost';
	}

	console.log('The Express.js server is listening at http://%s:%s (protocol %s)', host, server.address().port, server.address().family);
});

// End of File.
