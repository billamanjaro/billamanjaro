module.exports = function (api, auth, stripe) {
	api
		.post('/order', auth, function (req, res) {
			stripe.orders.create(req.body).then(function (order) {
				res.status(200).send(order);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.put('/order/:id', auth, function (req, res) {
			stripe.orders.update(req.params.id, req.body).then(function (order) {
				res.status(200).send(order);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/order/:id', auth, function (req, res) {
			stripe.orders.get(req.params.id).then(function (order) {
				res.status(200).send(order);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/order/', auth, function (req, res) {
			stripe.orders.list().then(function (orders) {
				res.status(200).send(orders);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.post('/order/:id/pay', auth, function (req, res) {
			stripe.orders.pay(req.params.id, req.body).then(function (order) {
				res.status(200).send(order);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		});
};
