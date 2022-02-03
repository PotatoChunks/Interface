/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

//const mongodb = require("../../db/db");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/admin?retryWrites=true&w=majority";


//
router.get("/",async (req,res)=>{
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db('blog');
    var result = await db.collection("user").find().toArray();
    res.send({
        code:0,
        data:result
    })
})


module.exports = router