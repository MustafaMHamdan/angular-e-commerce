const express = require("express");

const authentication = require("../middleware/authentication");

 
const { checkOrder ,getOrderById ,allOrders,submitOrder} = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.post("/",authentication, checkOrder);
orderRouter.get("/:id",authentication, getOrderById);
orderRouter.get("/",authentication, allOrders);
 orderRouter.delete("/:id",authentication,submitOrder)//
 module.exports = orderRouter;