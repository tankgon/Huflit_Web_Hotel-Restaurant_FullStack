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
    res.render("phieudichvu");
  }

  //[GET] private/phanquyen
  phanquyen(req, res, next) {
    res.render("phieuphanquyen");
  }

  //[GET] private/nhanphong
  nhanphong(req, res, next) {
    res.render("nhanphong");
  }

  //[GET] private/traphong
  traphong(req, res, next) {
    res.render("traphong");
  }

  //[GET] private/dattiec
  dattiec(req, res, next) {
    res.render("phieudattiec");
  }

  //[GET] private/khachhang
  khachhang(req, res, next) {
    res.render("hosoKH");
  }

  //[GET] private/dskhachhang 
  dskhachhang(req, res, next) {
    Customer.find({}).lean()
    // course paramater là doucument trong db
    .then((data) => {
      res.render("dskhachhang", { data:data });
    })
    .catch(next);
  }
  //[GET] private/giahan
  giahan(req, res, next) {
    res.render("phieugiahan");
  }

  //[GET] private/phong
  phong(req, res, next) {
    res.render("phong");
  }

  //[GET] private/doiphong
  doiphong(req, res, next) {
    res.render("phieudoiphong");
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
