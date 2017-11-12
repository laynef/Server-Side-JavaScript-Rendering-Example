module.exports = function(sequelize, DataTypes) {
	var Profile = sequelize.define('Profile', {
		userId: DataTypes.INTEGER,
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		image: DataTypes.STRING,
	}, {
		classMethods: {
			associate: function(models) {
				// associations can be defined here
				Profile.belongsTo(models.User, { foreignKey: 'userId' });
			},
		},
	});
	return Profile;
};
