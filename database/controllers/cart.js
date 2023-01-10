const connection = require("../models/db");

const showCartProducts = (req, res) => {
  const userId = req.token.userId;
  const query =
    "select cart_id,image,price ,quantity ,title ,cart.productId from cart inner join products on  cart.productId=products.productID where  cart.BuyerId=? AND cart.quantity>0 AND cart.is_deleted=0";

  const data = [userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(200).json({
        success: false,
        cartProducts: err.message,
      });
    }

    if (result.length > 0) {
      let total = 0;
      let counter_quantity = 0;
      for (let i = 0; i < result.length; i++) {
        total = total + result[i].price * result[i].quantity;
        counter_quantity = counter_quantity + result[i].quantity;
      }

      return res.status(200).json({
        success: true,
        cartProducts: result,
        total_quantity: counter_quantity,
        total: total,
      });
    } else {
      return res.status(200).json({
        success: true,
        cartProducts: [],
      });
    }
  });
};

const addToCart = (req, res) => {
  const id = req.params.id;
  const userId = req.token.userId;

  const query = `select * from cart where productId=? AND BuyerId=? And is_deleted =0`;
  const data = [id, userId];

  connection.query(query, data, (err, result) => {
    console.log(result);
    if (result.length > 0) {
      const query4 = `update cart SET quantity =quantity+1 where productId=? AND BuyerId=? AND is_deleted =0 `;
      const data4 = [id, userId];

      connection.query(query4, data4, (err, result3) => {
        if (result3) {
          return res.status(201).json({
            message: "quantity updated",
          });
        }
      });
    } else {
      const query2 = `insert into cart (BuyerId,productId  ) VALUES (?,?,?)`;
      const data2 = [userId, id];

      connection.query(query2, data2, (err, res2) => {
        if (err) {
          return res.status(500).json({
            success: false,
            err: err.message,
          });
        }
        if (res2) {
          return res.status(201).json({
            success: true,
            massage: "the product has been added to cart successfully",
            result: res2,
          });
        }
      });
    }
  });
};
const removeItem = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM cart WHERE productId=? AND BuyerId=? AND is_deleted=0`;
  const data = [id, user_id];

  connection.query(query, data, (err, result) => {
    if (result.length) {
      const query = `UPDATE cart SET quantity=case when quantity>0 then quantity-1 else  0 end WHERE productId = ?;`;
      const data = [id];

      connection.query(query, data, (err, results) => {
      
        if (results.affectedRows != 0) {
          return res.status(201).json({
            success: true,
            massage: `Product Amount Updated -1`,
            result: results,
          });
        } else {
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    
       
    }
  });
};

const emptyCart = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.userId;
  const query = `UPDATE cart SET quantity=0
    WHERE BuyerId=? AND productId=? ;`;
  const data = [user_id,id];
  connection.query(query, data, (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `Products removed `,
        result: result,
      });
    }
  });
};

/*  */

module.exports = {
  showCartProducts,
  removeItem,
  addToCart,
  emptyCart,
};
