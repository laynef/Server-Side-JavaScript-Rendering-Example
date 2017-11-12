const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const R = require('../../middleware/reusable');
const _ = require('lodash');


module.exports = {

	get: (req, res) => {
		Profile.findAll({
			where: { userId: req.params.id },
		})
			.then((response) => {
				let data = response[0].dataValues;
				R.getter(`user_${req.params.id}`,
					() => {
						User.findAll({
							where: { id: req.params.id },
						})
							.then((users) => {
								let user = R.addCamelCase([users[0].dataValues], 'user')[0];
								let profile = R.addCamelCase([data], 'userProfile')[0];
								let all = _.extend(user, profile);
								R.setter(`user_${req.params.id}`, all);
								delete user.password;
								res.status(200).send(all);
							})
							.catch(R.errorHandling);
					},
					(cache) => {
						let user = cache;
						let profile = R.addCamelCase([data], 'userProfile')[0];
						let all = _.extend(user, profile);
						R.setter(`user_${req.params.id}`, all);
						delete user.password;
						res.status(200).send(all);
					});
			})
			.catch(R.errorHandling);
	},

};
