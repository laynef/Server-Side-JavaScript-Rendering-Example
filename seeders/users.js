const bcrypt = require('bcrypt-nodejs');
const seederNames = require('../config/names');

module.exports = {
	up : function (queryInterface) {
		let salt = bcrypt.genSaltSync(10);
		let password = 'pass1234';
		let testing = seederNames.map(e => {
			let placeholder = {
				password: bcrypt.hashSync(password, salt),
				permissions: 2,
				numberOfGuests: null,
				createdAt : new Date(),
				updatedAt : new Date(),
			};
			placeholder.email = e.toLowerCase() + '@email.com';
			return placeholder;
		});
		let array = [
			{
				password: bcrypt.hashSync(password, salt),
				permissions: 0,
				numberOfGuests: null,
				createdAt : new Date(),
				updatedAt : new Date(),
				email : 'admin@email.com',
			},
			{
				password: bcrypt.hashSync(password, salt),
				permissions: 1,
				numberOfGuests: null,
				createdAt : new Date(),
				updatedAt : new Date(),
				email : 'guest@email.com',
			},
		];
		let allUsers = array.concat(testing);
		return queryInterface.bulkInsert('Users', allUsers, {});
	},

	down : function (queryInterface) {
		let testing = seederNames.map(e => {
			let placeholder = {};
			placeholder.email = e.toLowerCase() + '@email.com';
			return placeholder;
		});
		let array = [
			{
				email : 'admin@email.com',
			},
			{
				email : 'guest@email.com',
			},
		];
		let allUsers = array.concat(testing);
		allUsers.map(e => e.email);
		queryInterface.bulkDelete('Users', allUsers);
	},
};
