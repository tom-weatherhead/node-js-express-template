// node-js-express-template/test/app_spec.js

// Use chai and chai-http. See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html and our repo test-express-mocha-chai-perello

// TODO: Use Jason Mulligan's tiny-httptest. See https://github.com/avoidwork/tiny-httptest

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
// const tinyhttptest = require('tiny-httptest');

const app = require('..')('nop');

chai.use(chaiHttp);

const expect = chai.expect;

const urlSlash = '/';
const urlSlash7 = '/7';

const requestUrl_POST = urlSlash;
const requestUrl_GET_Test1 = urlSlash;
const requestUrl_GET_Test2 = urlSlash7;
const requestUrl_PUT = urlSlash7;
const requestUrl_PATCH = urlSlash7;
const requestUrl_DELETE = urlSlash7;
const requestUrl_OPTIONS = urlSlash;
const requestUrl_HEAD = urlSlash;
const requestUrl_TRACE = urlSlash;
// const requestUrl_CONNECT = urlSlash;

const httpStatusCode_OK = 200;
const httpStatusCode_Created = 201;
const httpStatusCode_NoContent = 204;

describe('App', () => {
	describe(`POST ${requestUrl_POST}`, () => {
		it(`responds with status ${httpStatusCode_Created}`, done => {
			chai.request(app)
				.post(requestUrl_POST)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_Created);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`GET ${requestUrl_GET_Test1}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.get(requestUrl_GET_Test1)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`GET ${requestUrl_GET_Test2}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.get(requestUrl_GET_Test2)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`PUT ${requestUrl_PUT}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.put(requestUrl_PUT)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`PATCH ${requestUrl_PATCH}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.patch(requestUrl_PATCH)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`DELETE ${requestUrl_DELETE}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.delete(requestUrl_DELETE)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`OPTIONS ${requestUrl_OPTIONS}`, () => {
		it(`responds with status ${httpStatusCode_NoContent}`, done => {
			chai.request(app)
				.options(requestUrl_OPTIONS)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions

					// What status codes can a response to an OPTIONS request contain?
					// See https://stackoverflow.com/questions/14702962/can-an-http-options-request-return-a-204-or-should-it-always-return-200
					// I was getting 204 : See https://httpstatuses.com/204
					// If the CORS middleware is being used by Express.js, then it (the CORS middleware)
					// will respond to an OPTIONS request with a status code of 204.

					// expect(res).to.have.status(200);

					// HTTP status code 204 means No Content:
					// "The server has successfully fulfilled the request and that there is
					// no additional content to send in the response payload body."
					// See https://httpstatuses.com/204
					expect(res).to.have.status(httpStatusCode_NoContent);

					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`HEAD ${requestUrl_HEAD}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.head(requestUrl_HEAD)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe(`TRACE ${requestUrl_TRACE}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.trace(requestUrl_TRACE)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	/*
	describe(`CONNECT ${requestUrl_CONNECT}`, () => {
		it(`responds with status ${httpStatusCode_OK}`, done => {
			chai.request(app)
				.connect(requestUrl_CONNECT)
				.end((err, res) => {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(httpStatusCode_OK);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});
	*/
});
