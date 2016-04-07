module.exports = function (api, auth, stripe) {
	api
		.post('/product', auth, function (req, res) {
			stripe.products.create(req.body).then(function (product) {
				res.status(200).send(product);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.put('/product/:id', auth, function (req, res) {
			stripe.products.update(req.params.id, req.body).then(function (product) {
				res.status(200).send(product);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.delete('/product/:id', auth, function (req, res) {
			stripe.products.del(req.params.id).then(function (product) {
				res.status(200).send(product);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/product/:id', auth, function (req, res) {
			stripe.products.get(req.params.id).then(function (product) {
				res.status(200).send(product);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/product/', auth, function (req, res) {
			stripe.products.list().then(function (products) {
				res.status(200).send(products);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		});
};
