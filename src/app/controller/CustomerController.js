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

class CustomerController {
    
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
}   
module.exports = new CustomerController();