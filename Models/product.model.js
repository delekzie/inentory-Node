const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
	name : {
		type: String,
		require: true,
		trim: true
	},
	price : {
		type: Number,
		required: true,
		min: 0
	},
	image: {
        type: String,
        required: [true, 'Product image URL is required'],
    },
	inStock : {
		type: Boolean,
        default: true,
	},
	description : {
		type: String,
		trim: true,
		default: "No description provided"
	},
	category : {
		type: String,
		required: true,
		trim: true
	},
	createdAt : {
		type: Date,
		default : Date.now() 
	},
	updatedAt : {
		type: Date,
		default: Date.now()
	}
}) 

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;