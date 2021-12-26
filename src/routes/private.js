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

//[DICHVU]
router.get("/dichvu", checklogin, PrivateController.dichvu);
router.get("/sudungdichvu", checklogin, PrivateController.sudungdichvu);
router.get("/khachhangdichvu",checklogin,PrivateController.searchkhachhang);
router.get("/getTicket/:cmnd",checklogin,PrivateController.getTicket);
router.get("/get/:cmnd",checklogin,PrivateController.getData);


router.post("/dichvu",checklogin,PrivateController.createdichvu);

//[QUẢN LÝ ]
router.get("/phanquyen", checklogin, PrivateController.phanquyen);


//[ĐẶT TIỆC]
router.get("/dattiec",checklogin,PrivateController.dattiec);
router.get("/themmonan",checklogin,PrivateController.themmonan);

//[KHACHHANG]
router.delete("/khachhang/:id/force",checklogin,PrivateController.deleteforcekhachhang);
router.patch("/khachhang/:id/restore",checklogin,PrivateController.restorekhachhang);
router.delete("/khachhang/:id",checklogin,PrivateController.deletesoftkhachhang);
router.put("/khachhang/:id",checklogin,PrivateController.puteditkhachhang);
router.get("/khachhang",checklogin,PrivateController.khachhang);
router.get("/dskhachhang",checklogin,PrivateController.dskhachhang);
router.get("/khachhang/:id/edit",checklogin,PrivateController.editkhachhang);
router.get("/dskhachhang/trash",checklogin,PrivateController.trashkhachhang);


router.post("/khachhang",checklogin,PrivateController.receivekhachhang);

//[PHÒNG]
router.get("/khachhangdatphong", checklogin, PrivateController.khachhangdatphong);
router.get("/datphong", checklogin, PrivateController.datphongget);

router.get("/giahan",checklogin,PrivateController.giahan);
router.get("/capnhat",checklogin,PrivateController.capnhat);
router.get("/doiphong",checklogin,PrivateController.doiphong);


// chưa làm front end 
router.post("/datphongthanhcong",PrivateController.datphongthanhcong);


//[HÓA ĐƠN]
      //[SỰ CỐ]
router.get("/hdsuco",checklogin,PrivateController.hdsuco);
router.get("/suco",checklogin,PrivateController.suco);


router.post("/suco",checklogin,PrivateController.sucopost)
      //[PHÒNG]
router.get("/hdungtruoc",checklogin,PrivateController.hdungtruoc);
router.get("/hdtraphong",checklogin,PrivateController.hdtraphong);

router.get("/traphong",checklogin,PrivateController.traphong);
      //[DỊCH VỤ]
router.get("/hddichvu/:cmnd",checklogin,PrivateController.hddichvu);

router.post("/khachhangdichvu",checklogin,PrivateController.createphieudichvu);
router.post("/hddichvu",checklogin,PrivateController.createhddichvu); 
        //[TỔNG]
router.get("/hdtong/:cmnd",checklogin,PrivateController.hdtong);

router.post("/khachhanghdtong",checklogin,PrivateController.hdtongpost);






// router.get("/hddichvu",checklogin,PrivateController.createhddichvu);





// hi hello







module.exports = router;
