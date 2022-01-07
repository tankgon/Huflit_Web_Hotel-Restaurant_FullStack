const account = require("../models/Account");
const jwt = require("jsonwebtoken");
const BillService = require("../models/BillService");
const Room = require("../models/Room");
const TicketBooked = require("../models/TicketBooked");
const VoucherFood = require("../models/VoucherFood");
const BillFood = require("../models/BillFood");
const BillRoom = require("../models/BillRoom");
const BillAccident = require("../models/BillAccident");
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
        if(data==" ")
        {
          res.send("không có dữ liệu")
        }
        else
        {
          res.render("hoadon/hdsucosearch", {
            data: data,
          });
        }
      
      })
      .catch(next);
  }
  
  //[POST] private/sucopost : hoàn thành billaccident
  sucopost(req, res, next) {
    const billaccident = new BillAccident(req.body)
    console.log(billaccident);
    billaccident.save()
    return res.send("success");
  }

  

  //[GET] private/getRoom/:nameRoom
  async getRoom(req,res,next)
  {
    console.log(req.params.nameRoom);
    const nameRoom = req.params.nameRoom;
    const data = await Room.findOne({name:nameRoom})
    const device = data.device
    const deviceCustomer=[]
    device.forEach((el,index)=>
    {
      const data = {
         _id: el["_id"],
         namedevice : el["namedevice"],
          pricedevice : el["pricedevice"],
          qty : el["qty"],
          count : 0 , 
      };
      deviceCustomer.push(data);
    })
    return res.json(deviceCustomer)
  }

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

  async hdtongsearch(req, res, next) {
    // CODE KIỂU NÀY AI  CHƠI LẠI NỮA HIHI 
    const cmnd = req.query.cmnd;

    if(cmnd == '')
    {
      res.send("Không có dữ liệu")
    }
    else
    {
     const service =  await BillService.find({cmnd:cmnd}).lean()
     const food = await  BillFood.find({ cmnd: cmnd }).lean()
     const room = await BillRoom.find({ cmnd: cmnd }).lean()
     let moneyService = 0 
     let moneyFood = 0;
     let moneyRoom =0 ; 
    
    await service.forEach((el)=>
     {
        const totalMoney = el.totalMoney; 
        moneyService += totalMoney
     
     })
     await food.forEach((el)=>
     {
       const totalMoney = el.totalMoney;
        moneyFood += totalMoney
     })
     await room.forEach((el)=>
     {
       const totalMoney = el.total;
        moneyRoom += totalMoney
     })
        
     let total = moneyService + moneyFood + moneyRoom
     Promise.all([
      BillService.find({cmnd:cmnd}).lean(),
      BillFood.find({ cmnd: cmnd }).lean(),
      BillRoom.find({ cmnd: cmnd }).lean()
    ]).then(([service,food,room]) =>
      res.render( "hoadon/hdtong" ,{
        service : service ,
        room: room,
        food : food ,
        total : total 
      })
    );
    }
  }

 



  async hdtongthanhcong(req,res,next)
  {
    console.log("đã vào")
    console.log(req.body)
  }

  hdtongpost(req, res, next) {
    res.render("hoadon/");
  }
}
module.exports = new BillController();
