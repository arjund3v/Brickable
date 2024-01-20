// Library Imports
const express = require('express');
const bodyParser = require('body-parser');
const clientSessions = require('client-sessions');

// Controller Imports
const legoData = require('./controllers/legoSetsController');
const authData = require('./controllers/userController');

// Route Imports
const Lego = require('./routes/Lego');
const User = require('./routes/User');

// Server Initialization
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

// Setup Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
	clientSessions({
		cookieName: 'session',
		secret: 's$8Fj^%h2*Pq!1t&L7@o9iBw5+uXc3*eZm6aYnGvQ0rK',
		duration: 2 * 60 * 1000,
		activeDuration: 1000 * 60,
	})
);
app.use((req, res, next) => {
	// Ensure all of our templates will have a session obj
	res.locals.session = req.session;
	next();
});

/********************************************
 *               Startup                    *
 ********************************************/
legoData
	.initialize()
	.then(authData.initialize)
	.then(function () {
		app.listen(port, function () {
			console.log(`app listening on: ${port}`);
		});
	})
	.catch(function (err) {
		console.log(`unable to start server: ${err}`);
	});

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
app.use('/user', User);

app.use((req, res, next) => {
	res.status(404).render('404', {
		message: `I'm sorry, we're unable to find what you're looking for.`,
	});
});
