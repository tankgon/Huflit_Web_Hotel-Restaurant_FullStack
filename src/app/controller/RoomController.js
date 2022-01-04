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

class RoomController {
    //[PHÒNG]/////////////
  //[GET] private/khachhangdatphong
  // search khách hàng
  khachhangdatphong(req, res, next) {
    const namee = req.query.cmnd;
    if(namee == '')
    {
      res.send("Không có dữ liệu")
    }
    console.log(namee);
    Promise.all([
      Customer.findOne({ cmnd: namee }).lean(),
      Room.find({ status: true }).lean(),
    ]).then(([data, room]) =>
      res.render("phong/datphongsearch", {
        data: data,
        room: room,
      })
    );
  }

  //[GET] private/datphong
  datphongget(req, res, next) {
    Room.find({ status: true })
      .lean()

      .then((data) => {
        res.render("phong/datphong", {
          data: data,
        });
      });
  }

  //[PUT] private/datphongthanhcong
  async datphongthanhcong(req, res, next) {
    console.log(req.body);
    //data customer

    var ticketBooked = new TicketBooked(req.body)
    ticketBooked.save()
    var idRoom = req.body.Room.idRoom;
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
    return res.redirect("back");
  }

  //[GET] private/dsdatphong
  dsdatphong(req, res, next) {
    // TicketBooked.find({},function(err,ticket)
    // {
    //    ticket.forEach((el)=>
    //    {
    //      console.log(el.Room.idRoom)
    //      var idRoom = el.Room.idRoom
    //       Room.findById({idRoom},function(err,dataRoom),)

    //    })
    // }).lean()

    TicketBooked.find({})
      .lean()
      .then((data) => {
        res.render("phong/dsdatphong", {
          data: data,
        });
      });
  }
  //[GET] private/nhanphong
  nhanphong(req, res, next) {
    res.render("phong/nhanphong");
  }

 
  //[GET] private/giahan
  giahan(req, res, next) {
    res.render("phong/phieugiahan");
  }

  //[GET] private/giahansearch
  giahanphong(req, res, next) {
    const cmnd = req.query.cmnd;
    TicketBooked.find({ cmnd: cmnd })
      .lean()
      .then((data) => {
        if (data == "") {
          res.send("không có dữ liệu ");
        } else {
          res.render("phong/phieugiahansearch", {
            data: data,
          });
        }
      });
  }
  //[GET] private/:id/edit
  giahanphongedit(req, res, next) {
    TicketBooked.findById(req.params.id)
      .lean()
      .then((data) => {
        res.render("phong/giahanphongedit", {
          data: data,
        });
      })
      .catch(next);
  }

  //[PUT] private/giahanphong/:id
  giahanphongput(req, res, next) {
    TicketBooked.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/private/giahan"))
      .catch(next);
  }

  //[GET] private/doiphong
  doiphong(req, res, next) {
    res.render("phong/doiphongsearch");
  }

  //[GET] private/doiphongsearch
  async doiphongsearch(req, res, next) {
    const cmnd = req.query.cmnd;
    if (cmnd == "") {
      res.send("không có dữ liệu");
    }
    TicketBooked.find({
      cmnd: cmnd,
      
    })
      .lean()
      .then((data) => {
        res.render("phong/phieudoiphong", {
          data: data,
        });
        // res.json(data)
      });
  }
  //getAllTicket
  async getAllTicket(req,res){
    const cmnd = req.body['cmnd']
    TicketBooked.find({cmnd:cmnd})
    .then((data)=>{res.json(data)})
    .catch((data)=>res.send('error'))
  }

  //[GET] doiphong/:id/edit
  doiphongedit(req, res, next) {
    Promise.all([
      TicketBooked.findById(req.params.id).lean(),
      Room.find({ status: true }).lean(),
    ]).then(([data, room]) =>
      res.render("phong/doiphongedit", {
        data: data,
        room: room,
      })
    );
  }

  //[PUT] doiphong/:id
  async doiphongput(req, res, next) {
    const id = req.params.id;
    const ticketbooked = await TicketBooked.findById(id);
    const ticketbookedroom = ticketbooked.Room.idRoom;
    // chuyển trạng thái phòng đã sử dũng thành true 
    Room.findById(ticketbookedroom, function (err, room) {
      room.status = !room.status;
      room.save(
        function (err, updatedroom) {
          if (err) {
            console.log(err);
          } else {
            console.log("thành công");
          }
        },
        // update dữ liệu phòng mới 
        TicketBooked.updateOne(
          { _id: req.params.id },
          req.body,
          function (err, data) {
            // tìm dữ liệu phòng mới trả về false 
            Room.findById(roomstatuschange, function (err, room) {
              room.status = !room.status;
              room.save(function (err, updatedroom) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("thành công");
                }
              });
            });
          }
        )
      );
    });
    const roomstatuschange = req.body.Room.idRoom;

    //   .then(()=>res.redirect("/private/doiphong"))
    //   .catch(next)
    // console.log(req.params.id)
    //   TicketBooked.findById(req.params.id,(err,data)=>
    //   {
    //     console.log(data)
    //   })
  }

  //[GET] private/private
  dsphongdadat(req, res, next) {
    Room.find({ status: false })
      .lean()
      .then((data) => {
        res.render("phong/dspchuadat", {
          data: data,
        });
      });
  }


   
  //get getIdRoom
  async getIdRoom(req,res){
    const id = req.body['id']
    await Room.find({'_id':id})
    .then((data)=>{res.json(data)})
    .catch((data)=>{res.send('error')})
  }
}
module.exports = new RoomController();