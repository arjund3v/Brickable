/********************************************************************************
 * WEB322 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Arjun Saini Student ID: 106182223 Date: 20/11/2023
 *
 ********************************************************************************/

require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');
const path = require('path');
const legoData = require('./modules/legoSets');

const app = express();
const port = 3000;

// Set templating engine
app.set('view engine', 'ejs');

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

// Will initialize and then start the server, will catch any errors if something unexpected occurs
try {
	legoData.initialize().then(() => {
		app.listen(port, () => {
			console.log(`Server listening on port: ${port}`);
		});
	});
} catch (error) {
	console.log(`error: ${error}`);
}

// Mark the public folder as static
app.use(express.static('public'));

// ROUTE: Home Page
app.get('/', (req, res) => {
	res.render('home');
});

// ROUTE: About page
app.get('/about', (req, res) => {
	res.render('about');
});

// API: Main Endpoint
app.get('/lego/sets', async (req, res) => {
	let theme = req.query.theme;
	let sets = {};

	try {
		if (theme == undefined) {
			sets = await legoData.getAllSets();
			res.status(200).render('sets', { sets: sets });
		} else {
			sets = await legoData.getSetsByTheme(theme);
			res.status(200).render('sets', { sets: sets });
		}
	} catch (error) {
		res
			.status(404)
			.render('404', { message: 'Unable to find requested sets.' });
	}
});

// API: set by num endpoint
app.get('/lego/sets/:set_num', async (req, res) => {
	try {
		let set = await legoData.getSetByNum(req.params.set_num);
		res.status(200).render('set', { set: set });
	} catch (error) {
		res.status(404).render('404', { message: 'Unable to find requested set.' });
	}
});

// MIDDLEWARE: All non existing routes will come here
app.use((req, res, next) => {
	res.status(404).render('404', {
		message: `I'm sorry, we're unable to find what you're looking for.`,
	});
});
