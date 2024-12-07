const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const {isEmail} = require('validator')

const userSchema = new Schema ({
	email: {
		type : String,
		required:[true, "please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"]
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum length is 6 characters"]
	}
})

const User = mongoose.model("users", userSchema)
module.exports = User