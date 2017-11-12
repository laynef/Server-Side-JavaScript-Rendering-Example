module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('Messages', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			threadId: {
				type: Sequelize.INTEGER,
			},
			active: {
				type: Sequelize.BOOLEAN,
			},
			text: {
				type: Sequelize.TEXT,
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
		return queryInterface.dropTable('Messages');
	},
};
