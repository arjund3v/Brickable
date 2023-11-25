require('dotenv').config();
const Sequelize = require('sequelize');

// Database Setup
const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
		port: 5432,
		dialectOptions: {
			ssl: { rejectUnauthorized: false },
		},
	}
);

// Establish Database connection
sequelize
	.authenticate()
	.then(() => {
		console.log(
			`Connection to ${process.env.DB_DATABASE} has been established successfully.`
		);
	})
	.catch((err) => {
		console.log('Unable to connect to the database:', err);
	});

module.exports = sequelize;
