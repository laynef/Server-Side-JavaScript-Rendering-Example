const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const R = require('../../middleware/reusable');
const _ = require('lodash');


module.exports = {

	getSingleUser: (userId, cb) => {
		R.getter(`user_${userId}`,
			() => {
				User.findById(userId)
					.then(userData => {
						let serialUser = userData.dataValues;
						Profile.findAll({
							where: { userId: userId },
						})
							.then((profileData) => {
								let serialProfile = profileData.dataValues;
								let userInfo = R.addCamelCase([serialUser], 'user')[0];
								let profileInfo = R.addCamelCase([serialProfile], 'userProfile')[0];
								let all = _.extend(userInfo, profileInfo);
								R.setter(`user_${userId}`, all);
								cb(all);
							});
					});
			},
			(cache) => {
				cb(cache);
			});
	},

};

