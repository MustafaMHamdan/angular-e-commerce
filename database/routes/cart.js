const express = require("express");

 
const { showCartProducts,removeItem,addToCart,emptyCart } = require("../controllers/cart");

 
const cartRouter = express.Router();
const authentication = require("../middleware/authentication");

 

cartRouter.get("/",authentication, showCartProducts);
cartRouter.post("/:id",authentication, addToCart);
cartRouter.put("/:id",authentication, removeItem);
cartRouter.delete("/:id",authentication, emptyCart);
module.exports = cartRouter;
