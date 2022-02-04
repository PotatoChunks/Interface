/*上传头像逻辑*/
const express = require('express');
const path = require("path");
const userDb = require("../../../../db/blogDb/user");
const fs = require('fs');
//上传包
const multer = require('multer');
const router = express.Router();

/*let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../../../../public/img/userPhoto'));
  },
  filename: function (req, file, cb) {
    let fileName = "";
    if (req.session.login) {
      fileName = req.session.login._id + file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
    }else{
      fileName = file.fieldname + '-' + Date.now() +file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
    }
    cb(null, fileName)
  }
});*/

// let upload = multer({ storage }).single('file');


//上传头像
router.post("/",(req,res)=>{
  //
  /*upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误文件不符合规定
      res.send(500);
      //写入
      fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'上传头像文件不符合规定\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
    } else if (err) {
      // 其他错误
      res.send(500);
      //写入
      fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'上传头像的其他错误\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
    }
    if(!req.session.login){
      res.send(500);
      return
    }
    // 一切都好更改用户头像
    userDb.updateOne(
        {_id:req.session.login._id},
        //       http://localhost:3000
        {photo:"http://121.199.25.174/img/userPhoto/"+req.file.filename}
    ).then(data=>{
      //更新session存储的数据 http://localhost:3000
      req.session.login.photo = "http://121.199.25.174/img/userPhoto/"+req.file.filename;
      res.send('OK');
    }).catch(e=>{
      //写入错误
      fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'更改用户头像\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
      res.send(500);
    });
});*/
  res.send(500);
});


module.exports = router;
