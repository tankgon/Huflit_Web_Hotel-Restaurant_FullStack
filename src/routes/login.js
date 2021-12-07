const express = require('express');
const router = express.Router();

const LoginController = require("../app/controller/LoginController");

router.get('/',LoginController.login);
router.post('/',LoginController.loginpost);

module.exports= router;