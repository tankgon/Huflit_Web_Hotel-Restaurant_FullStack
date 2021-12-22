const account = require("../models/Account");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Service = require("../models/Service")
const TicketService = require("../models/VoucherService");
const BillService = require("../models/BillService");
class PrivateController {
  //[GET] private/
  privated(req, res, next) {
    res.render("home");
  }

  //[GET] private/dichvu
  dichvu(req, res, next) {
    res.render("dichvu/phieudichvu");
  }

   
  //[GET] private/themdichvu
  // themdichvu(req, res, next) {
  //   res.render("dichvu/themdichvu");
  // }

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


  //[GET] private/phanquyen
  phanquyen(req, res, next) {
    res.render("management/phieuphanquyen");
  }

  //////// Phòng ///////
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

  //[GET] private/kiemtraphong
  kiemtraphong(req, res, next) {
    res.render("phong/kiemtraphong");
  }


  //[GET] private/phong
  phong(req, res, next) {
    res.render("phong");
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



  // Chưa hoàn thhành 
  //[GET] private/dskhachhang/trash
  trashkhachhang(req,res,next)
 {
       // lấy ra find những thằng đã xóa
       Customer.findDeleted({}).lean()
       .then((customer) =>
         res.render("me/trash-khoahoc", {
          customer : customer
         })
       )
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
  




  test(req,res,next)
  {
    res.render("test");
  }

  testt(req,res,next)
  {
    // Service.find({}).lean()
    // // course paramater là doucument trong db
    // .then(service => {
    //   res.render("test1", { service: service });
    // })
    // .catch(next);
    // Customer.find({name:{$regex:namee,$options:'$i'}}).lean()
    
    // // course paramater là doucument trong db
    // .then((data) => {
        
    //   res.render("test1", { data:data});
   
    // })
    // .catch(next);

    
  }
  showservice(req,res,next)
  {
        
  
  }
}

module.exports = new PrivateController();
