const express = require("express");

 
const { showCartProducts,removeItem,addToCart,emptyCart } = require("../controllers/cart");

 
const cartRouter = express.Router();
const authentication = require("../middleware/authentication");

 

cartRouter.get("/",authentication, showCartProducts);
cartRouter.post("/:product_id",authentication, addToCart);
cartRouter.delete("/:id",authentication, removeItem);
cartRouter.delete("/",authentication, emptyCart);
module.exports = cartRouter;
