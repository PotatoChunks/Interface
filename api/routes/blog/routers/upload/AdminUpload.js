const express = require('express');
const path = require("path");
//
const multer = require('multer');

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname,'../../public/img/articleImg'));
//   },
//   filename: function (req, file, cb) {
//     let fileName = "";
//     fileName = Date.now()+file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
//     cb(null, fileName)
//   }
// });

// let upload = multer({ storage }).single('file');

const router = express.Router();

//上传图片
router.post("/",(req,res)=>{
  //
  /*upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误
      res.send({
        code : 1,
        msg :'错误 ,请重试'
      });
    } else if (err) {
      // 发生错误
      res.send({
        code : 2,
        msg : '出错 ,请重试'
      });
    }
    // 一切都好
    res.send({
      code : 0,
      msg : "",
      surface :  "http://121.199.25.174/img/articleImg/"+req.file.filename
    })
  });*/
  res.send({
    code : 2,
    msg : '等待程序员添加...'
  });
});


module.exports = router;
