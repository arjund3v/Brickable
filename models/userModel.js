const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	userName: {
		type: String,
		unique: true,
	},
	password: String,
	email: String,
	loginHistory: [
		{
			dateTime: { type: Date },
			userAgent: { type: String },
		},
	],
});

module.exports = userSchema;
