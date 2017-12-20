var express = require('express');
var router = express.Router();
var Article = require("../model/article")
var multer = require('multer')


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images') //文件路径
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })


router.get("/", function(req, res) {
    res.render("article", { title: "发布博客", update: false })
});

router.post("/", upload.single('photo'), function(req, res) {//photo是表单提交的文件的name
    // console.log(req.file)
    var filename=""
    try {
    	filename=req.file.filename//如果有文件上传，这是上传文件的文件名  req.file是上传的文件信息
    } catch (e) {

    }
    Article.create({
        author: req.cookies["curruser"],
        title: req.body.title,
        content: req.body.content,
        filename: filename,
        ctime: Date.now()//时间戳
    }).then(result => {
        res.redirect("/")
    })

});
router.get("/logout", function(req, res) {
    req.session.destroy(result => {
        res.redirect("/login");
    })
})

router.get("/update", function(req, res) {
    Article.find({ _id: req.query.id }).then(result => {
        res.render("article", { title: "更新博客", articleInfo: result[0], update: true })
    })
})

router.post("/update", upload.single('photo'), function(req, res) {
    console.log(req.file);
    try {
        var filename = req.file.filename
    } catch (e) {

    }
    Article.findByIdAndUpdate(req.body.articleId, {
        $set: {
            title: req.body.title,
            content: req.body.content,
            filename: filename,
            ctime: Date.now()
        }
    }).then(result => {
        res.redirect("/")
    })
})

router.get("/del", function(req, res) {
    Article.findByIdAndRemove(req.query.id).then(result => {
        res.redirect("/")
    })
})
module.exports = router;