const express = require('express');
//评论表
//const commentDB = require('../../../../db/blogDb/comment');
const fs = require('fs');
const path = require('path');


const router = express.Router();


//提交留言
router.post('/createRegister',(req,res)=>{
  let {user,content} = req.body;
  let commentDB = require('../../../../db/blogDb/comment');
  if (!user||!content) {
    //没有值
    res.send({
      code : 1,
      msg : "数据格式错误"
    });
    return;
  }
  //添加评论
  commentDB.create({user,content})
    .then(()=>{
      res.send({
        code : 0,
        msg : "留言成功!"
      });
    })
    .catch((e)=>{
      //写入错误
      //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'提交留言\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
      res.send({
        code : 4,
        msg : "服务器错误~"
      });
    })
});

//获取留言
router.post('/getMessage',(req,res)=>{
  let commentDB = require('../../../../db/blogDb/comment');
  //获取留言列表
  commentDB.find({},{__v:0},{sort:{_id:-1}})
      .populate("user",{_id:1,user:1,photo:1,admin:1})
      .populate("children.user",{_id:1,user:1,photo:1,admin:1})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功',
          data
        })
      })
      .catch(err=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'获取留言\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code : 4,
          msg : '服务器错误'
        })
      })
});

//提交子留言
router.post('/createChild',(req,res)=>{
  let commentDB = require('../../../../db/blogDb/comment');
  let {parentId,user,content,fUser} = req.body;
  //格式错误
  if (!parentId || !user || !content || !fUser) {
    res.send({
      code : 1,
      msg : "数据格式错误"
    });
    return;
  }
  //
  commentDB.findById(parentId)
      .then(d=>{
        //没找到
        if (!d) {
          res.send({
            code : 2,
            msg : "该留言已经删除 ,请刷新页面"
          });
          return
        }
        //写入
        commentDB.updateOne({_id:parentId},{$push:{'children':{user,content,fUser}}})
            .then(data=>{
              res.send({
                code : 0,
                msg : "评论成功！"
              });
            })
            .catch(err=>{
              //写入错误
              //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'添加子留言\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
              res.send({
                code : 4,
                msg : "服务器错误~请稍后再试"
              })
            })

      })
      .catch(e=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'回复的那条留言\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code : 4,
          msg : "服务器错误~请稍后再试"
        })
      })
});

/*管理接口*/

/*获取用户评论*/
router.post('/getMessageList',(req,res)=>{
  let commentDB = require('../../../../db/blogDb/comment');
  commentDB.find({},{__v:0})
      .populate("user",{_id:1,user:1,photo:1,admin:1})
      .populate("children.user",{_id:1,user:1,photo:1,admin:1})
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

/*删除用户主评论*/
router.post('/removeMessage',(req,res)=>{
  let commentDB = require('../../../../db/blogDb/comment');
  let {id} = req.body;
  //ID是否有值
  if (!id) {
    res.send({
      code : 1,
      msg : '无效值'
    });
    return
  }
  commentDB.deleteOne({_id:id})
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

/*删除子评论*/
router.post('/removeMessageChild',(req,res)=>{
  let commentDB = require('../../../../db/blogDb/comment');
  let {id} = req.body;
  //判断id是否有值
  if (!id) {
    res.send({
      code : 1,
      msg : '参数错误'
    });
    return
  }
  //删除
  commentDB.updateMany({"children.user": id}, {$pull: {children: {user: id}}})
      .then(data=>{
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

module.exports = router;