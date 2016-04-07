module.exports = function (api, auth, stripe) {
	api
		.post('/invoice', auth, function (req, res) {
			stripe.invoices.create(req.body).then(function (invoice) {
				res.status(200).send(invoice);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.put('/invoice/:id', auth, function (req, res) {
			stripe.invoices.update(req.params.id, req.body).then(function (invoice) {
				res.status(200).send(invoice);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.delete('/invoice/:id', auth, function (req, res) {
			stripe.invoices.del(req.params.id).then(function (invoice) {
				res.status(200).send(invoice);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/invoice/:id', auth, function (req, res) {
			stripe.invoices.get(req.params.id).then(function (invoice) {
				res.status(200).send(invoice);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/invoice/', auth, function (req, res) {
			stripe.invoices.list().then(function (invoices) {
				res.status(200).send(invoices);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/invoice/:customer/upcoming', auth, function (req, res) {
			stripe.invoices.retrieveUpcoming(req.params.customer).then(function (invoice) {
				res.status(200).send(invoice);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		});
};
