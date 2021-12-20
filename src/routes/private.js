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
// router.get("/themdichvu", checklogin, PrivateController.themdichvu);
router.get("/sudungdichvu", checklogin, PrivateController.sudungdichvu);
router.get("/phanquyen", checklogin, PrivateController.phanquyen);
router.get("/nhanphong", checklogin, PrivateController.nhanphong);
router.get("/traphong", checklogin, PrivateController.traphong);
router.get("/dattiec",checklogin,PrivateController.dattiec);
router.get("/khachhang",checklogin,PrivateController.khachhang);
router.get("/giahan",checklogin,PrivateController.giahan);
router.get("/phong",checklogin,PrivateController.phong);
router.get("/kiemtraphong",checklogin,PrivateController.kiemtraphong);
router.get("/capnhat",checklogin,PrivateController.capnhat);
router.get("/doiphong",checklogin,PrivateController.doiphong);
router.get("/dskhachhang",checklogin,PrivateController.dskhachhang);
router.get("/test",checklogin,PrivateController.test);
router.get("/hdsuco",checklogin,PrivateController.hdsuco);
router.get("/hdungtruoc",checklogin,PrivateController.hdungtruoc);
router.get("/hdtraphong",checklogin,PrivateController.hdtraphong);
router.get("/hddichvu",checklogin,PrivateController.hddichvu);
router.get("/themmonan",checklogin,PrivateController.themmonan);


// router.get("/",checklogin.PrivateController.);

// hi hello

router.post("/khachhang",checklogin,PrivateController.receivekhachhang);
router.post("/test",checklogin,PrivateController.testt);




module.exports = router;
