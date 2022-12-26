const express = require("express");

 
const { showCartProducts,removeItem } = require("../controllers/cart");

 
const cartRouter = express.Router();
const authentication = require("../middleware/authentication");

 

cartRouter.get("/",authentication, showCartProducts);
cartRouter.put("/:id",authentication, removeItem);

module.exports = cartRouter;
