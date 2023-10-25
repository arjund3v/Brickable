const setData = require('../data/setData');
const themeData = require('../data/themeData');

let sets = [];

let initialize = () => {
	return new Promise((resolve, reject) => {
		setData.forEach((set) => {
			themeData.forEach((theme) => {
				if (theme.id === set.theme_id) {
					set.theme = theme.name;
				}
			});
			sets.push(set);
		});
		resolve();
	});
};

let getAllSets = () => {
	return new Promise((resolve, reject) => {
		resolve(sets);
	});
};

let getSetByNum = (setNum) => {
	return new Promise((resolve, reject) => {
		let found = sets.find((set) => set.set_num == setNum);

		// If find isn't undefined, we will resolve with the set
		if (found != undefined) {
			resolve(found);
		} else {
			// Otherwise we will reject with an error
			reject(new Error(`Couldn't find set with that number, please try again`));
		}
	});
};

let getSetsByTheme = (theme) => {
	return new Promise((resolve, reject) => {
		let foundArr = sets.filter((set) =>
			// We convert to lower case for the sake of case sensitivity
			set.theme.toLowerCase().includes(theme.toLowerCase())
		);

		if (foundArr != undefined && foundArr.length != 0) {
			resolve(foundArr);
		} else {
			reject(
				new Error(`Couldn't find sets with that theme, please try again.`)
			);
		}
	});
};

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
