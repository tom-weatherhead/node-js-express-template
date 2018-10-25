// metatrader/test-web-service/src/mongodb.js

// A MongoDB REST Web service.

'use strict';

const MongoClient = require('mongodb').MongoClient; // Install the npm package 'mongodb' via: $ npm i -S mongodb
const config = require('../config/config') || {};
const databaseUrl = config.databaseUrl || 'mongodb://localhost:27017';
const databaseName = config.databaseName || 'defaultDatabaseName';
const collectionName = config.collectionName || 'defaultCollectionName';

module.exports = {
	onCreate: (req, res) => {
		let entity = req.body;
		let client = null;

		console.log('Received request: POST /');

		MongoClient.connect(databaseUrl)
			.then(_client => {
				console.log(`POST / : Connected successfully to the server ${databaseUrl}`);

				client = _client;

				const db = client.db(databaseName);
				const collection = db.collection(collectionName);

				return collection.insertOne(entity);
			})
			.then(() => {
				// const message = 'POST / : Completed.';

				console.log('POST / : Completed.');
				// console.log('result:', result);
				// console.log('result.insertedId:', result.insertedId);
				client.close();

				// result.ops[0] should be the same as entity.
				console.log('entity before setting _id:', entity);
				// entity._id = result.insertedId;
				// console.log('entity:', entity);
				res.status(201).send(entity); // HTTP status code 201 means Created.
			})
			.catch(error => {

				if (client) {
					client.close();
				}

				const errorMessage = `POST / : Error: ${error.message || error}`;

				console.error(errorMessage);
				res.status(500).send(errorMessage);
			});
	},
	onReadOne: (req, res) => {
		const id = parseInt(req.params.id);
		let client = null;

		console.log(`Received request: GET /${id}`);

		MongoClient.connect(databaseUrl)
			.then(_client => {
				console.log(`GET /${id} : Connected successfully to the server ${databaseUrl}`);

				client = _client;

				const db = client.db(databaseName);
				const collection = db.collection(collectionName);
				const query = { id: id };

				return collection.findOne(query);
			})
			.then(entity => {
				console.log(`GET /${id} : Returning result: ${entity}`);

				client.close();

				if (entity) {
					res.json(entity);
				} else {
					const errorMessage = `GET /${id} : An entity with ID ${id} was not found.`;

					console.error(errorMessage);
					res.status(404).send(errorMessage);
				}
			})
			.catch(error => {

				if (client) {
					client.close();
				}

				const errorMessage = `GET /${id} : Error: ${error.message || error}`;

				console.error(errorMessage);
				res.status(500).send(errorMessage);
			});
	},
	onReadAll: (req, res) => {
		let searchString = req.query.name;
		let client = null;

		console.log('Received request: GET /');

		MongoClient.connect(databaseUrl)
			.then(_client => {
				console.log(`GET / : Connected successfully to the server ${databaseUrl}`);

				client = _client;

				const db = client.db(databaseName);
				const collection = db.collection(collectionName);

				return collection.find().toArray();
			})
			.then(entities => {

				if (searchString) {
					searchString = searchString.toLowerCase();
					entities = entities.filter(entity => entity.name.toLowerCase().indexOf(searchString) >= 0);
				}

				console.log(`GET / : Returning result: ${entities}`);
				client.close();
				res.json(entities);
			})
			.catch(error => {

				if (client) {
					client.close();
				}

				const errorMessage = `GET / : Error: ${error.message || error}`;

				console.error(errorMessage);
				res.status(500).send(errorMessage);
			});
	},
	onUpdateUsingPut: (req, res) => {
		const id = parseInt(req.params.id);
		const entity = req.body;
		let client = null;

		console.log(`Received request: PUT /${id}`);

		MongoClient.connect(databaseUrl)
			.then(_client => {
				console.log(`PUT /${id} : Connected successfully to the server ${databaseUrl}`);

				client = _client;

				const db = client.db(databaseName);
				const collection = db.collection(collectionName);
				const filter = { id: id };

				// See @dyouberg at https://stackoverflow.com/questions/38883285/error-the-update-operation-document-must-contain-atomic-operators-when-running
				// See https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/
				return collection.replaceOne(filter, entity);
			})
			.then(() => {
				console.log(`PUT /${id} : Completed.`);
				client.close();
				res.status(200).send(`Successful PUT of entity ${entity} to /${id}`);
			})
			.catch(error => {

				if (client) {
					client.close();
				}

				const errorMessage = `PUT /${id} : Error: ${error.message || error}`;

				console.error(errorMessage);
				res.status(500).send(errorMessage);
			});
	},
	onUpdateUsingPatch: (req, res) => {
		const id = parseInt(req.params.id);
		const changes = req.body;
		let client = null;

		console.log(`Received request: PATCH /${id}`);

		MongoClient.connect(databaseUrl)
			.then(_client => {
				console.log(`PATCH /${id} : Connected successfully to the server ${databaseUrl}`);

				client = _client;

				const db = client.db(databaseName);
				const collection = db.collection(collectionName);
				const filter = { id: id };
				const update = { $set: changes };
				const upsert = false;	// See https://stackoverflow.com/questions/19974216/is-there-an-upsert-option-in-the-mongodb-insert-command
				const options = { upsert: upsert };

				return collection.updateOne(filter, update, options);
			})
			.then(() => {
				const message = `PATCH /${id} : Completed.`;

				console.log(message);
				client.close();
				res.status(200).send(message);
			})
			.catch(error => {

				if (client) {
					client.close();
				}

				const errorMessage = `PATCH /${id} : Error: ${error.message || error}`;

				console.error(errorMessage);
				res.status(500).send(errorMessage);
			});
	},
	onDelete: (req, res) => {
		const id = parseInt(req.params.id);
		let client = null;

		console.log(`Received request: DELETE /${id}`);

		MongoClient.connect(databaseUrl)
			.then(_client => {
				console.log(`DELETE /${id} : Connected successfully to the server ${databaseUrl}`);

				client = _client;

				const db = client.db(databaseName);
				const collection = db.collection(collectionName);
				const filter = { id: id };

				return collection.deleteOne(filter);
			})
			.then(() => {
				const message = `DELETE /${id} : Completed.`;

				console.log(message);
				client.close();
				res.status(200).send(message);
			})
			.catch(error => {

				if (client) {
					client.close();
				}

				const errorMessage = `DELETE /${id} : Error: ${error.message || error}`;

				console.error(errorMessage);
				res.status(500).send(errorMessage);
			});
	},
	onOptions: (req, res) => {
		const message = 'Received request: OPTIONS /';

		console.log(message);
		res.status(200).send(message);
	},
	onHead: (req, res) => {
		const message = 'Received request: HEAD /';

		console.log(message);
		res.status(200).send(message);
	},
	onTrace: (req, res) => {
		const message = 'Received request: TRACE /';

		console.log(message);
		res.status(200).send(message);
	}
};
