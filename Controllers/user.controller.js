const mongoose = require('mongoose')
const User = require("../Models/user.model")
 
//handle error
const handleError = (err) => {
	console.log(err.message, err.code)
	//all possible error in our database userSchema
	let errors = {email: "", password: ""}


	// duplicate error code
	if(err.code === 11000) {
		errors.email = "that email already registered"
		return errors;
	}
	//validation errors

	if(err.message.includes('users validation failed')) {
		Object.values(err.errors).forEach(({propertise}) => {
			errors[propertise.path] = propertise.message
		})
	}
	 
	return errors;
}


module.exports = {
	getSignup : (req, res) => {
		res.render("signup")
	},
	getLogin : (req, res) => {
		res.render("login")
	},
	postSignup : async (req, res) => {
		const {email, password} = req.body
		console.log(req.body)

		try{
			  const user = await User.create({email, password})
			  console.log(user)
			  res.status(201).json({message: "User created successfully" , status: "success" })
		}  
		catch(error) {
			console.log(err)
			// const errors = handleError(err)
			res.status(400).json( {message: "Error creating user"})
		}
	},
	postLogin : async (req, res) => {
		const {email, password} = req.body
		console.log(req.body)

		try{
			const user = await User.findOne({email});
			console.log(user)
			
			if(!user) return res.status(404).json({message: "User not found"})
			return res.status(201).json({user: user, message: "Login Successful", status: "success"})	
		}catch(error){
			res.status(500).json({message: "Server Error"})
	}
	}

} 