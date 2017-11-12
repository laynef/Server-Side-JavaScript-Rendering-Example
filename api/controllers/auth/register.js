const User = require('../../../models/index').User;
const Profile = require('../../../models/index').Profile;
const bcrypt = require('bcrypt-nodejs');
const userPermissions = require('../../middleware/permission');
const R = require('../../middleware/reusable');
const _ = require('lodash');


module.exports = {

	register: (permissionsIndex) => {
		return {
			post: (req, res) => {
				let salt = bcrypt.genSaltSync(10);
				bcrypt.hash(req.body.password, salt, null, (err, hashed) => {
					req.body.password = hashed;
					req.body.permissions = permissionsIndex;
					User.create({
						email: req.body.email,
						password: hashed,
						permissions: permissionsIndex,
					})
						.then((response) => {
							Profile.create({
								image: null,
								firstName: req.body.firstName,
								lastName: req.body.lastName,
							})
								.then(profile => {
									let returns = response.dataValues;
									let profiles = profile.dataValues;
									returns.permissions = userPermissions[returns.permissions];
									let userDataPrefix = R.addCamelCase([returns], 'user');
									let profileDataPrefix = R.addCamelCase([profiles], 'userProfile');
									let all = _.extend(userDataPrefix[0], profileDataPrefix[0]);
									R.setter(`user_${returns.id}`, all);
									delete all.userPassword;
									R.sign(returns.id, (error, token) => {
										req.user = req.user ? req.user : {};
										req.user[returns.id] = returns.id;
										res.status(201).send({data: returns, token: token});
									});
								})
								.catch(R.errorHandling);
						})
						.catch(R.errorHandling);
				});
			},
		};
	},

};

