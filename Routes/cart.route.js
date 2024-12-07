const express = require ("express")
const router = express.Router()

const Cart = require("../Models/cart.model")
const Product = require("../Models/product.model")









router.post("/", async (req, res) => {
  // Destructure required fields from request body
  const { userId, item } = req.body;
  console.log("Request Body:", req.body);
  try {
    // Find the product in the database using the correct query
    const product = await Product.findById(item.productId);
    console.log(product)
    if (!product) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }
    // Check if a cart exists for the given user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ 
        userId,
         items: [
          {
            productId,
            quantity 
          }
        ] 
      });
    }
    // Check if the product is already in the cart
    const productId = item.productId
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      // If the product exists in the cart, update its quantity
      cart.items[itemIndex].quantity += item.quantity;
    } else {
      // If the product is not in the cart, add it
      cart.items.push({ productId, quantity:item.quantity });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "Failed to add to cart", error: error.message });
  }
})































//finding by id

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log("UserId", req.params)
    try {
        const cart = await Cart.findOne({userId}).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
        }
        }
       )























router.get("/", async(req, res)=> {

  try{
    const getCart = await Cart.find()
    if (getCart === 0) {
			return res.status(404).json({ message: "No products found in this category." });
		}else{
			res.status(201).json(getCart)
		}
  }catch(error){
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch added products' });
  }
})



router.delete("/:productId", async(req,res)=>{
  const { productId } = req.params;
 
  console.log(req.params) 
  try{
    const response = await Cart.findById(productId)
    if (!response) {
      return res.status(404).json({ message: 'Product not found' });
    }
      // Delete the product from the database
      await Product.findByIdAndDelete(productId);
      res.status(200).json({ message: 'Product deleted successfully' });
  }catch(error){
    console.log(error)
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });

  }
})
module.exports = router;