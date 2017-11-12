const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const R = require('../../middleware/reusable');


module.exports = {

	patch: (req, res) => {
		Profile.update(req.body, {
			where: { userId: req.params.id },
		})
			.then((response) => {
				let data = response.dataValues;
				R.getter(`user_${req.params.id}`,
					() => {
						User.findAll({
							where: { id: req.params.id },
						})
							.then((users) => {
								let user = users.dataValues;
								user.profile = data;
								R.setter(`user_${req.params.id}`, user);
								delete user.password;
								res.status(202).send(user);
							})
							.catch(R.errorHandling);
					},
					(cache) => {
						let user = cache;
						user.profile = data;
						R.setter(`user_${req.params.id}`, user);
						delete user.password;
						res.status(202).send(user);
					});
			})
			.catch(R.errorHandling);
	},

};
