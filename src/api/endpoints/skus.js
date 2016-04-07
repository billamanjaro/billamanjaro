module.exports = function (api, auth, stripe) {
	api
		.post('/sku', auth, function (req, res) {
			stripe.skus.create(req.body).then(function (sku) {
				res.status(200).send(sku);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.put('/sku/:id', auth, function (req, res) {
			stripe.skus.update(req.params.id, req.body).then(function (sku) {
				res.status(200).send(sku);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.delete('/sku/:id', auth, function (req, res) {
			stripe.skus.del(req.params.id).then(function (sku) {
				res.status(200).send(sku);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/sku/:id', auth, function (req, res) {
			stripe.skus.get(req.params.id).then(function (sku) {
				res.status(200).send(sku);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/sku/', auth, function (req, res) {
			stripe.skus.list().then(function (skus) {
				res.status(200).send(skus);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		});
};
