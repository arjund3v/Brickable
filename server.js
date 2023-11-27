/********************************************************************************
 * WEB322 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Arjun Saini Student ID: 106182223 Date: 24/11/2023
 *
 ********************************************************************************/

// Library Imports
const express = require('express');
const bodyParser = require('body-parser');

// Controller Imports
const { initialize } = require('./controllers/legoSetsController');

// Route Imports
const Lego = require('./routes/Lego');

// Server Initialization
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/********************************************
 *               Startup                    *
 ********************************************/
try {
	initialize().then(() => {
		app.listen(port, () => {
			console.log(`Server listening on port: ${port}`);
		});
	});
} catch (error) {
	console.log(`error: ${error}`);
}

/********************************************
 *              Root Routes                 *
 ********************************************/
app.get('/', (req, res) => {
	res.render('home');
});

// About Page
app.get('/about', (req, res) => {
	res.render('about');
});

/********************************************
 *               Routes                     *
 ********************************************/
app.use('/lego', Lego);

app.use((req, res, next) => {
	res.status(404).render('404', {
		message: `I'm sorry, we're unable to find what you're looking for.`,
	});
});
