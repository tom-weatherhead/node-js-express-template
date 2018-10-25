// metatrader/test-web-service/test/app_spec.js

// Use chai and chai-http. See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html and our repo test-express-mocha-chai-perello

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('..')('nop');

chai.use(chaiHttp);

const expect = chai.expect;

describe('App', () => {
	describe('POST /', () => {
		it('responds with status 201', done => {
			chai.request(app)
				.post('/')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(201);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('GET /', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('GET /7', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.get('/7')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('PUT /7', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.put('/7')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('PATCH /7', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.patch('/7')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('DELETE /7', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.delete('/7')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('OPTIONS /', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.options('/')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('HEAD /', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.head('/')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('TRACE /', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.trace('/')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	/*
	describe('CONNECT /', () => {
		it('responds with status 200', done => {
			chai.request(app)
				.connect('/')
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});
	*/

	/*
	describe('GET /notfound', function () {
		it('responds with status 404', function (done) {
			chai.request(app)
				.get('/notfound')
				.end(function (err, res) {
					// expect(err).to.not.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(404);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('GET /teapot', function () {
		it('responds with status 418', function (done) {
			chai.request(app)
				.get('/teapot')
				.end(function (err, res) {
					// All three of these lines work:
					// expect(err).not.to.be.null;		// eslint-disable-line no-unused-expressions
					expect(err).to.not.be.null;		// eslint-disable-line no-unused-expressions
					// expect(err).to.be.not.null;		// eslint-disable-line no-unused-expressions

					expect(res).to.have.status(418);
					expect(res.text).to.equal('I\'m a teapot');
					done();
				});
		});
	});

	describe('GET /servererror', function () {
		it('responds with status 500', function (done) {
			chai.request(app)
				.get('/servererror')
				.end(function (err, res) {
					expect(err).to.not.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(500);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});
	*/
});
