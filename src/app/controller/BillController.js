const account = require("../models/Account");
const jwt = require("jsonwebtoken");
const BillService = require("../models/BillService");
const Room = require("../models/Room");
const TicketBooked = require("../models/TicketBooked");
const VoucherFood = require("../models/VoucherFood");
const BillFood = require("../models/BillFood");
const BillRoom = require("../models/BillRoom");

class BillController {
  //// hóa đơn/////////////
  //[GET] private/hdsuco
  hdsuco(req, res, next) {
    res.render("hoadon/hdsuco");
  }

  //[GET] private/hdungtruoc
  hdungtruoc(req, res, next) {
    res.render("hoadon/hdungtruoc");
  }

  //[GET] private/hddichvu
  async hddichvu(req, res, next) {
    // cmnd
    res.render("hoadon/hddichvu");
  }

  suco(req, res, next) {
    const name = req.query.name;

    Room.findOne({ name: name, status: false })
      .lean()
      .then((data) => {
        res.render("hoadon/hdsucosearch", {
          data: data,
        });
      })
      .catch(next);
  }

  sucopost(req, res, next) {}

  //[POST] private/hddichvu/:cmnd
  createhddichvu(req, res, next) {
    const bill = new BillService(req.body);
    bill.save();
    return res.send("success");
  }

  //[GET] private/hddichvu
  hddichvusearch(req, res, next) {
    res.render("hoadon/hddichvusearch");
  }

  //[GET] /private/dattiec/:cmnd
  hddattiec(req, res, next) {
    const cmnd = req.params.cmnd;
    console.log(cmnd);
    VoucherFood.find({ cmnd: cmnd })
      .lean()
      .then((data) => {
        res.render("hoadon/hddattiec", {
          data: data,
        });
      });
  }

  hddattiecsearch(req, res, next) {
    res.render("hoadon/hddattiecsearch");
  }

  hddattiecpost(req, res, next) {
    const bill = new BillFood(req.body);
    bill.save();
    return res.send("success");
  }
  //AJAX GET DATA POST FORM => INSERT DB
  //RES.SEND('') , SUCCESS OR ERROR

  //[GET] private/hdtraphong
  hdtraphong(req, res, next) {
    res.render("hoadon/hdtraphongsearch");
  }

  //[GET] private/hdtraphongsearch
  hdtraphongsearch(req, res, next) {
    const cmnd = req.query.cmnd;
    TicketBooked.find({ cmnd: cmnd })
      .then((data) => {
        if (data == "") {
          res.send("không có dữ liệu ");
        } else {
          res.render("hoadon/hdtraphong", {
            data: data,
          });
        }
      })
      .catch(next);
  }

  //[GET] private/traphong
  traphong(req, res, next) {
    console.log(req.query.nameRoom);
    const nameRoom = req.query.nameRoom;

    TicketBooked.findOne({ nameRoom: nameRoom })
      .lean()
      .then((data) => {
        res.render("hoadon/hdtraphongsearch", { data: data });
      })
      .catch(next);
  }

  //[POST] private/traphong
  async traphongpost(req, res, next) {
    const billroom = new BillRoom(req.body);
    billroom.save();
    const bill = req.body;
    //  cho nó thành 1 mảng array để dùng funcion forEach duyệt nó kiếm cái id
    const billarray = [bill];
    // duyệt mảng kiểm idRoomm để thay đổi status phòng
    billarray.forEach((el) => {
      const billroomarray = el.bill;
      billroomarray.forEach((el) => {
        const idRoom = el.idRoomm;
        console.log(idRoom);
        Room.findById(idRoom, function (err, room) {
          room.status = !room.status;
          room.save(function (err, updatedroom) {
            if (err) {
              console.log(err);
            } else {
              console.log("thành công");
            }
          });
        });
      });
      // Ngọc phú code quá vip
    });
  }
  hdtong(req, res, next) {
    res.render("hoadon/hdtongsearch");
  }

  hdtongsearch(req, res, next) {
    console.log(req.query.cmnd);
  }

  hdtongpost(req, res, next) {
    res.render("hoadon/");
  }
}
module.exports = new BillController();
