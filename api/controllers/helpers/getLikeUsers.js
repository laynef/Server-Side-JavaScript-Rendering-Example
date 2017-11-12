const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const R = require('../../middleware/reusable');
const _ = require('lodash');


module.exports = {

	handleLikes: (arrayOfIntegers, cb) => {
		User.findAll({
			where: { id: arrayOfIntegers },
		})
			.then((users) => {
				let serialUsers = R.serialResponse(users);
				Profile.findAll({
					where: { userId: arrayOfIntegers },
				})
					.then((profiles) => {
						let serialProfiles = R.serialResponse(profiles);
						let singleUsers = R.addCamelCase(serialUsers, 'user');
						let singleProfiles = R.addCamelCase(serialProfiles, 'userProfile');
						let dictionary = {};
						singleProfiles.forEach((e) => {
							dictionary[e.userProfileUserId] = e;
						});
						let usersDictionary = {};
						let array = singleUsers.map((e) => {
							usersDictionary[e.userId] = _.extend(e, dictionary[e.userId]);
							return _.extend(e, dictionary[e.userId]);
						});
						cb(array, usersDictionary);
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((error) => {
				console.error(error);
			});
	},

};

