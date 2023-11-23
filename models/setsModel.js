const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Themes = require('./themesModel');

// Define a set model
const Sets = sequelize.define(
	'Sets',
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
Sets.belongsTo(Themes, { foreignKey: 'theme_id' });

module.exports = Sets;
