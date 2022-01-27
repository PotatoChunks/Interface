/**
 * 小游戏
 * */
const express = require('express');
const router = express.Router();

const path = require('path');

//  数组移块
router.get("/number",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../../public/numberPlace/1.html"))
});


module.exports = router;