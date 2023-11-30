const express = require('express');
const router = express.Router();
const {
	getAllSets,
	getSetByNum,
	getSetsByTheme,
	addSet,
	getAllThemes,
	editSet,
	deleteSet,
} = require('../controllers/legoSetsController');
const ensureLogin = require('../middleware/ensureLogin');

/********************************************
 *               View Sets                  *
 ********************************************/
router.get('/sets', async (req, res) => {
	let theme = req.query.theme;
	let sets = {};

	try {
		if (theme == undefined) {
			sets = await getAllSets();
			res.status(200).render('sets', { sets: sets });
		} else {
			sets = await getSetsByTheme(theme);
			res.status(200).render('sets', { sets: sets });
		}
	} catch (error) {
		res
			.status(404)
			.render('404', { message: 'Unable to find requested sets.' });
	}
});

router.get('/sets/:set_num', async (req, res) => {
	try {
		let set = await getSetByNum(req.params.set_num);
		res.status(200).render('set', { set: set });
	} catch (error) {
		res.status(404).render('404', { message: 'Unable to find requested set.' });
	}
});

/********************************************
 *               Add Sets                   *
 ********************************************/
router.get('/addSet', ensureLogin, async (req, res) => {
	try {
		let themeData = await getAllThemes();
		res.status(200).render('addSet', { themes: themeData });
	} catch (error) {
		res.render('500', {
			message: `I'm sorry, but we have encountered the following error: ${error}`,
		});
	}
});

router.post('/addSet', ensureLogin, async (req, res) => {
	try {
		await addSet(req.body);
		res.redirect('/lego/sets');
	} catch (error) {
		res.render('500', {
			message: `I'm sorry, but we have encountered the following error: ${error}`,
		});
	}
});

/********************************************
 *               Edit Sets                  *
 ********************************************/
router.get('/editSet/:set_num', ensureLogin, async (req, res) => {
	try {
		let setData = await getSetByNum(req.params.set_num);
		let themeData = await getAllThemes();

		res.status(200).render('editSet', { themes: themeData, set: setData });
	} catch (error) {
		res.status(404).render('404', { message: error });
	}
});

router.post('/editSet', ensureLogin, async (req, res) => {
	try {
		await editSet(req.body.set_num, req.body);
		res.redirect('/lego/sets');
	} catch (error) {
		res.render('500', {
			message: `I'm sorry, but we have encountered the following error: ${error}`,
		});
	}
});

/********************************************
 *               Delete Sets                *
 ********************************************/
router.get('/deleteSet/:set_num', ensureLogin, async (req, res) => {
	try {
		await deleteSet(req.params.set_num);
		res.redirect('/lego/sets');
	} catch (error) {
		res.render('500', {
			message: `I'm sorry, but we have encountered the following error: ${error}`,
		});
	}
});

module.exports = router;
