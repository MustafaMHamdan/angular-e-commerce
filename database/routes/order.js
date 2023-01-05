const express = require("express");

const authentication = require("../middleware/authentication");

 
const { create_order ,getOrderById ,allOrders} = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.post("/",authentication, create_order);
orderRouter.get("/:id",authentication, getOrderById);
orderRouter.get("/",authentication, allOrders);
 
module.exports = orderRouter;