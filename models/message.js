module.exports = function(sequelize, DataTypes) {
	var Message = sequelize.define('Message', {
		userId: DataTypes.INTEGER,
		threadId: DataTypes.INTEGER,
		text: DataTypes.TEXT,
		active: DataTypes.BOOLEAN,
	}, {
		classMethods: {
			associate: function(models) {
				// associations can be defined here
				Message.belongsTo(models.User, { foreignKey: 'userId' });
			},
		},
	});
	return Message;
};
