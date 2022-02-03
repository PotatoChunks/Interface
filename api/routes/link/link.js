/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

//const mongodb = require("./db");

const mongoose = require("mongoose");



// 
router.get("/",async (req,res)=>{
    let client = await mongoose.connect("mongodb+srv://<admin>:<admin>@mongodb1.bwdc8.mongodb.net/sample_airbnb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    let db = await client.db('[sample_airbnb]')
    let value = await db.addCollection('[listingsAndReviews]').find().toArray()
    res.send({code:0,data:value})
})


module.exports = router