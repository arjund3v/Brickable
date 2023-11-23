const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Define a theme model
const Theme = sequelize.define(
	'Theme',
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

module.exports = Theme;
