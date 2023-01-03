const connection = require("../models/db");

const addProduct = (req, res) => {
  const { title, price, image } = req.body;
  SellerId = req.token.userId;

  const query = `INSERT INTO products (title,price, image ,SellerId) VALUES (?,?,?,?)`;
  const data = [title, price, image, SellerId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        err: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      massage: "Product Added Successfully",
      result: data,
    });
  });
};

/* ************* getAllProducts ***********/

const getAllProducts = (req, res) => {
  const query = "select * from products where is_deleted =0 ";

  connection.query(query, (err, result) => {
    console.log(result);
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

  const query = `UPDATE products SET is_deleted=1  where productID=?;`;

  const data = [id];

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
        massage: `The Product: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete project with id: ${id}`,
      result: result,
    });
  });
};

/* ************************* edit product */

const updateProduct = (req, res) => {
  const { title, price, image } = req.body;
  const id = req.params.id;

  const query = `SELECT * FROM products WHERE productID=?;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err.message,
      });
    }
    if (!result) {
      res.status(404).json({
        success: false,
        massage: `The Product: ${id} is not found`,
        err: err,
      });
    } else {
      const query = `UPDATE articles SET title=?, price=? image=? WHERE id=?;`;
      const data = [
        title || result[0].title,
        price || result[0].price,
        image || result[0].image,
        id,
      ];

      connection.query(query, data, (err, result) => {
        if (result.affectedRows != 0)
          res.status(201).json({
            success: true,
            massage: `Product updated`,
            result: result,
          });
      });
    }
  });
};

/* addToCart ************************ */

const addToCart = (req, res) => {
  const id = req.params.id;
  const userId = req.token.userId;

  const query = `select * from products where productID=? AND is_deleted =0`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (result) {
      const query3 = `select * from cart where productId=? AND is_deleted =0`;
      const data3 = [id];

      connection.query(query3, data3, (err, result2) => {
        if (result2.length > 0) {
          console.log(result2);
          const query4 = `update cart SET quantity = (quantity + 1) where productId=? AND is_deleted =0 `;
          const data4 = [id];

          connection.query(query4, data4, (err, result3) => {
            if (result3) {
              console.log(1);
            }
          });
        } else {
          const query2 = `insert into cart (BuyerId,productId  ) VALUES (?,?)`;
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
    } else {
      return res.status(404).json({
        success: false,
        massage: "the product is not found",
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
  updateProduct
};
