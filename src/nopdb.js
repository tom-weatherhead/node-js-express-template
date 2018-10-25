// metatrader/test-web-service/src/nopdb.js

// A no-op (do-nothing) implementation of the database interface.

module.exports = {
	onCreate: (req, res) => {
		// let entity = req.body;
		const message = 'Received request: POST /';
		const entity = {
			message: message
		};

		console.log(message);
		console.log('Request body is:', req.body);
		res.status(201).send(entity);
	},
	onReadOne: (req, res) => {
		const id = parseInt(req.params.id);

		const message = `Received request: GET /${id}`;
		const entity = {
			message: message
		};

		console.log(message);
		res.json(entity);
	},
	onReadAll: (req, res) => {
		const message = 'Received request: GET /';
		const entities = [
			{
				message: message
			}
		];

		console.log(message);
		// console.log('req.query.name is:', req.query.name);
		res.json(entities);
	},
	onUpdateUsingPut: (req, res) => {
		const id = parseInt(req.params.id);
		const message = `Received request: PUT /${id}`;

		console.log(message);
		console.log('Request body is:', req.body);
		res.status(200).send(message);
	},
	onUpdateUsingPatch: (req, res) => {
		const id = parseInt(req.params.id);
		const message = `Received request: PATCH /${id}`;

		console.log(message);
		console.log('Request body is:', req.body);
		res.status(200).send(message);
	},
	onDelete: (req, res) => {
		const id = parseInt(req.params.id);
		const message = `Received request: DELETE /${id}`;

		console.log(message);
		res.status(200).send(message);
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
	} /* ,
	onConnect: (req, res) => {
		const message = 'Received request: CONNECT /';

		console.log(message);
		res.status(200).send(message);
	} */
};
