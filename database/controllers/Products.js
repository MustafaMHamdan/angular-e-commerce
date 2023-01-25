const connection = require("../models/db");

const addProduct = (req, res) => {
  const { title, price, image, category } = req.body;
  SellerId = req.token.userId;

  const query = `INSERT INTO products (title,price, image ,category,SellerId) VALUES (?,?,?,?,?)`;
  const data = [title, price, image, category, SellerId];
  connection.query(query, data, (err, result) => {
    console.log(result);
    /*   if (title.length == 1) {
      return res.status(201).json({
        success: false,
        massage: "Product title is too short",
      });
    }  */ /*else if (price == "") {
      return res.status(409).json({
        massage: " ! Product price required ",
      });
      
    } 
    
    else if (image=="") {
      return res.status(409).json({
        massage: " ! Product image required!  ",
      });
    }

    else if (category=="") {
      return res.status(409).json({
        massage: " ! Product category required!  ",
      });
    }
 */

    if (err) {
      return res.status(409).json({
        success: false,
        err: err.message,
      });
    }

    return res.status(201).json({
      success: true,
      massage: `${data[0]}  has been added successfully`,
      result: data,
    });
  });
};

/* ************* getAllProducts ***********/

const getAllProducts = (req, res) => {
  const query = "select * from products where is_deleted =0 ";

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        err: err.message,
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        All_Products: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        massage: "there is no product",
      });
    }
  });
};

/* ********getProductById******** */

const getProductById = (req, res) => {
  const id = req.params.id;
  const query = "select * from products where productID=? AND is_deleted =0 ";
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        err: err.message,
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        All_Products: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        massage: "there is no product",
      });
    }
  });
};

/* ************************* delete product */

const deleteProduct = (req, res) => {
  const id = req.params.id;
  const userId = req.token.userId;

  const query2 = "select * from products where productID=? AND is_deleted =0 ";
  const data2 = [id];

  connection.query(query2, data2, (err, result) => {
    console.log(result);
  
    if (result.length == 0) 
    {
      return res.status(500).json({
        success: false,
        massage: 'Product not found',
      });
    }



    if (err) {
      return res.status(500).json({
        success: false,
        err: err.message,
      });
    }

    if (result.length > 0) {
      const t = result[0].title;
      const query = `UPDATE products SET is_deleted=1  where productID=? AND SellerId=? ;`;

      const data = [id, userId];

      connection.query(query, data, (err, result) => {
        console.log(result);
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "Server Error",
            err: err.message,
          });
        }
        if (!result.changedRows) {
          return res.status(404).json({
            success: false,
            massage: `The Product: is not found`,
            err: err,
          });
        }
        res.status(202).json({
          success: true,
          massage: ` ${t} has been deleted `,
          result: result,
        });
      });
    }
  });
};

/* ************************* edit product */

const updateProduct = (req, res) => {
  const { title, price, image, category } = req.body;
  const id = req.params.id;
  const userId = req.token.userId;

  const query = `SELECT * FROM products WHERE productID=? AND SellerId=?;`;
  const data = [id, userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err.message,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        massage: `The Product: ${id} is not found`,
        err: err,
      });
    } else {
      const query2 = `UPDATE products SET title=?, price=?, image=? ,category=? WHERE productID=?;`;
      const data2 = [
        title || result[0].title,
        price || result[0].price,
        image || result[0].image,
        category || result[0].category,
        id,
      ];

      connection.query(query2, data2, (err, result2) => {
        if (result2.affectedRows != 0)
          return res.status(202).json({
            success: true,
            massage: ` ${data2[0]} updated`,
            result: result2,
          });
      });
    }
  });
};

/* addToCart ************************ */

const addToCart = (req, res) => {
  const amount = req.body.amount;
  const id = req.params.id;
  const userId = req.token.userId;

  const query = `select * from cart where productId=? AND BuyerId=? And is_deleted =0`;
  const data = [id, userId];

  connection.query(query, data, (err, result) => {
    if (result.length > 0) {
      const query4 = `update cart SET quantity =? where productId=? AND BuyerId=? AND is_deleted =0 `;
      const data4 = [result[0].quantity + amount, id, userId];

      connection.query(query4, data4, (err, result3) => {
        if (result3) {
          return res.status(200).json({
            message: "quantity updated",
          });
        }
      });
    } else {
      const query2 = `insert into cart (BuyerId,productId ,quantity ) VALUES (?,?,?)`;
      const data2 = [userId, id, amount];

      connection.query(query2, data2, (err, res2) => {
        if (err) {
          return res.status(500).json({
            success: false,
            err: err.message,
          });
        }
        if (res2) {
          return res.status(200).json({
            success: true,
            massage: "the product has been added to cart successfully",
            result: res2,
          });
        }
      });
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  addToCart,
  addProduct,
  deleteProduct,
  updateProduct,
};
