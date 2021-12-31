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
const GetDetailController = require("../app/controller/GetDetailController");


router.get("/",checklogin, PrivateController.privated); 
router.get("/dsphongdadat",checklogin, PrivateController.dsphongdadat); 

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

router.get("/thucdonmonan",checklogin,PrivateController.thucdonmonan)
router.get("/monan/:id/edit",checklogin,PrivateController.editmonan)
router.put("/monan/:id",checklogin,PrivateController.editmonanput)
router.delete("/monan/:id",checklogin,PrivateController.deletemonan)


router.post("/themmonan",checklogin,PrivateController.themmonanpost);

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
router.get("/dsdatphong", checklogin, PrivateController.dsdatphong);

router.get("/giahan",checklogin,PrivateController.giahan);
router.get("/giahanphong",checklogin,PrivateController.giahanphong)
router.get("/giahanphong/:id/edit",checklogin,PrivateController.giahanphongedit)
router.put("/giahanphong/:id",checklogin,PrivateController.giahanphongput)

router.get("/capnhat",checklogin,PrivateController.capnhat);


router.get("/doiphong",checklogin,PrivateController.doiphong);
router.get("/doiphongsearch",checklogin,PrivateController.doiphongsearch);
router.get("/doiphongsearch",checklogin,PrivateController.doiphongsearch);
router.get("/doiphong/:id/edit",checklogin,PrivateController.doiphongedit);


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

router.get("/getAllFood",PrivateController.getAllFood);






// router.get("/hddichvu",checklogin,PrivateController.createhddichvu);





// hi hello







module.exports = router;
