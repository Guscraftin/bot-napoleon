module.exports = (sequelize, DataTypes) => {
	return sequelize.define('logs', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		logs_members: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
            unique: true,
		},
        logs_messages: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
            unique: true,
		},
        logs_channels: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
            unique: true,
		},
        logs_generals: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: false,
            unique: true,
		},
	}, {
		timestamps: false,
	});
};