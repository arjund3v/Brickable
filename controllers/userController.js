const mongoose = require('mongoose');
const userSchema = require('../models/userModel');
require('dotenv').config();

let User;

let initialize = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let db = await mongoose.createConnection(process.env.MONGODB);

			db.on('error', (err) => {
				reject(err);
			});

			db.once('open', () => {
				User = db.model('users', userSchema);
				resolve();
			});
		} catch (error) {
			reject(error);
		}
	});
};

let registerUser = (userData) => {
	return new Promise(async (resolve, reject) => {
		let { userName, userAgent, email, password, password2 } = userData;

		try {
			if (password != password2) {
				reject('Passwords do not match');
			} else {
				let newUser = new User(userData);
				await newUser.save();
				resolve();
			}
		} catch (error) {
			if (error.code == 11000) {
				reject('User Name already taken');
			} else {
				reject(`There was an error creating the user: ${error}`);
			}
		}
	});
};

let checkUser = (userData) => {
	return new Promise(async (resolve, reject) => {
		let { userName, userAgent, email, password, password2 } = userData;
		try {
			let users = await User.find({ userName: userName });

			if (users.length == 0) {
				reject(`Unable to find user: ${userName}`);
			} else if (users[0].password != password) {
				reject(`Incorrect Password for user: ${userName}`);
			} else if (users[0].password == password) {
				if (users[0].loginHistory.length == 8) {
					users[0].loginHistory.pop();
					users[0].loginHistory.unshift({
						dateTime: new Date().toString(),
						userAgent: userAgent,
					});
					try {
						await User.updateOne(
							{ userName: users[0].userName },
							{ $set: { loginHistory: users[0].loginHistory } }
						);
						resolve(users[0]);
					} catch (error) {
						reject(`There was an error verifying the user: ${error}`);
					}
				}
			}
		} catch (error) {
			reject(`Unable to find user: ${userName}`);
		}
	});
};

module.exports = { initialize, registerUser, checkUser };
