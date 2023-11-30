const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	password: String,
	loginHistory: [
		{
			dateTime: Date,
		},
		{
			userAgent: String,
		},
	],
});

module.exports = userSchema;
