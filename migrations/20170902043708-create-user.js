module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			numberOfGuests: {
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			permissions: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: function(queryInterface) {
		return queryInterface.dropTable('Users');
	},
};
