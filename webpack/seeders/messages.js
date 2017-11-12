module.exports = {
	up : function (queryInterface) {
		return queryInterface.bulkInsert('Messages', [{
			userId: 1,
			threadId: 1,
			text: "Welcome to my chat room!",
			createdAt : new Date(),
			updatedAt : new Date(),
		}], {});
	},
	down : function (queryInterface) {
		queryInterface.bulkDelete('Messages', [
			{
				threadId : 1,
			},
		]);
	},
};
