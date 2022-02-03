/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

//const mongodb = require("./db");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<admin>:<admin>@mongodb1.bwdc8.mongodb.net/mongodb1?retryWrites=true&w=majority";


//
router.get("/",async (req,res)=>{
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db('[test]');
    var result = await db.collection("[user]").find().toArray();
    res.status(200).json(result);
})


module.exports = router