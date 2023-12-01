const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/userModel');
require('dotenv').config();

let User;

let initialize = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let db = mongoose.createConnection(process.env.MONGODB);

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
		try {
			if (userData.password != userData.password2) {
				reject('Passwords do not match');
			} else {
				// First encrypt the password
				try {
					let hash = await bcrypt.hash(userData.password, 10);
					userData.password = hash;
				} catch (error) {
					// If we get an error in encryption, we reject with the message
					reject(`There was an error encrypting the password`);
				}

				// If encryption goes through, we attempt to save the user and resolve the promise
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
		try {
			let users = await User.find({ userName: userData.userName });

			if (users.length == 0) {
				reject(`Unable to find user: ${userData.userName}`);
			}

			try {
				let result = await bcrypt.compare(userData.password, users[0].password);

				if (result) {
					if (users[0].loginHistory.length == 8) {
						users[0].loginHistory.pop();
					}

					users[0].loginHistory.unshift({
						dateTime: new Date().toString(),
						userAgent: userData.userAgent,
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
				} else {
					reject(`Incorrect Password for user: ${userData.userName}`);
				}
			} catch (error) {
				reject(`There was an error during password checking`);
			}
		} catch (error) {
			reject(`Unable to find user: ${userData.userName}`);
		}
	});
};

module.exports = { initialize, registerUser, checkUser };
