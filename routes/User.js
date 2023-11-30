const express = require('express');
const router = express.Router();
const {
	initialize,
	registerUser,
	checkUser,
} = require('../controllers/userController');
const ensureLogin = require('../middleware/ensureLogin');

router.get('/login', (req, res) => {
	res.status(200).render('login');
});

router.get('/register', (req, res) => {
	res.status(200).render('register');
});

router.post('/register', async (req, res) => {
	try {
		await registerUser(req.body);
		res.render('register', { successMessage: 'User created' });
	} catch (error) {
		res.render('render', {
			errorMessage: error,
			userName: req.body.userName,
		});
	}
});

router.post('/login', async (req, res) => {
	req.body.userAgent = req.get('User-Agent');
	try {
		let user = await checkUser(req.body);
		req.session.user = {
			userName: user.userName,
			email: user.email,
			loginHistory: user.loginHistory,
		};
		res.redirect('/lego/sets');
	} catch (error) {
		res.render('login', { errorMessage: error, userName: req.body.userName });
	}
});

router.get('/logout', (req, res) => {
	req.session.reset();
	res.redirect('/');
});

router.get('/userHistory', ensureLogin, (req, res) => {
	res.status(200).render('userHistory');
});

module.exports = router;
