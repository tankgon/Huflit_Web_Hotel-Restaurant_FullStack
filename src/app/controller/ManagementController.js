const account = require("../models/Account");
const jwt = require("jsonwebtoken");
var checklogin = (req, res, next) =>{
    try {
      var token = req.cookies.token;
      var idUser = jwt.verify(token, "mk");
      account
        .findOne({
          _id: idUser,
        })
        .then((data) => {
          if (data) {
            req.data = data
            next();
          } else {
            res.json("token không hợp lệ");
          }
        })
        .catch(next);
    } catch (error) {
      res.status(500).json("lỗi bên server");
    }
  }
   
var checkMangement = (req,res,next)=>
{
  if(req.data.role ==='management')
  next()
  else
  {
    res.json("bạn không đủ điều kiện")
  }
}
 class ManagementController {
  checklogin = checklogin
  check = checkMangement
  managemented(req, res, next) {
    console.log(req.data)
    res.json("thành công");
  }
};
module.exports = new ManagementController();
