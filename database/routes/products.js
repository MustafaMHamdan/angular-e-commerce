const express = require("express");


const {
  getAllProducts,getProductById,addToCart
 
} = require("../controllers/Products");

 
 
const authentication = require("../middleware/authentication");


const productsRouter = express.Router();

 

productsRouter.get("/", getAllProducts);
 
productsRouter.get("/:id", getProductById);
productsRouter.post("/:id",authentication, addToCart);
 

module.exports = productsRouter;
