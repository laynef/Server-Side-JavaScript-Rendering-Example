const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const R = require('../../middleware/reusable');
const _ = require('lodash');


module.exports = {

	getProfiles: (serialResponses, idProperty, prefixer, cb) => {
		let users = serialResponses.map((e) => {
			return {
				data: e,
				user: e[idProperty],
			};
		});
		let getUsers = users.map(e => e.user);
		User.findAll({
			where: { id: getUsers },
		})
			.then((usersResponse) => {
				let serialsUsers = R.serialResponse(usersResponse).map((e) => {
					delete e.password;
					return e;
				});
				let serialUsers = R.addCamelCase(serialsUsers, prefixer);
				Profile.findAll({
					where: { userId: getUsers },
				})
					.then((profilesResponse) => {
						let serialsProfiles = R.serialResponse(profilesResponse);
						let serialProfiles = R.addCamelCase(serialsProfiles, `${prefixer}Profile`);
						let dictionaryProfile = {};
						serialProfiles.forEach((e) => {
							dictionaryProfile[e[`${prefixer}ProfileUserId`]] = e;
						});
						let fullDictionary = {};
						serialUsers.forEach((e) => {
							let object = _.extend(e, dictionaryProfile[e[`${prefixer}Id`]]);
							fullDictionary[e[`${prefixer}Id`]] = object;
						});
						let array = users.map(e => {
							let all = _.extend(e.data, fullDictionary[e.user]);
							return all;
						});
						let object = R.dictionaryById(array);
						cb(object, array);
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
