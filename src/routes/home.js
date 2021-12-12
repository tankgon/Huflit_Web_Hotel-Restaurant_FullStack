const express= require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const HomeController = require("../app/controller/PrivateController");

// bắt buộc login mới vào được 

router.get('/',(req,res,next)=>{
    try{
        var token = req.cookies.token;
        var ketqua = jwt.verify(token,'mk')
        if(ketqua)
            next();
    }
    catch(error)
    {
        // return res.redirect("login");
         return res.json("thất bại");
    }

}
, (req, res, next) => {
        res.json("welcome");});

module.exports = router 