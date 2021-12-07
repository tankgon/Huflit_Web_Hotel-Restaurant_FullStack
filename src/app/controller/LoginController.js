const account = require("../models/Account");
const jwt = require("jsonwebtoken");
class LoginController {
  //[GET] /login
  login(req, res, next) {
    res.render("login");
  }
  // [POST] /login
  loginpost(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // kiểm tra thông tin 
    account
      .findOne({
        username: username,
        password: password,
      })
      .lean()
      // nếu thành công
      .then((data) => {
        if (data) {
          // mã hóa token
            // data._id tài khaon3
            // , thứ hai là mật khẩu  
          var token = jwt.sign({
              _id: data._id
          }, 'mk');
         return  res.json(
             {
                 message : "thành công",
                 token : token
             }
             
         );
        } else {
          res.json("thất bại");
        }
      })
      .catch(next);
  }
}
module.exports = new LoginController();
