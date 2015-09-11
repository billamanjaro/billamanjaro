var assert = require('assert');
var spy = require('bondjs');
var proxyquire = require('proxyquire').noCallThru();

describe('v1 account api routes', function () {
	it('should export itself with a list, get, put, post, and delete action tied to the right controller functions', function () {
		var controller = { 'list': 'abc', 'get': 'def', 'put': 'ghi', 'post': 'jkl', 'delete': 'mno' };
		var routerMock = { 'get': spy(), 'put': spy(), 'post': spy(), 'delete': spy() };

		var route = proxyquire('../../../../src/api/v1/routes/account', {
			'express': { Router: function () { return routerMock; } },
			'../controllers/account': controller
		});

		assert.equal(route, routerMock, 'account routes not exported');

		assert.equal(2, routerMock.get.called, 'get not called');
		assert.equal(1, routerMock.put.called, 'put not called');
		assert.equal(1, routerMock.post.called, 'post not called');
		assert.equal(1, routerMock.delete.called, 'delete not called');

		assert.equal(true, routerMock.get.calledWith('/', controller.list), 'list not hooked up');
		assert.equal(true, routerMock.get.calledWith('/:id', controller.get), 'get not hooked up');
		assert.equal(true, routerMock.put.calledWith('/:id', controller.put), 'put not hooked up');
		assert.equal(true, routerMock.post.calledWith('/', controller.post), 'post not hooked up');
		assert.equal(true, routerMock.delete.calledWith('/:id', controller.delete), 'delete not hooked up');
	});
});
