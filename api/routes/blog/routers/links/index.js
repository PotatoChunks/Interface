//友链接口
const express = require('express');
//const linksDB = require('../../../../db/blogDb/links/uploadLinks');//申请友链的表
//const links = require('../../../../db/blogDb/links/link');//获取友链表
const fs = require('fs');
const path = require('path');

const router = express.Router();
//申请友链
router.post("/upLink",(req,res)=>{
  let linksDB = require('../../../../db/blogDb/links/uploadLinks');
  let {name,href,logo,describe} = req.body;
  if(!name){
    res.send({
      code : 1,
      msg : '请输入名称'
    });
    return
  }
  if(!href) {
    res.send({
      code: 2,
      msg: '请输链接'
    });
    return;
  }
  //时间
  let date = new Date().getTime();
  //名称 ,链接 ,图片 ,描述 ,时间
  linksDB.create({name,href,img:logo,describe,date})
    .then(d=>{
      res.send({
        code : 0,
        msg : '申请成功 , 请等待审核'
      })
    })
    .catch(e=>{
      //写入错误
      //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'申请友链\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
      res.send({
        code : 4,
        msg : '服务器错误'
      })
    });
});

//获取友链
router.post('/getLink',(req,res)=>{
  let links = require('../../../../db/blogDb/links/link');
  //
  links.find({},{__v:0},{sort: {date:-1}})
    .then(data=>{
      res.send({
        code : 0,
        msg : '成功',
        data
      })
    })
    .catch(e=>{
      //写入错误
      //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'获取友链\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
      res.send({
        code : 4,
        msg : '服务器错误',
        data : []
      })
    })
});


/*管理接口*/
/*获取处理好的友链列表*/
router.post("/getLinksList",(req,res)=>{
  let links = require('../../../../db/blogDb/links/link');
  //
  links.find({},{__v:0})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功',
          data
        })
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误 ,请稍后再试'
        })
      })
});

/*删除处理好的友链*/
router.post('/removeLinks',(req,res)=>{
  let links = require('../../../../db/blogDb/links/link');
  let {id} = req.body;
  //id是否有效
  if (!id) {
    res.send({
      code : 1,
      msg : '无效参数'
    });
    return
  }
  links.deleteOne({_id:id})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功'
        })
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误 ,稍后再试'
        })
      })
});

/*修改处理好的友链*/
router.post('/updateLinks',(req,res)=>{
  let linksDB = require('../../../../db/blogDb/links/uploadLinks');
  let {name ,href ,img ,describe ,id} = req.body;
  //判断是否有值
  if (!name || !href || !img || !describe || !id) {
    res.send({
      code : 1,
      msg : '数据不完整'
    });
    return
  }
  linksDB.updateOne({_id:id},{name ,href ,img ,describe})
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

/*获取等待处理的友链列表*/
router.post('/getUpdateLinks',(req,res)=>{
  let linksDB = require('../../../../db/blogDb/links/uploadLinks');
  linksDB.find({},{__v:0})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功',
          data
        })
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误 ,请稍后再试',
          data:[]
        })
      })
});

/*删除待处理的友链*/
router.post('/removeUpdateLinks',(req,res)=>{
  let linksDB = require('../../../../db/blogDb/links/uploadLinks');
  let {id} = req.body;
  //判断id
  if (!id) {
    res.send({
      code : 1,
      msg : '参数出错'
    });
    return
  }
  linksDB.deleteOne({_id:id})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功'
        })
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误 ,稍后再试'
        })
      })
});

/*上传友链*/
router.post('/updateUpdateLinks',(req,res)=>{
  let links = require('../../../../db/blogDb/links/link');
  let {name ,href ,img ,describe ,id} = req.body;
  if (!name || !href || !img ) {
    res.send({
      code : 1,
      msg : '数据不完整'
    });
    return
  }
  links.create({name ,href ,img ,describe})
      .then(d=>{
        linksDB.deleteOne({_id:id},()=>{});
        res.send({
          code : 0,
          msg : '创建成功'
        })
      })
      .catch(e=>{
        res.send({
          code : 4,
          msg : '服务器错误'
        })
      });
});

module.exports = router;
