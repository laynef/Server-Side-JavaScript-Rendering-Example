const User = require('../../../models/index').User;
const bcrypt = require('bcrypt-nodejs');
const R = require('../../middleware/reusable');


module.exports = {

	changePassword: (req, res) => {
		R.getter(`user_${req.params.id}`,
			() => {
				res.status(401).send("User not cached");
			},
			(cachedObject) => {
				bcrypt.compare(req.body.password, cachedObject.password, (error, result) => {
					if (error) {
						console.error(error);
						res.status(500).send({
							message: "ISSUE WITH BCYRPT",
							error: error,
						});
					}
					if (!result) {
						cachedObject.tries = cachedObject.tries ? cachedObject.tries++ : 1;
						R.setter(`user_${req.params.id}`, cachedObject);
						res.status(400).send({
							message: 'Wrong Password',
							tries: cachedObject.tries,
							invalid: true,
						});
					} else {
						let salt = bcrypt.genSaltSync(10);
						bcrypt.hash(req.body.newPassword, salt, null, (error, hashed) => {
							User.update({
								password: hashed,
							}, {
								where: { id: req.params.id },
							})
								.then(() => {
									cachedObject.password = hashed;
									R.setter(`user_${req.params.id}`, cachedObject);
									delete cachedObject.password;
									res.status(202).send(cachedObject);
								})
								.catch(R.errorHandling);
						});
					}
				});
			});
	},

};

