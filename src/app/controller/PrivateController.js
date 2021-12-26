const account = require("../models/Account");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Service = require("../models/Service")
const TicketService = require("../models/VoucherService");
const BillService = require("../models/BillService");
const Room = require("../models/Room");
const TicketBooked = require("../models/TicketBooked");
class PrivateController {

 

  //[GET] private/
  privated(req, res, next) {
    res.render("home");
  }

  //[DICHVU]

  //[GET] private/dichvu
  dichvu(req, res, next) {
    res.render("dichvu/phieudichvu");
  }

  //[POST] private/dichvu
  createdichvu(req,res,next)
  {
    const dichvu = new Service(req.body)
    dichvu.save()
    .then(()=>
    {
      res.send("thành công");
    })
    .catch(next);
  }


  //[GET] private/sudungdichvu
  sudungdichvu(req, res, next) {
    Service.find({}).lean()
    .then( (service) => res.render("dichvu/sudungdv",{
      service:service
    }))
   
  }


 // query khách hàng 
  //[GET] private/khachhangdichvu
  searchkhachhang(req,res,next)
  {
    const namee = req.query.cmnd
    console.log(namee)
    Promise.all([Customer.findOne({cmnd:namee}).lean(),    Service.find({}).lean()])
      .then(([data,service]) =>
        res.render("dichvu/dichvu",{
          data : data , 
          service : service 
        })
      )
      
  }

  //[POST] private/khachhangdichvu 
  createphieudichvu(req,res,next)
  {
    // const ticketService = new TicketService(req.body);
    // const money = req.body.amount * req.body.price;
    // req.body.push(`"Intomoney: ${money}"`)
    console.log(req.body);
    const data = {
      'name' : req.body['name'],
      'cmnd' : req.body['cmnd'],
      'phone' : req.body['phone'],
      'address' : req.body['address'] ,
      'nameService' :req.body['nameService'], 
      'price' : req.body['price'], 
      'amount' : req.body['amount'], 
      'IntoMoney' : req.body['price'] * req.body['amount'] , 
    }
    const ticketService = new TicketService(data);
    console.log(data)
    ticketService.save()
    .then(()=>{res.redirect(`/private/hddichvu/${req.body['cmnd']}`)})
    .catch((error)=>{});

  }


  

  //[QUẢN LÝ]
  //[GET] private/phanquyen
  phanquyen(req, res, next) {
    res.render("management/phieuphanquyen");
  }

//[PHÒNG]/////////////
//[GET] private/khachhangdatphong
// search khách hàng 
  khachhangdatphong(req,res,next)
  {
    const namee = req.query.cmnd
    console.log(namee)
    Promise.all([Customer.findOne({cmnd:namee}).lean(), Room.find({status : true}).lean()])
      .then(([data,room]) =>
        res.render("phong/datphongsearch",{
          data : data , 
          room : room 
        })
      )
  }

  //[GET] private/datphong
  datphongget(req,res,next)
  {
    Room.find({status : true}).lean()
    .then((data)=>
    {
      res.render("phong/datphong",{
        data:data
      })
    })
  }


  //[PUT] private/datphongthanhcong
 async datphongthanhcong(req,res,next)
  {
    var data = {
        "name" : "ngocphu", 
        "cmnd" : 9999, 
        "qtyCustomer" : 2,
        "dateArrive": "2021-12-23T19:13:48.549+00:00",
        "dateGo" : "2021-12-23T19:13:48.549+00:00",
        "Room": [
        {"idRoom": "61c610380480f5fe5dd798c0"},
        {"idRoom": "61c6106004e215697521e241"}
        ]
    }
    var name = req.body.Room
 await name.forEach( (el)=>
    {
      console.log(req.body);
        const ticketbooked = new TicketBooked(req.body); 
        ticketbooked.save()
       Room.findById(el.idRoom,function(err,room){
        room.status = !room.status ; 
        room.save(function (err, updatedroom) {
          if (err) {
            console.log(err);
          } else {
              console.log("thành công")
          }
        })
      })
     });
     return res.redirect("/")
    } 
  //[GET] private/nhanphong
  nhanphong(req, res, next) {
    res.render("phong/nhanphong");
  }

  //[GET] private/traphong
  traphong(req, res, next) {
    res.render("phong/traphong");
  }

   //[GET] private/giahan
   giahan(req, res, next) {
    res.render("phong/phieugiahan");
  }



  //[GET] private/doiphong
  doiphong(req, res, next) {
    res.render("phong/phieudoiphong");
  }

  //[GET] private/capnhat
  capnhat(req, res, next) {
    res.render("phong/capnhatphong");
  }


  //////Đặt tiệc ///////
  //[GET] private/dattiec
  dattiec(req, res, next) {
    res.render("nhahang/phieudattiec");
  }


  //[GET] private/themmonan
  themmonan(req, res, next) {
    res.render("nhahang/themmonan");
  }



/////////Khách hàng ///////////
  //[GET] private/khachhang
  khachhang(req, res, next) {
    res.render("khachhang/hosoKH");
  }

  //[GET] private/dskhachhang 
  dskhachhang(req, res, next) {
    Customer.find({}).lean()
    // course paramater là doucument trong db
    .then((data) => {
      res.render("khachhang/dskhachhang", { data:data });
    })
    .catch(next);
  }
   
    //[POST] private/receivecustomer
  receivekhachhang(req, res, next) {
   const customer = new Customer(req.body);
    console.log(customer);
   customer.save()
    .then(()=>{res.redirect("./dskhachhang")})
    .catch((error)=>{});
  }




  //[GET] private/dskhachhang/trash
  trashkhachhang(req,res,next)
 {
       // lấy ra find những thằng đã xóa
       Customer.findDeleted({}).lean()
       .then((data) =>
         res.render("khachhang/trashdskh", {
          data:data
         })
 
       )
       .catch(next);
      
  }

  //[GET] khachhang/{{this._id}}/edit
 editkhachhang(req,res,next)
 {
   Customer.findById(req.params.id).lean()
   .then((data)=>
   {
     res.render("khachhang/editkhachhang",
     {
       data : data 
     })
   })
   .catch(next)
 }

//[PUT] khachhang/:id
  puteditkhachhang(req,res,next)
  {
    Customer.updateOne({_id:req.params.id},req.body)
      .then(()=>res.redirect("/private/dskhachhang"))
      .catch(next)
  }

  //[DELETE] khachhang/:id
  deletesoftkhachhang(req,res,next)
  {
       // thực hiện xóa mềm lệnh delete
       Customer.delete({ _id: req.params.id })
       // khi mà xóa xong nó sẽ quay lại trang  mà đã xóa
       .then(() => res.redirect("back"))
       .catch(next);
  }
  //[PATCH] /khachhang/:id/restore
  restorekhachhang(req,res,next)
  {
     // thực hiện xóa mềm lệnh delete
     Customer.restore({ _id: req.params.id })
     // khi mà xóa xong nó sẽ quay lại trang  mà đã xóa
     .then(() => res.redirect('back'))
     .catch(next);
  }

  //[]
  deleteforcekhachhang(req,res,next)
  {
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
  //[POST] private/hddichvu
   createhddichvu(req,res,next)
  {
    const bill  =  new BillService(req.body);
    bill.save()
    return res.send('success')
    
  }


  // [GET] private/getTicket/:cmnd
  async getTicket(req,res){
    const cmnd = req.params['cmnd']
    const data = await TicketService.find( {cmnd: cmnd })
    return res.send(data)

  }
  async getData(req,res){
    const cmnd = req.params['cmnd']
    const data = await TicketService.find( {cmnd: cmnd })
    return res.send(data)

  }
  //AJAX GET DATA POST FORM => INSERT DB
    //RES.SEND('') , SUCCESS OR ERROR


  //[GET] private/hdtraphong
  hdtraphong(req, res, next) {
    res.render("hoadon/hdtraphong");
  }
  

  hdtong(req,res,next)
  {
     res.render("hoadon/hdtong");
  }

  hdtongpost(req,res,next)
  {
      res.render("hoadon/")
  }


   suco(req,res,next)
  {
    const name = req.query.name ; 
    
   Room.findOne({name : name,status : true }).lean()
   .then((data)=>
   {
     res.render("hoadon/hdsucosearch",
     {
       data : data 
     })
   })
   .catch(next)
 
  }


 
  showservice(req,res,next)
  {
        
  
  }
}

module.exports = new PrivateController();
