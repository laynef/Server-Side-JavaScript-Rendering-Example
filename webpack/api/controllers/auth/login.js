const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const bcrypt = require('bcrypt-nodejs');
const userPermissions = require('../../middleware/permission');
const R = require('../../middleware/reusable');
const _ = require('lodash');


module.exports = {

	login: (req, res) => {
		User.findAll({
			where: { email: req.body.email },
		})
			.then((response) => {
				let respond = response[0].dataValues;
				bcrypt.compare(req.body.password, respond.password, (error, result) => {
					if (!result) {
						res.status(400).send({
							message: 'Wrong Password',
						});
					} else {
						if (respond.permissions === 1) {
							let guests = respond.numberOfGuests ? respond.numberOfGuests++ : 1;
							User.update({
								numberOfGuests: guests,
							}, {
								where: { id: respond.id },
							});
						}
						Profile.findAll({
							where: { userId: respond.id },
						})
							.then(profiles => {
								let profile = profiles[0].dataValues;
								respond.permissions = userPermissions[respond.permissions];
								let userDataPrefix = R.addCamelCase([respond], 'user');
								let profileDataPrefix = R.addCamelCase([profile], 'userProfile');
								let all = _.extend(userDataPrefix[0], profileDataPrefix[0]);
								R.setter(`user_${respond.id}`, all);
								delete all.userPassword;
								R.sign(respond.id, (error, token) => {
									req.user = req.user ? req.user : {};
									req.user[respond.id] = respond.id;
									res.status(201).send({data: all, token: token});
								});
							})
							.catch(R.errorHandling);
					}
				});
			})
			.catch(R.errorHandling);
	},

};

