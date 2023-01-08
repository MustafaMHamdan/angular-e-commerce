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
  let amount = 1;
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM cart WHERE productId=? AND BuyerId=? AND is_deleted = 0 `;
  const data = [product_id, user_id];

  connection.query(query, data, (err, result) => {
    if (result.length) {
      result[0].quantity = amount + result[0].quantity;
      const query = `UPDATE cart SET quantity=? WHERE productId=?  `;
      const data = [result[0].quantity, result[0].productId];
      connection.query(query, data, (err, results) => {
        if (results.affectedRows != 0) {
          return res.status(201).json({
            success: true,
            massage: `Product Amount Updated +1`,
            result: results,
          });
        } else {
          res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    } else {
     
      const query = `INSERT INTO cart (productId ,BuyerId) VALUES (?,?);`;
      const data = [product_id, user_id];
      connection.query(query, data, (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
        res.status(200).json({
          success: true,
          massage: `Product Added to Cart`,
          result: result,
        });
      });
    }
  });
};

const removeItem = (req, res) => {
  let amount = 1;
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM cart WHERE productId=? AND BuyerId=? AND is_deleted=0`;
  const data = [product_id, user_id];

  connection.query(query, data, (err, result) => {
    if (result.length) {
      result[0].quantity = result[0].quantity - amount;
      const query = `UPDATE cart SET quantity=? WHERE productId=? AND is_deleted=0 `;
      const data = [result[0].quantity, result[0].productId];
      connection.query(query, data, (err, results) => {
        if (result[0].quantity === 0) {
          const product_id = req.params.product_id;

          const query = `UPDATE cart SET is_deleted = 1 WHERE productId = ?;`;
          const data = [product_id];
          connection.query(query, data, (err, results) => {
            if (err) {
              return res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
              });
            }
          });
        }
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
  const user_id = req.token.userId;
  const query = `UPDATE cart SET is_deleted=1 
    WHERE BuyerId=?;`;
  const data = [user_id];
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