const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String,
	isAdmin: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;