const seederNames = require('../config/names');
const seederImages = require('../config/images');

module.exports = {
	up : function (queryInterface) {
		let testing = seederNames.map((e, i) => {
			let object = {
				lastName: 'Tester',
				image: null,
				createdAt : new Date(),
				updatedAt : new Date(),
			};
			object.userId = i + 3;
			object.firstName = e;
			return object;
		});
		let array = [
			{
				firstName : 'Layne',
				lastName : 'Faler',
				userId: 1,
				createdAt : new Date(),
				updatedAt : new Date(),
			},
			{
				firstName : 'Guest',
				lastName : 'Visiting',
				userId: 2,
				createdAt : new Date(),
				updatedAt : new Date(),
			},
		];
		let data = array.concat(testing);
		let profiles = data.map((e, i)=> {
			e.image = seederImages[i];
			return e;
		});
		return queryInterface.bulkInsert('Profiles', profiles, {});
	},

	down : function (queryInterface) {
		let array = seederNames.map((e, i) => {
			let object = {};
			object.userId = i + 3;
			return object;
		});
		let testing = [
			{
				userId : 1,
			},
			{
				userId : 2,
			},
		];
		let data = testing.concat(array);
		queryInterface.bulkDelete('Profiles', data);
	},
};
