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

 
  

  showservice(req, res, next) {}


}

module.exports = new PrivateController();
