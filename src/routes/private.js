const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var checklogin = (req, res, next) => {
  try {
    var token = req.cookies.token;
    var ketqua = jwt.verify(token, "mk");
    if (ketqua) next();
  } catch (error) {
    res.redirect("login");
  }
};
const PrivateController = require("../app/controller/PrivateController");

router.get("/",checklogin, PrivateController.privated);
router.get("/dichvu", checklogin, PrivateController.dichvu);
router.get("/phanquyen", checklogin, PrivateController.phanquyen);
router.get("/nhanphong", checklogin, PrivateController.nhanphong);
router.get("/traphong", checklogin, PrivateController.traphong);
router.get("/dattiec",checklogin,PrivateController.dattiec);
router.get("/khachhang",checklogin,PrivateController.khachhang);
router.get("/khachhang",checklogin,PrivateController.giahan);
router.get("/phong",checklogin,PrivateController.phong);
router.get("/doiphong",checklogin,PrivateController.doiphong);
router.get("/dskhachhang",checklogin,PrivateController.dskhachhang);


router.post("/receivekhachhang",checklogin,PrivateController.receivekhachhang);


module.exports = router;
