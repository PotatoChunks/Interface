const express = require('express')
const router = express.Router()
const fs = require("fs")

router.use("/insect",require('./insect/insect'));

router.get("/favicon.ico",(req,res)=>{
    // ico 图标
});


module.exports = router;