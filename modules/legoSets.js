const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Set = require('../models/setModel');
const Theme = require('../models/themeModel');

let initialize = () => {
	return new Promise((resolve, reject) => {
		sequelize
			.sync()
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

let getAllSets = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let setData = Set.findAll({
				include: [Theme],
			});
			resolve(setData);
		} catch (error) {
			reject(error);
		}
	});
};

let getSetByNum = (setNum) => {
	return new Promise(async (resolve, reject) => {
		let foundSet = await Set.findAll({
			where: {
				set_num: setNum,
			},
			include: [Theme],
		});

		if (foundSet != undefined) {
			resolve(foundSet[0]);
		} else {
			reject(new Error('Unable to find requested set'));
		}
	});
};

let getSetsByTheme = (theme) => {
	return new Promise(async (resolve, reject) => {
		let setArr = await Set.findAll({
			include: [Theme],
			where: { '$Theme.name$': { [Sequelize.Op.iLike]: `%${theme}%` } },
		});

		if (setArr != undefined) {
			resolve(setArr);
		} else {
			reject(new Error('Unable to find requested sets'));
		}
	});
};

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
