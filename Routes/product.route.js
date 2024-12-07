const express = require("express")
const router = express.Router();

const Product = require("../Models/product.model")

// gets all product
router.get("/", async(req, res)=> {
	try{
		const { category } = req.query
		console.log(req.query)

		let products;
		
		if(category){
			 products = await Product.find({category: category})
		     console.log(products)
		}
		
		else{
		   products = await Product.find()
		}
		
		if (products === 0) {
			return res.status(404).json({ message: "No products found in this category." });
		}else{
			res.status(201).json(products)
		}
		

	}catch(error){
		console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
	}
})


//save a product
router.post("/", async(req, res)=> {

	try{
		const { name, price, image, category, description, inStock } = req.body;

		const newItems = new Product({
			
			name,
			price,
			image,
			category,
			description,
			inStock
		})
		const result = await newItems.save()
		res.send(result)
		console.log(result)
	}catch(error){
		console.log(error)
		res.status(400).json({message : "Error while creating product"})
	}
}
)




//get a product by id
router.get("/:id", async(req, res)=> {
	const id = req.params.id
	try{
		const product = await Product.findById(id);
		res.status(201).json(product)
		if(!product){
			console.log("product does not exist")
		}
	}catch(error){
		console.log(error)
	}

})


module.exports = router;
