const express= require('express');
const router = express.Router();

const ManagementController = require('../app/controller/ManagementController')

// bắt buộc login mới vào được 

router.get('/',ManagementController.checklogin,ManagementController.check,ManagementController.managemented);
module.exports = router 