const express = require("express");
const article = require("../../../../db/blogDb/article/article");//文章表
const articleInfo = require("../../../../db/blogDb/article/articleInfo");//文章标签
const fs = require('fs');
const path = require('path');

let router = express.Router();
//文章标签info
router.post("/getInfo",(req,res)=>{
  //查找
  articleInfo.findOne({},{__v:0})
      .then(data=>{
        res.send({
          code:0,
          data
        })
      })
      .catch(e=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'文章标签\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code:4,
          msg:"服务器错误",
          data:null
        })
      })
});

//获取最新文章列表
router.post("/getArticleNew",(req,res)=>{
  let {skip,limit,tag} = req.body;
  let option = tag?{tag}:{};
  article.find(option,{__v:0},{skip,limit,sort: {date:-1}})
      .then(data=>{
        res.send({
          code:0,
          data
        })
      })
      .catch(e=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'获取最新文章列表\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code:4,
          msg:"服务器错误",
          data:null
        })
      })

});

//获取热门文章
router.post("/getPopular",(req,res)=>{
  let {limit} = req.body ;
  article.find({},{__v:0},{sort:{pv:-1},skip:0,limit:limit-1})
      .then(data=>{
        res.send({
          code:0,
          data
        })
      })
      .catch(e=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'获取热门文章\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code:4,
          msg:"服务器错误",
          data:null
        })
      })
});

//获取文章
router.post('/',(req,res)=>{
  let {id} = req.body;
  //没有id
  if (!id) {
    res.send({
      code : 1,
      msg : '参数错误',
      data : null
    });
    return;
  }

  article.findById(id)
      .then(data=>{
        if (data) {
          //pv加1
          article.updateOne({_id:id},{$inc:{pv:1}})
            .then(d=>{})
            .catch(e=>{
              //写入错误
              //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'访问量pv\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
            });
          //
          res.send({
            code : 0,
            msg : '成功',
            data
          })
        }else{
          //没有文章
          res.send({
            code : 1,
            msg : '没有对应的文章',
            data : null
          })
        }
      })
      .catch(err=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'获取文章\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code : 4,
          msg : '服务器错误',
          data : null
        })
      })
});

//搜索文章
router.post('/getSearch',(req,res)=>{
  let {value} = req.body;
  //没有值
  if (!value) {
    res.send({
      code : 1,
      msg : '请输入内容',
      data : []
    })
  }
  //
  let reg = new RegExp(value);
  article.find({$or:[{title:reg},{outline:reg}]},{__v:0},{sort:{pv:-1},skip:0,limit:6})
      .then(data=>{
        //找到了
        if (data.length) {
          res.send({
            code : 0,
            msg : '成功',
            data
          })
        }else{
          //没找到
          res.send({
            code : 3,
            msg : '没有你找的信息',
            data
          })
        }
      })
      .catch(err=>{
        //写入错误
        //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'搜索文章\t'+new Date()+'\n\n'+err+'\r\n\n\r',{flag:"a"},(err)=>{});
        res.send({
          code : 4,
          msg : '服务器错误',
          data : []
        })
      })
});

/**/
/*管理接口*/
/**/

/*文章添加*/
router.post('/updateArticle',(req,res)=>{
  let {title ,type ,tag ,outline ,content ,nexContent ,ifTag ,surface} = req.body;
  //数据不完整
  if (!title || !type || !tag || !outline || !content || !nexContent || !surface) {
    res.send({
      code : 1,
      msg : "数据不完整",
    });
    return;
  }

  articleInfo.find({tags:tag}).then(data=>{
      console.log(data)
  })

  //如果为true就添加分类
  if (ifTag) {
    articleInfo.updateOne({},{$push:{tags:tag}})
        .then(d=>{})
        .catch(e=>{});
  }
  article.create({title ,type ,tag ,outline ,content ,nexContent ,surface})
      .then(data=>{
        articleInfo.updateOne({},{$inc:{num:1}})
            .then(_=>{})
            .catch(_=>{});
        res.send({
          code : 0,
          msg : '添加成功'
        });
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误'
        })
      });
});

/*文章列表*/
router.post("/getArticleShow",(req,res)=>{
  //从第几个开始到第几个
  let {skip ,limit} = req.body;
  //没有限制
  if (!skip && !limit) {
    res.send({
      code : 1,
      msg : '参数错误',
      data : []
    });
    return;
  }
  article.find({},{__v:0},{skip,limit,sort:{date:-1}})
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
      });
});

/*文章分类获取*/
router.post('/getArticleInfoList',(req,res)=>{
  articleInfo.findOne({})
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
          msg : '服务器错误,请刷新页面',
          data : {tags:[],num:0}
        })
      })
});

/*文章修改提交*/
router.post('/articleUpdate',(req,res)=>{
  let {type ,title ,content ,outline ,tag ,id ,nexContent} = req.body;
  article.updateOne({_id:id},{type,title,tag,outline,content,nexContent})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功'
        })
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务器错误,稍后再试'
        })
      })
});

/*文章单个删除*/
router.post('/removeArticle',(req,res)=>{
  let {id} = req.body;
  if (!id) {
    res.send({
      code : 1,
      msg : '请输入正确的id'
    });
    return
  }
  article.deleteOne({_id:id})
      .then(data=>{
        res.send({
          code : 0,
          msg : '成功'
        });
        articleInfo.updateOne({},{$inc:{num:-1}})
            .then(d=>{})
            .catch(e=>{})
      })
      .catch(err=>{
        res.send({
          code : 4,
          msg : '服务其错误,请稍后再试'
        })
      })
});

module.exports = router;