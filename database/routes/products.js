const express = require("express");


const {
  getAllProducts,getProductById,addToCart,addProduct,deleteProduct,updateProduct
 
} = require("../controllers/Products");

 
 
const authentication = require("../middleware/authentication");
const authorization=require("../middleware/authorization")

const productsRouter = express.Router();

 

productsRouter.get("/", getAllProducts);
 
productsRouter.get("/:id", getProductById);
productsRouter.post("/:id",authentication, addToCart);
productsRouter.post("/",authentication,authorization('Add_Products') ,addProduct);
productsRouter.delete("/:id",authentication,authorization('DELETE_Products') ,deleteProduct);
productsRouter.put("/:id",authentication,authorization('Edit_Products') ,updateProduct);

module.exports = productsRouter;
