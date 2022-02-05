const express = require('express');
const router = express.Router();


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

router.use((req, res, next)=>{res.redirect('/blog/#/404')})

// 主页
router.get('/',(req,res)=>{
    res.redirect("/blog/blog.html")
})

module.exports = router;
