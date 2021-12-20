const account = require("../models/Account");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Service = require("../models/Service")
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
    res.render("dichvu/sudungdv");
  }


  //[GET] private/phanquyen
  phanquyen(req, res, next) {
    res.render("management/phieuphanquyen");
  }

  //[GET] private/nhanphong
  nhanphong(req, res, next) {
    res.render("phong/nhanphong");
  }

  //[GET] private/traphong
  traphong(req, res, next) {
    res.render("phong/traphong");
  }

  //[GET] private/dattiec
  dattiec(req, res, next) {
    res.render("nhahang/phieudattiec");
  }


  //[GET] private/themmonan
  themmonan(req, res, next) {
    res.render("nhahang/themmonan");
  }


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

  //[GET] private/hdsuco
  hdsuco(req, res, next) {
    res.render("hoadon/hdsuco");
  }

  //[GET] private/hdungtruoc
  hdungtruoc(req, res, next) {
    res.render("hoadon/hdungtruoc");
  }


  //[GET] private/hddichvu
  hddichvu(req, res, next) {
    res.render("hoadon/hddichvu");
  }


  //[GET] private/hdtraphong
  hdtraphong(req, res, next) {
    res.render("hoadon/hdtraphong");
  }
  


  //[POST] private/receivecustomer
  receivekhachhang(req, res, next) {
   const customer = new Customer(req.body);
    console.log(customer);
   customer.save()
    .then(()=>{res.redirect("./dskhachhang")})
    .catch((error)=>{});
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
