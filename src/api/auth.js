var passport = require('passport'),
	jsonwebtoken = require('jsonwebtoken'),
	google = require('passport-google-oauth20'),
	jwt = require('passport-jwt'),
	extractor = jwt.ExtractJwt.fromAuthHeader()
;

var url = process.env.BILLIMANJARO_URL + ':' + process.env.PORT;

passport.use(new google.Strategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: url + '/v1/token'
}, function (accessToken, refreshToken, profile, done) {
	return done(null, profile);
}));

passport.use(new jwt.Strategy({
	secretOrKey: process.env.SECRET_KEY,
	issuer: url,
	jwtFromRequest: extractor
}, function (payload, done) {
	return done(null, payload);
}));

function sign(user) {
	return jsonwebtoken.sign(user, process.env.SECRET_KEY, { issuer: url, expiresIn: '60m' });
}

module.exports = function (api) {
	api.use(passport.initialize());

	// exchange the authenticated google credentials for a token
	api.get('/token', passport.authenticate('google', { scope: ['profile'], session: false }), function (req, res) {
		res.status(200).send({ token: sign(req.user) });
	});

	// expire the token
	api.delete('/token', function (req, res) {
		req.logout();
		res.status(200).send();
	});

	return passport.authenticate('jwt', { session: false });
};
