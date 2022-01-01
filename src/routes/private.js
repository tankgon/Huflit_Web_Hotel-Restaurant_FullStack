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


router.post("/",checklogin, PrivateController.privated); 
router.get("/",checklogin, PrivateController.privated); 
router.get("/dsphongdadat",checklogin, PrivateController.dsphongdadat); 

//[DICHVU]
router.get("/dichvu", checklogin, PrivateController.dichvu);
router.get("/sudungdichvu", checklogin, PrivateController.sudungdichvu);

router.get("/khachhangdichvu",checklogin,PrivateController.searchkhachhang);
router.post("/khachhangdichvu",checklogin,PrivateController.createphieudichvu);

router.get("/getTicket/:cmnd",checklogin,PrivateController.getTicket);
router.get("/get/:cmnd",checklogin,PrivateController.getData);


router.post("/dichvu",checklogin,PrivateController.createdichvu);

//[QUẢN LÝ ]
router.get("/phanquyen", checklogin, PrivateController.phanquyen);


//[ĐẶT TIỆC]
router.get("/dattiec",checklogin,PrivateController.dattiec);
router.get("/dattiecsearch",checklogin,PrivateController.dattiecsearch);
router.post("/dattiecsearch",PrivateController.dattiecpost)


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




router.get("/doiphong",checklogin,PrivateController.doiphong);
router.get("/doiphongsearch",checklogin,PrivateController.doiphongsearch);
router.get("/doiphongsearch",checklogin,PrivateController.doiphongsearch);
router.get("/doiphong/:id/edit",checklogin,PrivateController.doiphongedit);
router.post("/doiphong/:id",PrivateController.doiphongput);


router.post("/datphongthanhcong",PrivateController.datphongthanhcong);


//[HÓA ĐƠN]

      //[DATTIEC]
   
router.get("/hddattiec/:cmnd",checklogin,PrivateController.hddattiec);
router.post("/hddattiec",checklogin,PrivateController.hddattiecpost);

router.get("/getTicketFood/:cmnd",PrivateController.getTicketFood);
router.get("/getFood/:cmnd",checklogin,PrivateController.getDataFood);
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
router.get("/hddichvu",checklogin,PrivateController.hddichvusearch);

router.post("/hddichvu",checklogin,PrivateController.createhddichvu); 
        //[TỔNG]
router.get("/hdtong/:cmnd",checklogin,PrivateController.hdtong);

router.post("/khachhanghdtong",checklogin,PrivateController.hdtongpost);

router.get("/getAllFood",PrivateController.getAllFood);






// router.get("/hddichvu",checklogin,PrivateController.createhddichvu);





// hi hello







module.exports = router;
