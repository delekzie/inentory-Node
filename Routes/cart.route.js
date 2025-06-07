const express = require ("express")
const router = express.Router()

const Cart = require("../Models/cart.model")
const Product = require("../Models/product.model")


router.post("/", async (req, res) => {
  const { userId, item } = req.body;
  console.log("Request Body:", req.body);

  try {
    // Validate required fields
    if (!userId || !item?.productId || !item?.quantity) {
      return res
        .status(400)
        .json({ message: "userId, productId, and quantity are required" });
    }

    const productId = item.productId;

    // Find the product in the database
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if a cart exists for the given user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity: item.quantity,
          },
        ],
      });
    } else {
      // Check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (cartItem) => cartItem.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If the product exists in the cart, update its quantity
        cart.items[itemIndex].quantity += item.quantity;
      } else {
        // If the product is not in the cart, add it
        cart.items.push({ productId, quantity: item.quantity });
      }
    }
    // Save the cart to the database
    await cart.save();
    res.status(201).json({ cart, message: "Product Added Successfully!", status: "success" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
});

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




//how to get all the product in the cart

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









//how to delete product from users cart
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  console.log("USE IS AND PRODUCT ID",req.params)

  try {
    // Find the cart for the specified user
    const userCart = await Cart.findOne({ userId });
    console.log("ALL CART", userCart)

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Remove the product from the cart
    const updatedItems = userCart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    console.log("UPDATE IS", updatedItems)
    // If no changes, the product was not in the cart
    if (updatedItems.length === userCart.items.length) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the cart with the filtered items
    userCart.items = updatedItems;
    await userCart.save();

    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ message: 'Failed to delete product from cart', error: error.message });
  }
});

    // Example Express logic
router.get("/products", async (req, res) => {
  const { category, search } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (search) {
    filter.name = { $regex: search, $options: "i" }; // case-insensitive search
  }

  const products = await Product.find(filter);
  res.json(products);
});


module.exports = router;