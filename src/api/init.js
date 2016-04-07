var stripe = require('stripe')(),
	bodyParser = require('body-parser')
;

module.exports = function (api, auth) {
	stripe.setApiKey(process.env.STRIPE_KEY);

	api.use(bodyParser.json());

	[ 'coupons', 'customers', 'invoices', 'orders', 'plans', 'products', 'skus' ].forEach(function (endpoint) {
		require('./endpoints/' + endpoint)(api, auth, stripe);
	});

	// add the auditor after everything else
	api.use(require('./auditor'));
};
