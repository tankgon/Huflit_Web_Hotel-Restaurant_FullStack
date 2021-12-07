const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
// cài đặt quá trình put,get,post trong update 
// const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
// // tạo bên index route index.js
const route = require('./routes');
// import jwt 
const jwt = require('jsonwebtoken');
//import cookie parser 
var cookieParser = require("cookie-parser");
// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs', 
   helpers: {
      sum:(a,b) => a+b,
    
}
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// import dạng dữ liệu json 
app.use(express.urlencoded());
app.use(express.json());

// import cookie parser 
app.use(cookieParser());
// cài đặt method phải ở vị trí đầu 
// app.use(methodOverride('_method'));

// static file 
app.use(express.static(path.join(__dirname, 'public')));







// tạo route chứa các handle function
route(app);

// import mongo db 
const db = require('./config/db');
// connect to db 
db.connect();

app.listen(port, () => {
  console.log(` App listening at http://localhost:${port}`);
})