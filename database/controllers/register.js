const connection = require("../models/db");

/* const bcrypt = require("bcrypt"); */
const saltRounds = 10;

const register = async (req, res) => {
  const { userName, phone, email, password } = req.body;
  const role_id = req.body.role_id || 2;
  /* const encryptedPassword = await bcrypt.hash(password, saltRounds); */

  const query = `INSERT INTO users (userName,phone, email ,password,role_id) VALUES (?,?,?,?,?)`;
  const data = [userName, phone, email, password, role_id];
  connection.query(query, data, (err, result) => {
    console.log(result);
    let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (userName == "") {
      return res.status(409).json({
        massage: "!Username required",
      });
    } else if (email == "") {
      return res.status(409).json({
        massage: " ! Enter your email!  ",
      });
      
    } 
    
    else if (!email.match(mailFormat)) {
      return res.status(409).json({
        massage: " ! Enter a valid email!  ",
      });
      
    } 
    else if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err: err.message,
      });
    }
    else if (password.length < 6) {
      return res.status(409).json({
        massage: "!Your Password should have at least 6 characters ",
      });
    } //
    
    
    
    

    return res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result: data,
    });
  });
};

module.exports = {
  register,
};
