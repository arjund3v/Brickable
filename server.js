/********************************************************************************
 * WEB322 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Arjun Saini Student ID: 106182223 Date: 23/10/2023
 *
 ********************************************************************************/

const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

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

// Page Routes
app.get('/', (req, res) => {
	res.render(path.join(__dirname, 'views/home.ejs'));
});

app.get('/about', (req, res) => {
	res.render(path.join(__dirname, 'views/about.ejs'));
});

// API Routes
app.get('/lego/sets', async (req, res) => {
	let theme = req.query.theme;
	let sets = {};

	try {
		if (theme == undefined) {
			sets = await legoData.getAllSets();
			res.status(200).json(sets);
		} else {
			sets = await legoData.getSetsByTheme(theme);
			res.status(200).json(sets);
		}
	} catch (error) {
		res.status(404).render(path.join(__dirname, 'views/404.ejs'));
	}
});

app.get('/lego/sets/:set_num', async (req, res) => {
	try {
		let set = await legoData.getSetByNum(req.params.set_num);
		res.status(200).json(set);
	} catch (error) {
		res.status(404).render(path.join(__dirname, 'views/404.ejs'));
	}
});
