module.exports = function (api, auth, stripe) {
	api
		.post('/plan', auth, function (req, res) {
			stripe.plans.create(req.body).then(function (plan) {
				res.status(200).send(plan);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.put('/plan/:id', auth, function (req, res) {
			stripe.plans.update(req.params.id, req.body).then(function (plan) {
				res.status(200).send(plan);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.delete('/plan/:id', auth, function (req, res) {
			stripe.plans.del(req.params.id).then(function (plan) {
				res.status(200).send(plan);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/plan/:id', auth, function (req, res) {
			stripe.plans.get(req.params.id).then(function (plan) {
				res.status(200).send(plan);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/plan/', auth, function (req, res) {
			stripe.plans.list().then(function (plans) {
				res.status(200).send(plans);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		});
};
