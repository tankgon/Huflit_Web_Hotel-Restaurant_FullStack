const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>
{
    res.json("ceo");
});

module.exports= router;