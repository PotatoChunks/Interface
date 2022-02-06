const express = require('express');
const router = express.Router();
const path = require('path')


/*文章相关的接口*/
router.use("/article",require('./article/index'));

//注册的接口
router.use("/register",require('./register/index'));

//登录的接口
router.use("/login",require("./login/index"));

//上传图片接口
router.use("/upload",require("./upload/index"));


//友链接口
router.use("/links",require("./links/index"));

//评论接口
router.use("/message",require("./message/index"));

//最近访客
router.use("/visitor",require("./visitor/index"));

//时间轴
router.use("/diary",require("./diary/index"));

/*管理接口*/

/*管理文章上传图片接口*/
router.use("/AdminUpload",require('./upload/AdminUpload'));

/*用户接口*/
router.use('/user',require('./user/index'));

/*上传时间轴图片接口*/
router.use('/uploadDiaryImg',require('./uploadDiaryImg/index'));

// 管理页面
router.get('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname,'./html/index.html'))
})

router.use((req, res, next)=>{res.redirect('/#/404')})



module.exports = router;
