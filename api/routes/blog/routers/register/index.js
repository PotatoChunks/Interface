const express = require("express");
const svgCaptcha = require("svg-captcha");
//const userDB = require("../../../../db/blogDb/user");

const fs = require('fs');
const path = require('path');

let router = express.Router();

let codeNum = null;

//验证码的接口
//获取验证码图片
router.post("/code",(req,res)=>{
  let userDB = require("../../../../db/blogDb/user");
  //超时请求
  if (req.session.codeTime){

    let t_ = new Date().getTime() - req.session.codeTime;
    if (t_ <= 3000){
      res.send({
        code : 2,
        data : req.session.codeData.data,
        msg : "请求过于频繁",
        time : 3000 - t_
      });
      return;
    }
  }
  //获取新的验证码
  let svgData = svgCaptcha.create();
  req.session.codeData = svgData;
  codeNum = svgData;
  req.session.codeTime = new Date().getTime();
  res.send({
    code : 0,
    data : svgData.data,
    msg : "请过3秒再次点击",
    time : 3000
  });
});

//验证验证码
router.post("/checkCode",(req,res)=>{
  let userDB = require("../../../../db/blogDb/user");
  let {value} = req.body;
//验证码是否正确的判断
// (value.toLocaleLowerCase() !== req.session.codeData.text.toLocaleLowerCase())
  if(!value || (value.toLocaleLowerCase() !== codeNum.text.toLocaleLowerCase())){
    res.send({
      code : 1,
      msg : "验证码错误"
    });
  }else{
    res.send({
      code : 0,
      msg : "验证码正确"
    })
  }
});

//注册用户
router.post("/userPush",(req,res)=>{
  let userDB = require("../../../../db/blogDb/user");
  // req.session.codeTime = 0;
  let {user,pwd,code} = req.body;

  //验证数据有效性
  if (!user || !pwd || !code){
    res.send({
      code : 1,
      msg : "数据无效，请检查后再注册。"
    });
    return;
  }

  //后端再次验证验证码 req.session.codeData.text.toLocaleLowerCase()
  if (code.toLocaleLowerCase() !== codeNum.text.toLocaleLowerCase()) {
    res.send({
      code : 2,
      msg : "验证码错误"
    });
    return;
  }

  //验证用户与密码
  if (!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(user) || !/^[0-9a-zA-Z]{6,18}$/.test(pwd)) {
    res.send({
      code : 2,
      msg : "用户名或密码不符合规则"
    });
    return;
  }

  //用户名是否重复
  userDB.findOne({user})
    .then(data=>{
      if (data) {
        res.send({
          code : 3,
          msg : '用户存在'
        })
      }else{
        let userDate = new Date().getTime();
        userDB.create({user,pwd,userDate})
          .then(d=>{
            res.send({
              code : 0,
              msg : '注册成功'
            })
          })
          .catch(err=>{
            //写入错误
            //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'创建用户\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
            res.send({
              code : 4,
              msg: '服务器错误'
            })
          })
      }
    })
    .catch(e=>{
      //写入错误
      //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'注册用户名是否重复\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
      res.send({
        code : 4,
        msg : '服务器错误'
      })
    })

});

module.exports = router;