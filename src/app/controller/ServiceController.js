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

class ServiceController {
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


    dsdichvu(req,res,next)
    {
      res.render("dichvu/dsdichvu")
    }
  //[QUẢN LÝ]
  //[GET] private/phanquyen
  phanquyen(req, res, next) {
    res.render("management/phieuphanquyen");
  }

}
module.exports = new ServiceController();