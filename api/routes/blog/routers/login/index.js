const express = require('express');
const crypto = require('crypto');
const router = express.Router();
//导入用户表
const userDB = require("../../../../db/blogDb/user");
//最近访客表
const visitor = require("../../../../db/blogDb/visitor");

const fs = require("fs");
const path = require('path');

//用户登录
router.post("/",(req,res)=>{
  let {user,pwd} = req.body;
  //判断是否已经登录
  if (req.session.login) {
    res.send({
      code : 6,
      msg : "已经登录，请退出之后再登录"
    });
    return;
  }
  //判断是否有值
  if (!user || !pwd) {
    res.send({
      code : 1,
      msg : '请输入正确数据'
    });
    return
  }
  //查找
  userDB.findOne({user})
    .then(data=>{
      //判断用户是否存在
      if (!data) {
        res.send({
          code : 2,
          msg : '用户不存在'
        })
        return
      }
      //判断密码是否正确
      //加密之后进行判断
      let createPwd = crypto.createHash("sha256").update(pwd).digest("hex");
      //没加密判断一下 加密判断一下
      if (pwd !== data.pwd && createPwd !== data.pwd) {
        res.send({
          code : 3,
          msg : '密码错误'
        });
        return
      }
      //验证用户与密码
      if (!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(user) || !/^[0-9a-zA-Z]{6,18}$/.test(pwd)){
        res.send({
          code : 5,
          msg : "用户名或密码不符合规则请重新输入"
        });
        return;
      }

      //登录成功
      //记录session状态
      req.session.login = data;
      res.send({
        code : 0,
        msg : '登录成功'
      });
      //删除这个用户之前的访客记录
      visitor.deleteMany({user:data._id})
        .then(d=>{
          visitor.create({user:data._id},()=>{})
        })
        .catch(e=>{
          //写入错误
          //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'用户登录的访客记录\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
        })
    })
    .catch(e=>{
      //写入错误
      //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'用户登录的查找用户\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
      res.send({
        code : 4,
        msg : '服务器错误'
      })
    })
});

//判断是否登录
router.post("/ifLogin",(req,res)=>{
  //将之前存的数据拿到
  if (!req.session.login) {
    res.send({
      code:0,
      userData:false
    });
    return
  }
  userDB.findById(req.session.login._id)
      .then(d=>{
        //用户信息失效
        if (!d) {
          req.session.login = undefined;
          res.send({
            code : 3,
            msg : '用户登录失效重新登录'
          });
          return
        }
        //
        let data = JSON.parse(JSON.stringify(d));
        let ifData = false;
        //判断data是否存在
        if (data){
          delete data.pwd;
          delete data.__v;
          ifData = data;
        }
        res.send({
          code:0,
          userData : ifData
        })
      })
      .catch(err=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'用户是否登录\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code : 4,
          msg : '服务器错误'
        });
      });
});

//登出
router.post("/logout",(req,res)=>{
  req.session.destroy();
  res.send({
    code : 0,
    msg : "退出登陆成功"
  });
});


/*管理接口*/

/*管理员登录*/
router.post('/adminLogin',(req,res)=>{
  let {user ,pwd} = req.body;
  //判断是否已经登录
  if (req.session.adminLogin) {
    res.send({
      code : 2,
      msg : "已经登录，请退出之后再登录"
    });
    return;
  }

  if (!user || !pwd) {
    res.send({
      code : 1,
      msg : '请输入用户名和密码'
    });
    return
  }

  userDB.findOne({user})
      .then(data=>{
        //判断用户是否存在
        if (!data) {
          res.send({
            code : 6,
            msg : '用户不存在'
          });
          return
        }
        //判断密码是否正确
        let userPwd =crypto.createHash("sha256").update(pwd).digest("hex");
        if (userPwd !== data.pwd) {
          res.send({
            code : 3,
            msg : '密码错误'
          });
          return
        }
        //判断是否是管理员
        if (data.admin) {
          //登录成功
          //记录session状态
          req.session.adminLogin = data;
          res.send({
            code : 0,
            msg : '登录成功'
          });
        }else{
          //不是管理员
          res.send({
            code : 7,
            msg : '你不是管理员'
          });
        }
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误'
        })
      });
});

/*验证登录*/
router.post('/adminIfLogin',(req,res)=>{
  if (req.session.adminLogin && req.session.adminLogin.admin) {
    res.send({
      code : 0,
      msg : "已登录",
      data : req.session.login
    });
  }else{
    res.send({
      code : 1,
      msg : "未登录登录",
      data : null
    });
  }
});


module.exports = router;