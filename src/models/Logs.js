module.exports = (sequelize, DataTypes) => {
	return sequelize.define('logs', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		logs_moderation: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
		},
        logs_members: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
		},
        logs_messages: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
		},
        logs_channels: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
		},
        logs_generals: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};