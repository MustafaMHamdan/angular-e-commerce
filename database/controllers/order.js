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

/* submitOrder */

const submitOrder = (req, res) => {
  const user_id = req.token.userId;

  const query = `INSERT INTO orders ( BuyerId) VALUES (?) `;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    console.log(result);
    const order_id = result.insertId;

    if (err) {
      return res.status(409).json({
        success: false,
        massage: err.message,
      });
    }
    const query = `insert into order_details (BuyerId,productId ,quantity) select BuyerId,productId ,quantity From cart  where BuyerId=? And is_deleted=0`;

    const data = [user_id];
    connection.query(query, data, (err, result2) => {
      if (err) {
        return res.status(409).json({
          success: false,
          massage: err.message,
        });
      }
      const query = `update   order_details set order_id=? where BuyerId=? `;
      const data2 = [order_id, user_id];

      /*
       */
      connection.query(query, data2, (err, result2) => {
        console.log(data2);
        const query = `delete from cart where BuyerId=?  `;
        const data = [user_id];
        connection.query(query, data, (err, result) => {
          return res.status(201).json({
            result,
          });
        });
      });
    });
  });
};

const getOrderById = (req, res) => {
  const order_id = req.params.id;
  user_id = req.token.userId;
  const query = `SELECT quantity,userName,phone,email,title,price,image  FROM order_details INNER JOIN users ON order_details.BuyerId = users.UserID inner join products  on order_details.productId=products.productID
   where UserID=? AND order_id=?`;

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
  const query = `SELECT * from orders  where BuyerId=? AND is_deleted=0 ;`;
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
