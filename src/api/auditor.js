var util = require('util');

module.exports = function (req) {
	util.log(util.format('User %j accessed url %s', req.user, req.path));
};
