const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Define a theme model
const Themes = sequelize.define(
	'Themes',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: Sequelize.STRING,
	},
	{
		createdAt: false,
		updatedAt: false,
	}
);

module.exports = Themes;
