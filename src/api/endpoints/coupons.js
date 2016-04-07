module.exports = function (api, auth, stripe) {
	api
		.post('/coupon/', auth, function (req, res) {
			stripe.coupons.create(req.body).then(function (coupon) {
				res.status(200).send(coupon);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.put('/coupon/:id', auth, function (req, res) {
			stripe.coupons.update(req.params.id, req.body).then(function (coupon) {
				res.status(200).send(coupon);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.delete('/coupon/:id', auth, function (req, res) {
			stripe.coupons.del(req.params.id).then(function (coupon) {
				res.status(200).send(coupon);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/coupon/:id', auth, function (req, res) {
			stripe.coupons.get(req.params.id).then(function (coupon) {
				res.status(200).send(coupon);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		})
		.get('/coupon/', auth, function (req, res) {
			stripe.coupons.list().then(function (coupons) {
				res.status(200).send(coupons);
			}).catch(function (err) {
				res.status(err.code).send(err);
			});
		});
};
