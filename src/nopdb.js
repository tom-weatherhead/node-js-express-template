// node-js-express-template/src/nopdb.js

// A no-op (do-nothing) implementation of the database interface.

module.exports = {
	onCreate: (req, res) => {
		const message = 'Received request: POST /';
		// const entity = req.body;
		const entity = {
			message: message
		};

		console.log(message);
		console.log('Request body is:', req.body);
		// res.status(201).send(entity); // Or: res.status(201).json(entity); ?
		res.status(201).json(entity);
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
		res.status(200).send(message); // Or: res.json(...); ?
	},
	onUpdateUsingPatch: (req, res) => {
		const id = parseInt(req.params.id);
		const message = `Received request: PATCH /${id}`;

		console.log(message);
		console.log('Request body is:', req.body);
		res.status(200).send(message); // Or: res.json(...); ?
	},
	onDelete: (req, res) => {
		const id = parseInt(req.params.id);
		const message = `Received request: DELETE /${id}`;

		console.log(message);
		res.status(200).send(message); // Or: res.json(...); ?
	},
	onOptions: (req, res) => {
		const message = 'Received request: OPTIONS /';

		console.log(message);
		// We respond with a status code of 204 ("No Content") because that's the code
		// with which the CORS middleware responds to OPTIONS requests.
		res.status(204).send();
	},
	onHead: (req, res) => {
		const message = 'Received request: HEAD /';

		console.log(message);
		res.status(200).send(message); // Or: res.json(...); ?
	},
	onTrace: (req, res) => {
		const message = 'nopdb.js : Received request: TRACE /';

		console.log(message);
		res.status(200).send(message); // Or: res.json(...); ?
	} /* ,
	onConnect: (req, res) => {
		const message = 'Received request: CONNECT /';

		console.log(message);
		res.status(200).send(message); // Or: res.json(...); ?
	} */
};
