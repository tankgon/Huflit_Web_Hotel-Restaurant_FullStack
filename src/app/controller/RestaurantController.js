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

class RestaurantController {
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
      res.redirect(`/private/hddattiec/${req.body.cmnd}`);
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
}
module.exports = new RestaurantController();