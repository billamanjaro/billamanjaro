var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('API module', function () {
	it('should export the app object and listen on the specified port', function () {
		var expressStub = {
			'use': spy(),
			'listen': spy(),
			'route': spy()
		};
		var proxy = {
			'express': function () { return expressStub; },
			'morgan': spy(),
			'./auth': spy(),
			'./init': spy()
		};
		proxy.express.Router = spy();
		process.env.PORT = Math.random();

		var app = proxyquire('../../src/api', proxy);
		assert.equal(true, !!app, 'app object was false');
		assert.equal(1, app.listen.called, 'listen not called');
		delete process.env.PORT;
	});

	it('should have a /v1 base route', function () {
		var expressStub = {
			'use': spy(),
			'listen': spy(),
			'route': spy()
		};

		var proxy = {
			'express': function () { return expressStub; },
			'morgan': spy(),
			'./auth': spy(),
			'./init': spy()
		};
		var routeStub = { a: 42 };

		proxy.express.Router = spy().return(routeStub);
		proxyquire('../../src/api', proxy);

		assert.equal(true, expressStub.use.calledWith('/v1', routeStub), 'v1 route not exported');
	});
});
