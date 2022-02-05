const express = require("express");
// const userDB = require("../../../../db/blogDb/user");
// const messageDB = require('../../../../db/blogDb/comment');
// const visitorDB = require('../../../../db/blogDb/visitor');

let router = express.Router();
/*获取用户列表*/
router.post("/getUserList",(req,res)=>{
  let userDB = require("../../../../db/blogDb/user");
  let messageDB = require('../../../../db/blogDb/comment');
  let visitorDB = require('../../../../db/blogDb/visitor');
  userDB.find({},{__v:0,pwd:0})
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
          msg : '服务器错误',
          data : []
        })
      })
});

/*删除用户*/
router.post("/removeUser",(req,res)=>{
  let userDB = require("../../../../db/blogDb/user");
  let messageDB = require('../../../../db/blogDb/comment');
  let visitorDB = require('../../../../db/blogDb/visitor');
  let {id} = req.body;

  if(!id){
    res.send({
      code : 1,
      msg : '数据不正确'
    })
  }

  userDB.deleteOne({_id:id})
      .then(data=>{
        messageDB.deleteMany({user:id})
            .then(d=>{})
            .catch(e=>{});
        /*删除该用户的子留言*/
        messageDB.updateMany({"children.user": id}, {$pull: {children: {user: id}}}, () => {
        });
        /*删除最近访客里的该用户信息*/
        visitorDB.deleteMany({user:id},()=>{});
        res.send({
          code : 0,
          msg : '删除成功'
        })
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误'
        })
      })
});

/*更改用户的权限*/
router.post("/upDateUser",(req,res)=>{
    let userDB = require("../../../../db/blogDb/user");
    let messageDB = require('../../../../db/blogDb/comment');
    let visitorDB = require('../../../../db/blogDb/visitor');
  let {id, admin ,disabled} = req.body;
  userDB.updateOne({_id:id},{admin,disabled})
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

/*最近访客*/
router.post('/getVisitorList',(req,res)=>{
    let userDB = require("../../../../db/blogDb/user");
    let messageDB = require('../../../../db/blogDb/comment');
    let visitorDB = require('../../../../db/blogDb/visitor');
  visitorDB.find({},{__v:0})
      .populate("user",{_id:1,user:1,photo:1,admin:1})
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
          msg : '服务器错误',
          data : []
        })
      })
});

/*删除最近访客里的单个信息*/
router.post('/removeVisitor',(req,res)=>{
    let userDB = require("../../../../db/blogDb/user");
    let messageDB = require('../../../../db/blogDb/comment');
    let visitorDB = require('../../../../db/blogDb/visitor');
  let {id} = req.body;
  //判断id是否有值
  if (!id) {
    res.send({
      code : 1,
      msg : '无效参数'
    });
    return;
  }
  visitorDB.deleteOne({_id:id})
      .then(data=>{
        res.send({
          code : 0,
          msg : "删除成功"
        })
      })
      .catch(err=>{
        res.send({
          code :4,
          msg :'服务器错误'
        })
      })
});

module.exports = router;