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
class PrivateController {
  //[GET] private/
  privated(req, res, next) {
    Room.find({ status: true })
      .lean()
      .then((data) => {
        res.render("home", {
          data: data,
        });
      });
  }

  //[DICHVU]

  //[GET] private/dichvu
  dichvu(req, res, next) {
    res.render("dichvu/phieudichvu");
  }

  //[POST] private/dichvu
  createdichvu(req, res, next) {
    const dichvu = new Service(req.body);
    dichvu
      .save()
      .then(() => {
        res.send("thành công");
      })
      .catch(next);
  }

  //[GET] private/sudungdichvu
  sudungdichvu(req, res, next) {

    Service.find({})
      .lean()
      .then((service) =>
        res.render("dichvu/sudungdv", {
          service: service,
        })
      )
  }

  // query khách hàng
  //[GET] private/khachhangdichvu
  searchkhachhang(req, res, next) {
    const namee = req.query.cmnd;
    if(req.body == null || namee === '')
    {
      res.send("không có dữ liệu")
    }
    console.log(namee);
    Promise.all([
      Customer.findOne({ cmnd: namee }).lean(),
      Service.find({}).lean(),
    ]).then(([data, service]) =>
      res.render("dichvu/dichvu", {
        data: data,
        service: service,
      })
    );
  }

  //[POST] private/khachhangdichvu
  createphieudichvu(req, res, next) {
    // const ticketService = new TicketService(req.body);
    // const money = req.body.amount * req.body.price;
    // req.body.push(`"Intomoney: ${money}"`)
    console.log(req.body);
    const data = {
      name: req.body["name"],
      cmnd: req.body["cmnd"],
      phone: req.body["phone"],
      address: req.body["address"],
      nameService: req.body["nameService"],
      price: req.body["price"],
      amount: req.body["amount"],
      IntoMoney: req.body["price"] * req.body["amount"],
    };
    const ticketService = new TicketService(data);
    console.log(data);
    ticketService
      .save()
      .then(() => {
        res.redirect(`/private/hddichvu/${req.body["cmnd"]}`);
      })
      .catch((error) => {});
  }

  //[QUẢN LÝ]
  //[GET] private/phanquyen
  phanquyen(req, res, next) {
    res.render("management/phieuphanquyen");
  }

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
    // var ticketBooked = new TicketBooked(req.body)
    // ticketBooked.save()
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
    TicketBooked.find({ cmnd: cmnd })
      .lean()
      .then((data) => {
        res.render("phong/phieudoiphong", {
          data: data,
        });
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

  //////Đặt tiệc ///////
  //[GET] private/dattiec query khachhang
  dattiec(req, res, next) {
    Food.find({})
      .lean()
      .then((data) => {
        res.render("nhahang/dattiecsearch", {
          data: data,
        });
      });
  }
//[GET] private/dattiectsearch
  dattiecsearch(req,res,next)
  {
    const namee = req.query.cmnd;
    if(req.body == null || namee === '')
    {
      res.send("không có dữ liệu")
    }
    console.log(namee);
    Promise.all([
      Customer.findOne({ cmnd: namee }).lean(),
      Food.find({}).lean(),
    ]).then(([data, food]) =>
      res.render("nhahang/phieudattiec", {
        data: data,
        food:food,
      })
    );
  }

//[POST] private/dattiecsearch
  dattiecpost(req,res,next)
  {
    console.log(req.body)
    // var data = 
    //   {
    //     "name": "ngocphu",
    //     "cmnd" :"0909",
    //     "phone":"0",
    //     "Food" :[
    //         {
    //             "nameFood" : "Lẩu cá đuối", 
    //             "price" : 200 ,
    //             "amount" : 2 , 
                
    //       },
    //       {
    //         "nameFood" : "Cơm chiên dương châu ", 
    //         "price" : 100 ,
    //         "count" : 1 , 
            
    //   }
    //     ],
    //     "totalMoney" :  700
   
    //   }
    const voucherfood = new VoucherFood(req.body)
    voucherfood.save()
    .then(()=>
    {
      res.redirect(`/private/hddattiec/${data.cmnd}`);
    })
    .catch(next)
    
  }


  //[GET] private/dsmonan
  themmonan(req, res, next) {
    res.render("nhahang/monan");
  }

  //[GET] private/thucdonmonan
  thucdonmonan(req, res, next) {
    Food.find({})
      .lean()
      .then((data) => {
        res.render("nhahang/thucdonmonan", {
          data: data,
        });
      })
      .catch(next);
  }

  //[GET] private/monan/:id/edit
  editmonan(req, res, next) {
    Food.findById(req.params.id)
      .lean()
      .then((data) => {
        res.render("nhahang/editmonan", {
          data: data,
        });
      })
      .catch(next);
  }

  //[PUT] private/monan/:id
  editmonanput(req, res, next) {
    Food.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/private/thucdonmonan"))
      .catch(next);
  }
  //[POST] private/themmonan
  themmonanpost(req, res, next) {
    const name = req.body.name;
    const price = req.body.price;
    if (name == "" || price == "") {
      res.send("404 error");
    }
    const food = new Food(req.body);
    food
      .save()
      .then(() => {
        res.redirect("./thucdonmonan");
      })
      .catch(next);
  }
  //[DELETE] /private/:id
  deletemonan(req, res, next) {
    // thực hiện xóa thật bằng lệnh delete One
    Food.deleteOne({ _id: req.params.id })
      // khi mà xóa xong nó sẽ quay lại trang  mà đã xóa
      .then(() => res.redirect("back"))
      .catch(next);
  }


  //[GET] /private/getTicketFood 
  async getTicketFood(req,res,next)
  {
    const cmnd = req.params["cmnd"];
    const data = await VoucherFood.find({ cmnd: cmnd });
    return res.send(data);
  }

  async  getDataFood(req,res,next)
  {
    const cmnd = req.params["cmnd"];
    const data = await VoucherFood.find({ cmnd: cmnd });
    return res.send(data);
  }
  /////////Khách hàng ///////////
  //[GET] private/khachhang
  khachhang(req, res, next) {
    res.render("khachhang/hosoKH");
  }

  //[GET] private/dskhachhang
  dskhachhang(req, res, next) {
    Customer.find({})
      .lean()
      // course paramater là doucument trong db
      .then((data) => {
        res.render("khachhang/dskhachhang", { data: data });
      })
      .catch(next);
  }

  //[POST] private/receivecustomer
  receivekhachhang(req, res, next) {
    if (req.body == "") {
      res.render("<h1>404 ERROR </h1>");
    }
    const customer = new Customer(req.body);
    console.log(customer);
    customer
      .save()
      .then(() => {
        res.redirect("./dskhachhang");
      })
      .catch((error) => {});
  }

  //[GET] private/dskhachhang/trash
  trashkhachhang(req, res, next) {
    // lấy ra find những thằng đã xóa
    Customer.findDeleted({})
      .lean()
      .then((data) =>
        res.render("khachhang/trashdskh", {
          data: data,
        })
      )
      .catch(next);
  }

  //[GET] khachhang/{{this._id}}/edit
  editkhachhang(req, res, next) {
    Customer.findById(req.params.id)
      .lean()
      .then((data) => {
        res.render("khachhang/editkhachhang", {
          data: data,
        });
      })
      .catch(next);
  }

  //[PUT] khachhang/:id
  puteditkhachhang(req, res, next) {
    Customer.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/private/dskhachhang"))
      .catch(next);
  }

  //[DELETE] khachhang/:id
  deletesoftkhachhang(req, res, next) {
    // thực hiện xóa mềm lệnh delete
    Customer.delete({ _id: req.params.id })
      // khi mà xóa xong nó sẽ quay lại trang  mà đã xóa
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[PATCH] /khachhang/:id/restore
  restorekhachhang(req, res, next) {
    // thực hiện xóa mềm lệnh delete
    Customer.restore({ _id: req.params.id })
      // khi mà xóa xong nó sẽ quay lại trang  mà đã xóa
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[]
  deleteforcekhachhang(req, res, next) {
    // thực hiện xóa thật bằng lệnh delete One
    Customer.deleteOne({ _id: req.params.id })
      // khi mà xóa xong nó sẽ quay lại trang  mà đã xóa
      .then(() => res.redirect("back"))
      .catch(next);
  }
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

  // [GET] private/getTicket/:cmnd
  async getTicket(req, res) {
    const cmnd = req.params["cmnd"];
    const data = await TicketService.find({ cmnd: cmnd });
    return res.send(data);
  }
  async getData(req, res) {
    const cmnd = req.params["cmnd"];
    const data = await TicketService.find({ cmnd: cmnd });
    return res.send(data);
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
    res.render("hoadon/hdtraphong");
  }

  hdtong(req, res, next) {
    res.render("hoadon/hdtong");
  }

  hdtongpost(req, res, next) {
    res.render("hoadon/");
  }

  showservice(req, res, next) {}

  async getAllFood(req, res) {
    const foods = await Food.find({});
    // add new count
    const foodsCustomer = [];
    foods.forEach((el, index) => {
      const data = {
        _id: el["_id"],
        name: el["name"],
        price: el["price"],
        count: 0,
      };
      foodsCustomer.push(data);
    });
    res.json(foodsCustomer);
  }
  //get getIdRoom
  async getIdRoom(req,res){
    const id = req.body['id']
    await Room.find({'_id':id})
    .then((data)=>{res.json(data)})
    .catch((data)=>{res.send('error')})
  }
}

module.exports = new PrivateController();
