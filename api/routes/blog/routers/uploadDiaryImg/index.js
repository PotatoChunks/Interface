const express = require('express');
const path = require("path");
//
const multer = require('multer');

/*let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../public/img/diaryImg'));
  },
  filename: function (req, file, cb) {
    let fileName = "";
    fileName = Date.now()+(Math.ceil(Math.random()*1000))+file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
    cb(null, fileName)
  }
});*/

// let upload = multer({ storage }).single('file');

const router = express.Router();

//上传图片
router.post("/",(req,res)=>{
  //
  /*upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误
      res.send(500);
    } else if (err) {
      // 发生错误
      res.send(500);
    }
    // 一切都好
    res.send({
      code : 0,
      msg : "",
      surface :  "http://121.199.25.174/img/diaryImg/"+req.file.filename
    })
  });*/
  res.send(500);
});


module.exports = router;
