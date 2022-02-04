const express = require('express');
const visitorDB = require('../../../../db/blogDb/visitor');
const fs = require('fs');
const path = require('path');

const router = express.Router();

//最近访客
router.post("/",(req,res)=>{
  //
  visitorDB.find({},{},{skip:0,limit:12,sort:{date:-1}})
      .populate("user",{_id:1,user:1,photo:1})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功',
          data
        })
      })
      .catch(err=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'最近访客\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code : 4,
          msg : '服务器错误',
          data : null
        })
      })
});

module.exports = router;