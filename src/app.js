// metatrader/test-web-service/src/app.js

// A REST database Web service.

'use strict';

module.exports = databaseClientType => {
	const express = require('express');
	const bodyParser = require('body-parser');

	// TODO? : Use a factory method to create the database client based on a parameter (e.g. param === 'npm' || param === 'mongo')
	// const databaseClient = require('./mongodb')();
	// const databaseClient = require('./nopdb')();
	const databaseClient = databaseClientType === 'mongo' ? require('./mongodb') : require('./nopdb');

	// const assert = require('assert');

	const app = express();

	app.use(bodyParser.json());

	// **** Begin CORS ****
	// For information about CORS (Cross-Origin Resource Sharing), see https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
	// To enable CORS, run "npm i -S cors" and uncomment the next two lines:
	const cors = require('cors');

	app.use(cors());
	// **** End CORS ****


	//app.disable('etag');	// Prevent HTTP 304 Not Modified. See https://stackoverflow.com/questions/18811286/nodejs-express-cache-and-304-status-code

	const router = express.Router();				// eslint-disable-line new-cap

	// 1) Create (the C in CRUD)

	// See e.g. https://stackoverflow.com/questions/7172784/how-to-post-json-data-with-curl-from-terminal-commandline-to-test-spring-rest :

	// **** BEGIN stackoverflow.com excerpt ****

	// You need to set your content-type to application/json. But -d sends the Content-Type application/x-www-form-urlencoded, which is not accepted on Spring's side.

	// Looking at the curl man page, I think you can use -H:

	// -H "Content-Type: application/json"

	// Full example:

	// curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login

	// (-H is short for --header, -d for --data)

	// Note that -X POST is optional if you use -d, as the -d flag implies a POST request.

	// **** END stackoverflow.com excerpt ****

	// https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express

	// Test via: curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/u/

	// Test via: curl -H "Content-Type: application/json" -X POST -d '{"id":1,"name":"North Carolina State University at Raleigh","numUndergraduateStudents":22925,"percentWhite":74.67,"percentBlack":6.5,"percentHispanic":4.47,"percentAsian":5.37,"percentAmericanNative":0.42,"percentPacificIslander":0.06,"percentMultipleRaces":3.51,"percentNonResidentAlien":3.27,"percentUnknown":1.72,"shortName":"NCSU Raleigh"}' http://localhost:3000/u/

	router.post('/', (req, res) => {
		databaseClient.onCreate(req, res);
	});

	// 2) Read (the R in CRUD)

	// Test via curl -X "GET" http://localhost:3000/u/ or simply curl http://localhost:3000/u/

	// ? To get the value of a URL parameter (e.g. ".../?name=foo"), refer to req.query.name (which should equal 'foo').
	// See https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express

	router.get('/', (req, res) => {
		databaseClient.onReadAll(req, res);
	});

	// Test via curl -X "GET" http://localhost:3000/u/1 or simply curl http://localhost:3000/u/1

	router.get('/:id', (req, res) => {
		databaseClient.onReadOne(req, res);
	});

	// 3) Update (the U in CRUD)

	// Test via: curl -H "Content-Type: application/json" -X PUT -d '{"id":1,"name":"Buckwheat University","numUndergraduateStudents":22925,"percentWhite":74.67,"percentBlack":6.5,"percentHispanic":4.47,"percentAsian":5.37,"percentAmericanNative":0.42,"percentPacificIslander":0.06,"percentMultipleRaces":3.51,"percentNonResidentAlien":3.27,"percentUnknown":1.72,"shortName":"NCSU Raleigh"}' http://localhost:3000/u/1

	router.put('/:id', (req, res) => {
		// HTTP method PUT: If the resource exists, replace it; otherwise, create it.
		// See https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods
		databaseClient.onUpdateUsingPut(req, res);
	});

	// See https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/
	// See https://stackoverflow.com/questions/38883285/error-the-update-operation-document-must-contain-atomic-operators-when-running

	// Just pass in the changed fields, not necessarily the entire object.

	// Test via: curl -H "Content-Type: application/json" -X PATCH -d '{"name": "Bar University"}' http://localhost:3000/u/2

	router.patch('/:id', (req, res) => {
		databaseClient.onUpdateUsingPatch(req, res);
	});

	// 4) Delete (the D in CRUD)

	// Test via: curl -X "DELETE" http://localhost:3000/u/1

	router.delete('/:id', (req, res) => {
		databaseClient.onDelete(req, res);
	});

	// Other HTTP methods

	router.options('/', (req, res) => {
		databaseClient.onOptions(req, res);
	});

	router.head('/', (req, res) => {
		databaseClient.onHead(req, res);
	});

	router.trace('/', (req, res) => {
		databaseClient.onTrace(req, res);
	});

	/*
	// Supporting HTTP CONNECT may be overkill.
	// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT
	router.connect('/', (req, res) => {
		databaseClient.onConnect(req, res);
	});
	*/

	app.use('/', router);

	return app;
};

// module.exports = app;

// End of File.
