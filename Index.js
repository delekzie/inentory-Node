const express = require ("express")
const app = express()
const mongoose = require ("mongoose") 
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.static("public"))
const productRoute = require("./Routes/product.route")
const cartRoute = require("./Routes/cart.route")

const dbUri = "mongodb+srv://Oluwatosin:aderinwale12@cluster0.jxpibgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbUri, {
	dbName : "Information",
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=> {
	console.log("database connected successfully")
}).catch(()=> {
	console.log("error connecting to database")
})

app.use(express.json())
app.use(cors());
app.use("/products", productRoute)
app.use("/cart", cartRoute)
app.listen(3000, ()=> {
	console.log("app is running on port 3000")
})
const authRoutes = require('./Routes/user.route')
app.use("/user", authRoutes)

