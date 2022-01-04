const account = require("../models/Account");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Service = require("../models/Service");
const TicketService = require("../models/VoucherService");
const BillService = require("../models/BillService");
const Room = require("../models/Room");
const Food = require("../models/Food");
const TicketBooked = require("../models/TicketBooked");
const VoucherFood = require("../models/VoucherFood");
const BillFood = require("../models/BillFood")

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
  hddichvusearch(req,res,next)
  {
    res.render("hoadon/hddichvusearch")
  }




  //[GET] /private/dattiec/:cmnd 
  hddattiec(req,res,next)
  {
    const cmnd  = req.params.cmnd
    console.log(cmnd)
    VoucherFood.find({cmnd:cmnd}).lean()
    .then((data)=>
    {
      res.render("hoadon/hddattiec",{
        data:data
      })
    })
  }  


  hddattiecpost(req,res,next)
  {
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
  hdtraphongsearch(req,res,next)
  {
    const cmnd = req.query.cmnd
    TicketBooked.find({cmnd:cmnd})
    .then((data)=>
    {
        res.render("hoadon/hdtraphong",{
          data:data
        })
    })
    .catch(next)
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

  hdtong(req, res, next) {
    res.render("hoadon/hdtong");
  }

  hdtongpost(req, res, next) {
    res.render("hoadon/");
  }

}
module.exports = new BillController();