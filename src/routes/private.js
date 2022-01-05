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
const BillController = require("../app/controller/BillController");
const ServiceController = require("../app/controller/ServiceController");
const CustomerController = require("../app/controller/CustomerController");
const RoomController = require("../app/controller/RoomController");
const RestaurantController = require("../app/controller/RestaurantController");


router.post("/",checklogin, PrivateController.privated); 
router.get("/",checklogin, PrivateController.privated); 
router.get("/dsphongdadat",checklogin, RoomController.dsphongdadat); 

//[DICHVU]
router.get("/dichvu", checklogin, ServiceController.dichvu);
router.get("/sudungdichvu", checklogin, ServiceController.sudungdichvu);

router.get("/khachhangdichvu",checklogin,ServiceController.searchkhachhang);
router.post("/khachhangdichvu",checklogin,ServiceController.createphieudichvu);

router.get("/getTicket/:cmnd",checklogin,ServiceController.getTicket);
router.get("/get/:cmnd",checklogin,ServiceController.getData);
router.post("/dichvu",checklogin,ServiceController.createdichvu);
router.get("/dsdichvu",checklogin,ServiceController.dsdichvu);

//[QUẢN LÝ ]
// router.get("/phanquyen", checklogin, PrivateController.phanquyen);


//[ĐẶT TIỆC]
router.get("/dattiec",checklogin,RestaurantController.dattiec);
router.get("/dattiecsearch",checklogin,RestaurantController.dattiecsearch);

router.get("/themmonan",checklogin,RestaurantController.themmonan);
router.get("/thucdonmonan",checklogin,RestaurantController.thucdonmonan)
router.get("/monan/:id/edit",checklogin,RestaurantController.editmonan)

router.get("/getTicketFood/:cmnd",RestaurantController.getTicketFood);

router.get("/getFood/:cmnd",checklogin,RestaurantController.getDataFood);

router.post("/dattiecsearch",RestaurantController.dattiecpost)
router.post("/themmonan",checklogin,RestaurantController.themmonanpost);
router.put("/monan/:id",checklogin,RestaurantController.editmonanput)
router.delete("/monan/:id",checklogin,RestaurantController.deletemonan)
router.get("/getAllFood",RestaurantController.getAllFood);

//[KHACHHANG]
router.delete("/khachhang/:id/force",checklogin,CustomerController.deleteforcekhachhang);
router.patch("/khachhang/:id/restore",checklogin,CustomerController.restorekhachhang);
router.delete("/khachhang/:id",checklogin,CustomerController.deletesoftkhachhang);
router.put("/khachhang/:id",checklogin,CustomerController.puteditkhachhang);
router.get("/khachhang",checklogin,CustomerController.khachhang);
router.get("/dskhachhang",checklogin,CustomerController.dskhachhang);
router.get("/khachhang/:id/edit",checklogin,CustomerController.editkhachhang);
router.get("/dskhachhang/trash",checklogin,CustomerController.trashkhachhang);


router.post("/khachhang",checklogin,CustomerController.receivekhachhang);

//[PHÒNG]
router.get("/khachhangdatphong", checklogin, RoomController.khachhangdatphong);
router.get("/datphong", checklogin, RoomController.datphongget);
router.get("/dsdatphong", checklogin, RoomController.dsdatphong);
//get idRoom
router.post("/getIdRoom",checklogin,RoomController.getIdRoom)



//getAllTicket
router.post("/getAllTicket",checklogin,RoomController.getAllTicket)
router.get("/giahan",checklogin,RoomController.giahan);
router.get("/giahanphong",checklogin,RoomController.giahanphong)
router.get("/giahanphong/:id/edit",checklogin,RoomController.giahanphongedit)
router.put("/giahanphong/:id",checklogin,RoomController.giahanphongput)




router.get("/doiphong",checklogin,RoomController.doiphong);
router.get("/doiphongsearch",RoomController.doiphongsearch);
router.get("/doiphong/:id/edit",checklogin,RoomController.doiphongedit);
router.post("/doiphong/:id",RoomController.doiphongput);


router.post("/datphongthanhcong",RoomController.datphongthanhcong);


//[HÓA ĐƠN]

      //[DATTIEC]
   
router.get("/hddattiec/:cmnd",checklogin,BillController.hddattiec);
router.post("/hddattiec",checklogin,BillController.hddattiecpost);



      //[SỰ CỐ]
router.get("/hdsuco",checklogin,BillController.hdsuco);
router.get("/suco",checklogin,BillController.suco);


router.post("/suco",checklogin,BillController.sucopost)
      //[PHÒNG]
router.get("/hdungtruoc",checklogin,BillController.hdungtruoc);
router.get("/hdtraphong",checklogin,BillController.hdtraphong);
router.get("/hdtraphongsearch",checklogin,BillController.hdtraphongsearch)
router.get("/traphong",checklogin,BillController.traphong);
      //[DỊCH VỤ]
router.get("/hddichvu/:cmnd",checklogin,BillController.hddichvu);
router.get("/hddichvu",checklogin,BillController.hddichvusearch);

router.post("/hddichvu",checklogin,BillController.createhddichvu); 
        //[TỔNG]
router.get("/hdtong",checklogin,BillController.hdtong);
router.get("/hdtongsearch",checklogin,BillController.hdtongsearch);

router.post("/khachhanghdtong",checklogin,BillController.hdtongpost);
//








// router.get("/hddichvu",checklogin,PrivateController.createhddichvu);





// hi hello







module.exports = router;
