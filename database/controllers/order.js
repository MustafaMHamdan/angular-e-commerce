const connection = require("../models/db");

const checkOrder = (req, res) => {
  const user_id = req.token.userId;

  const query = `select cart_id,image,price ,quantity ,title ,cart.productId from cart inner join products on  cart.productId=products.productID where  cart.BuyerId=? AND cart.quantity>0 AND cart.is_deleted=0`;

  const data = [user_id];
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(409).json({
        success: false,
        massage: err.message,
      });
    }

    const query = `INSERT INTO orders ( BuyerId) VALUES (?)`;

    const data = [user_id];

    connection.query(query, data, (err, result2) => {
      if (result2.affectedRows) {
        return res.status(201).json({
          result2,
        });
      }
    });
  });
};

const submitOrder = (req, res) => {
  const user_id = req.token.userId;
  const order_id = req.params.id;

  const query = `UPDATE orders SET is_approved=1 WHERE BuyerId=? AND orderId=? `;
  const data = [user_id, order_id];

  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(409).json({
        success: false,
        massage: err.message,
      });
    }

    const query =  `UPDATE cart SET is_deleted=1 ,order_Id=? WHERE BuyerId=?`;
    const data2 = [order_id,user_id,];
    connection.query(query, data2, (err, result2) => {
      if (err) {
        return res.status(409).json({
          success: false,
          massage: err.message,
        });
      }

      const query = `delete from orders where BuyerId=? AND is_approved=0 `;
      const data = [user_id];

      connection.query(query, data, (err, result2) => {
        return res.status(200).json({
          result2,
        });
      });
    });
  });
};

const getOrderById = (req, res) => {
  const order_id = req.params.id;
  user_id = req.token.userId;
  const query = `SELECT * FROM orders INNER JOIN users ON orders.BuyerId = users.UserID inner join cart  on cart.order_Id=orders.orderId
   where UserID=? AND orderId=? AND orders.is_approved=1   `;

  const data = [user_id, order_id];
  connection.query(query, data, (err, result) => {
    console.log(result);
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
  user_id = req.token.userId;
  const query = `SELECT order_history,userName,phone,email,quantity,title,price FROM orders INNER JOIN users ON BuyerId = users.UserID Inner join cart on cart.BuyerId = users.UserID  inner join products on cart.productId=products.productID where UserID=? AND  cart.quantity>0 AND orders.is_deleted=0 ;`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
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
  checkOrder,
  getOrderById,
  allOrders,
  submitOrder,
};
