module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		permissions: DataTypes.INTEGER,
		numberOfGuests: DataTypes.INTEGER,
	}, {
		classMethods: {
			associate: function(models) {
				// associations can be defined here
				User.hasOne(models.Profile, { foreignKey: 'id' });
			},
		},
	});
	return User;
};
