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
				User.hasMany(models.Message, { foreignKey: 'id' });
				User.hasMany(models.Photo, { foreignKey: 'id' });
				User.hasMany(models.FileUpload, { foreignKey: 'id' });
				User.hasMany(models.Notification, { foreignKey: 'id' });
				User.belongsToMany(models.Friend, { through: 'id' });
				User.belongsToMany(models.Appointment, { through: 'id' });
				User.hasMany(models.Availability, { through: 'id' });
				User.hasMany(models.Follower, { foreignKey: 'id' });
				User.hasMany(models.Invoice, { foreignKey: 'id' });
				User.hasMany(models.Comment, { foreignKey: 'id' });
				User.hasMany(models.Review, { foreignKey: 'id' });
				User.hasMany(models.CommentLike, { foreignKey: 'id' });
				User.hasMany(models.HelpTicket, { foreignKey: 'id' });
				User.hasOne(models.Profile, { foreignKey: 'id' });
				User.hasMany(models.Blog, { foreignKey: 'id' });
				User.hasOne(models.BlackList, { foreignKey: 'id' });
			},
		},
	});
	return User;
};
