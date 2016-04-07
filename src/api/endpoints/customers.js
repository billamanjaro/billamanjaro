module.exports = function (api, auth, stripe) {
	api
		.post('/customer', auth, function (req, res) {
			stripe.customers.create(req.body).then(function (customer) {
				res.status(200).send(customer);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.put('/customer/:id', auth, function (req, res) {
			stripe.customers.update(req.params.id, req.body).then(function (customer) {
				res.status(200).send(customer);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/customer/:id', auth, function (req, res) {
			stripe.customers.get(req.params.id).then(function (customer) {
				res.status(200).send(customer);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/customer/', auth, function (req, res) {
			stripe.customers.list().then(function (customers) {
				res.status(200).send(customers);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/customer/:id/subscription', auth, function (req, res) {
			stripe.customers.listSubscription(req.params.id).then(function (subscriptions) {
				res.status(200).send(subscriptions);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/customer/:id/subscription/:subscription_id', auth, function (req, res) {
			stripe.customers.retrieveSubscription(req.params.id, req.params.subscription_id).then(function (subscription) {
				res.status(200).send(subscription);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.post('/customer/:id/subscription', auth, function (req, res) {
			stripe.customers.createSubscription(req.params.id, req.body).then(function (subscription) {
				res.status(200).send(subscription);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		});
};
