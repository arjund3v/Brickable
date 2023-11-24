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

let addSet = (setData) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log(setData);
			let createdSet = await Set.create({
				name: setData.name,
				year: setData.year,
				num_parts: setData.num_parts,
				img_url: setData.img_url,
				theme_id: setData.theme_id,
				set_num: setData.set_num,
			});
			resolve();
		} catch (error) {
			reject(error.message);
		}
	});
};

let getAllThemes = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let themes = Theme.findAll({});
			resolve(themes);
		} catch (error) {
			reject(error.errors[0].message);
		}
	});
};

module.exports = {
	initialize,
	getAllSets,
	getSetByNum,
	getSetsByTheme,
	addSet,
	getAllThemes,
};
