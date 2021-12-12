const account = require("../models/Account");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
class PrivateController {
  //[GET] private/
  privated(req, res, next) {
    res.render("home");
  }

  //[GET] private/dichvu
  dichvu(req, res, next) {
    res.render("dichvu/phieudichvu");
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

  //[GET] private/phong
  phong(req, res, next) {
    res.render("phong");
  }

  //[GET] private/doiphong
  doiphong(req, res, next) {
    res.render("phong/phieudoiphong");
  }



  //[POST] private/receivecustomer
  receivekhachhang(req, res, next) {
    // post dữ liệu lên db
    const customer = new Customer(req.body);

    customer.save()
      // chuyển hướng đến trang trủ
      .then(() => res.redirect("./dskhachhang"))
      .catch((error) => {});
  }


}

module.exports = new PrivateController();
