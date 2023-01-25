const connection = require("../models/db");
/* const bcrypt = require("bcrypt");
 */ const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT * FROM users  WHERE email=?`;
  const data = [email];
  connection.query(query, data, (err, result) => {
    if (err) {

      return res.status(200).json({
        success: false,
        massage: err.message,
      });

    };
    if (result.length > 0) {
      /////////////
      const payload = {
        userId: result[0].UserID,
        role_id: result[0].role_id,
      };

      if (result[0].password === password) {
        const secret = process.env.SECRET;

        const token = jwt.sign(payload, secret);

        {
          return res.status(200).json({ token, result });
        }
      } else {
        return res.status(401).json({
          success: false,
          massage: `The password you’ve entered is incorrect`,
        });
      }

      //////////////////////
    } else {
      return res
        .status(404)
        .json({ success: false,  massage: "The email doesn't exist"  });
    }
  });
};

module.exports = {
  login,
};
