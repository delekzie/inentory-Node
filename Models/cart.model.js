const mongoose = require ("mongoose")
const Schema = mongoose.Schema


const CartSchema = new Schema ({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	  },
	  items: [
		{
		  productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		  },
		  quantity: {
			type: Number,
			required: true,
			min: 1,
		  },
		},
	  ]
})

const Cart = mongoose.model("carts", CartSchema);

module.exports = Cart;