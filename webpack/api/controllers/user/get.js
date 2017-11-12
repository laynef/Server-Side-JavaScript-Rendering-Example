const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const userPermissions = require('../../middleware/permission');
const R = require('../../middleware/reusable');
const _ = require('lodash');


module.exports = {

	get: (req, res) => {
		R.getter(`user_${req.params.id}`,
			() => {
				User.findById(req.params.id)
					.then((response) => {
						let user = response.dataValues;
						Profile.findAll({
							where: { userid: user.id },
						})
							.then((resp) => {
								user.permissions = userPermissions[user.permissions];
								let profile = R.addCamelCase([resp.dataValues], 'userProfile')[0];
								let userInfo = R.addCamelCase([user], 'user')[0];
								let all = _.extend(userInfo, profile);
								R.setter(`user_${user.id}`, all);
								res.status(200).send(all);
							})
							.catch(R.errorHandling);
					})
					.catch(R.errorHandling);
			},
			(cache) => {
				res.status(200).send(cache);
			});
	},

};

