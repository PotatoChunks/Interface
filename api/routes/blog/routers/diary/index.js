//时间轴
const express = require("express");
const diaryDB = require('../../../../db/blogDb/diary');
const fs = require('fs');
const path = require('path');


let router = express.Router();

/*获取时间轴列表*/
router.post("/getDiaryList",(req,res)=>{
  diaryDB.find({},{__v:0})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功',
          data
        })
      })
      .catch(err=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'获取时间轴列表\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code :4,
          msg : '服务器错误 ,请稍后再试'
        })
      })
});


/*管理接口*/
/*获取时间轴列表*/
router.get("/adminGetDiaryList",(req,res)=>{
  diaryDB.find({},{__v:0},{date:-1})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功',
          data
        })
      })
      .catch(err=>{
        res.send({
          code :4,
          msg : '服务器错误 ,请稍后再试'
        })
      })
});

/*删除时间轴单个项目*/
router.post("/removeDiary",(req,res)=>{
  let {id} = req.body;
  //判断id是否有效
  if (!id) {
    res.send({
      code : 1,
      msg : '无效参数'
    });
    return
  }
  diaryDB.deleteOne({_id:id})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功'
        })
      })
      .catch(err=>{
        res.send({
          code :4,
          msg : '服务器错误 ,请稍后再试'
        })
      })
});

/*修改时间轴单个项目*/
router.post("/updateDiary",(req,res)=>{
  let {txt ,color ,id} = req.body;
  if (!id || !txt || !color) {
    res.send({
      code : 1,
      msg : '参数错误 ,请重新请求'
    });
    return
  }

  diaryDB.updateOne({_id:id},{txt ,color})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功'
        })
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误'
        })
      })
});

/*添加时间轴*/
router.post("/createDiary",(req,res)=>{
  let {txt ,img ,color} = req.body;
  if (!txt) {
    res.send({
      code : 1,
      msg : '参数不完整'
    });
    return
  }
  diaryDB.create({txt,img ,color})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功'
        })
      })
      .catch(err=>{
        res.send({
          code :4,
          msg : '服务器错误 ,请稍后再试'
        })
      })
});

module.exports = router;