const connection = require("../models/db");

 const bcrypt = require("bcrypt"); 
const saltRounds = 10;

const register = async (req, res) => {
  const { userName, phone, email, password } = req.body;
  const role_id = req.body.role_id || 2;
   const encryptedPassword = await bcrypt.hash(password, saltRounds); 
 
  const query = `INSERT INTO users (userName,phone, email ,password,role_id) VALUES (?,?,?,?,?)`;
  const data = [userName, phone, email, encryptedPassword, role_id];
  connection.query(query, data, (err, result) => {
    console.log(result,data);
 
    
    
     if (err) {
      return res.status(409).json({
        success: false,
        massage:" already exist",
        err:err.message ,
      });
    }
    

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
