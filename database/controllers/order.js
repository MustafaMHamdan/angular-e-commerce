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

    const query = `insert into order_details (BuyerId,productId ,quantity) select BuyerId,productId ,quantity From cart  where BuyerId=? And is_deleted=0 
    
    `;

    const data = [user_id];
    connection.query(query, data, (err, result2) => {
      if (err) {
        return res.status(409).json({
          success: false,
          massage: err.message,
        });
      }
      const query = `update order_details set order_id=? where BuyerId=? and is_deleted=0  `;
      const data2 = [order_id, user_id];

      connection.query(query, data2, (err, result2) => {
        console.log(data2);
        const query = `delete from cart where BuyerId=?  `;
        const data = [user_id];
        connection.query(query, data, (err, result) => {
          const query = `update   order_details set is_deleted=1 where order_id=?`;
          const data2 = [order_id];

          connection.query(query, data2, (err, result) => {
            return res.status(201).json({
              result,
            });
          });
        });
      });
    });
  });
};

const getOrderById = (req, res) => {
  const order_id = req.params.id;
  user_id = req.token.userId;
  const query = `SELECT order_id,userName,phone,email,title,quantity,price  FROM order_details INNER JOIN users ON order_details.BuyerId = users.UserID inner join products  on order_details.productId=products.productID
   where UserID=? AND order_id=? and order_details.is_deleted=1`;

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

  const query = `SELECT quantity,userName,phone,email,title,price ,order_id  FROM order_details INNER JOIN users ON order_details.BuyerId = users.UserID inner join products  on order_details.productId=products.productID
  where UserID=? and order_details.is_deleted=1;`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err.message,
      });
    } else {
      let y;
      let x;
      const result2 = Object.values(
        result.reduce((rs, obj) => {
          rs[obj.order_id] = rs[obj.order_id] || [
            {
              order_id: obj.order_id,
              userName: obj.userName,
              phone: obj.phone,
              email: obj.email,
            },

            (y = result.filter((element) => {
              return element.order_id == obj.order_id;
            })),
            (x = y.map((ele) => {
              return [
                { title: ele.title },
                { quantity: ele.quantity },
                { price: ele.price },
              ];
            })),
          ];

          return rs;
        }, [])
      );

      let z;

      z = result2.map((e) => {
        return e[2];
      });

      console.log(result2);

      res.status(200).json({
     

        z
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
