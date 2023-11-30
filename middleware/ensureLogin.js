const express = require('express');

let ensureLogin = (req, res, next) => {
	if (!req.session.user) {
		res.redirect('/login');
	} else {
		next();
	}
};

module.exports = ensureLogin;
