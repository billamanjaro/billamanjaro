var express = require('express'),
	morgan = require('morgan'),
	log = require('util').debuglog('api')
;

var app = module.exports = express();
app.use(morgan('dev'));

var api = express.Router();
app.use('/v1', api);

var auth = require('./auth')(api);
require('./init')(api, auth);

log('Starting api server on port ' + process.env.PORT);
app.listen(process.env.PORT);
