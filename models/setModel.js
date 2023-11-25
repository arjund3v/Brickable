const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Theme = require('./themeModel');

// Define a set model
const Set = sequelize.define(
	'Set',
	{
		set_num: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		name: Sequelize.STRING,
		year: Sequelize.INTEGER,
		num_parts: Sequelize.INTEGER,
		theme_id: Sequelize.INTEGER,
		img_url: Sequelize.STRING,
	},
	{
		createdAt: false,
		updatedAt: false,
	}
);

// Define a relationship between the two models
Set.belongsTo(Theme, { foreignKey: 'theme_id' });

module.exports = Set;
