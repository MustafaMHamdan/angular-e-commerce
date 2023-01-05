const connection = require("../models/db");

const create_order = (req, res) => {
  const user_id = req.token.userId;
  const orderHistory = req.body.orderHistory;
  const query = `INSERT INTO orders 
  ( BuyerId,order_history) VALUES (?,?)`;
  const data = [user_id, orderHistory];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: err.message,
        
      });
    }
    return res.status(200).json({
      success: true,
      massage: "Order Created Successfully",
      result,
    });
  });
};


const getOrderById = (req, res) => {
 
 const order_id=req.params.id
 user_id=req.token.userId
 const query = `SELECT order_history,userName,phone,email,quantity,title,price FROM orders INNER JOIN users ON orders.BuyerId = users.UserID Inner join cart on cart.BuyerId = users.UserID 
 inner join products on cart.productId=products.productID where UserID=? AND order_id=? AND  cart.quantity>0 AND orders.is_deleted=0 ;`;

  const data = [user_id,order_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        massage: `order history `,
        result: result,
      });
    }
  });
};
const allOrders = (req, res) => {
  user_id=req.token.userId
  const query = `SELECT order_history,userName,phone,email,quantity,title,price FROM orders INNER JOIN users ON BuyerId = users.UserID Inner join cart on cart.BuyerId = users.UserID  inner join products on cart.productId=products.productID where UserID=? AND  cart.quantity>0 AND orders.is_deleted=0 ;`;
const data=[user_id]
  connection.query(query,data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `order history `,
        result: result,
      });
    }
  });
};

module.exports = {
    create_order,
    getOrderById,
  allOrders,
};