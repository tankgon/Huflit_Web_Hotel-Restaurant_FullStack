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
router.get("/sudungdichvu", checklogin, PrivateController.sudungdichvu);
router.get("/khachhangdichvu",checklogin,PrivateController.searchkhachhang);
router.get("/getTicket/:cmnd",checklogin,PrivateController.getTicket);
router.get("/get/:cmnd",checklogin,PrivateController.getData);

router.get("/phanquyen", checklogin, PrivateController.phanquyen);
router.get("/nhanphong", checklogin, PrivateController.nhanphong);
router.get("/traphong", checklogin, PrivateController.traphong);
router.get("/dattiec",checklogin,PrivateController.dattiec);

router.delete("/khachhang/:id",checklogin,PrivateController.deletesoftkhachhang);
router.put("/khachhang/:id",checklogin,PrivateController.puteditkhachhang);
router.get("/khachhang",checklogin,PrivateController.khachhang);
router.get("/dskhachhang",checklogin,PrivateController.dskhachhang);
router.get("/khachhang/:id/edit",checklogin,PrivateController.editkhachhang);

router.get("/dskhachhang/trash",checklogin,PrivateController.trashkhachhang);


router.get("/giahan",checklogin,PrivateController.giahan);
router.get("/phong",checklogin,PrivateController.phong);
router.get("/kiemtraphong",checklogin,PrivateController.kiemtraphong);
router.get("/capnhat",checklogin,PrivateController.capnhat);
router.get("/doiphong",checklogin,PrivateController.doiphong);

router.get("/test",checklogin,PrivateController.test);
router.get("/hdsuco",checklogin,PrivateController.hdsuco);
router.get("/hdungtruoc",checklogin,PrivateController.hdungtruoc);
router.get("/hdtraphong",checklogin,PrivateController.hdtraphong);
router.get("/hddichvu/:cmnd",checklogin,PrivateController.hddichvu);
// router.get("/hddichvu",checklogin,PrivateController.createhddichvu);
router.get("/themmonan",checklogin,PrivateController.themmonan);




// hi hello

router.post("/khachhang",checklogin,PrivateController.receivekhachhang);



router.post("/khachhangdichvu",checklogin,PrivateController.createphieudichvu);
router.post("/hddichvu",PrivateController.createhddichvu);
router.post("/dichvu",PrivateController.createdichvu);


module.exports = router;
