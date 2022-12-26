const connection = require("../models/db");

const showCartProducts = (req, res) => {
  const userId = req.token.userId;

  const query =
    "select id,image,price ,quantity ,title from cart inner join products on  cart.productId=products.productID where  cart.BuyerId=? AND cart.is_deleted=0";

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
      for (let i = 0; i < result.length; i++) {
        total = total + result[i].price;
      }

      return res.status(200).json({
        success: true,
        cartProducts: result,
        qty: result.length,
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

const removeItem = (req, res) => {
  const userId = req.token.userId;
  const productId = req.params.id;

  const query = `UPDATE cart SET is_deleted=1 WHERE BuyerId=? AND id=? `;

  const data = [userId, productId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The product with productId: ${productId} with UserId: ${userId} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete Product with productId: ${productId} from cart with UserId: ${userId}`,
      result: result,
    });
  });
};

module.exports = {
  showCartProducts,
  removeItem,
};
