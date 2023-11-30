const express = require('express');

let ensureLogin = (req, res, next) => {
	if (!req.session.user) {
		res.redirect('/user/login');
	} else {
		next();
	}
};

module.exports = ensureLogin;
