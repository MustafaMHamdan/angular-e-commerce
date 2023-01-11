const express = require("express");

const authentication = require("../middleware/authentication");

 
const { checkOrder ,getOrderById ,allOrders,submitOrder,insertintod} = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.post("/",authentication, checkOrder);
orderRouter.post("/insert",authentication, insertintod);
orderRouter.get("/:id",authentication, getOrderById);
orderRouter.get("/",authentication, allOrders);
 orderRouter.delete("/",authentication,submitOrder)//
 module.exports = orderRouter;