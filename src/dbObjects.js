const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Logs = require('./models/Logs.js')(sequelize, Sequelize.DataTypes);

module.exports = { Logs, sequelize };