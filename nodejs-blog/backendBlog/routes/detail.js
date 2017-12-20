var express = require('express');
var router = express.Router();
var Article = require("../model/article.js")
var md5 = require("md5");


router.get("/",function (req,res) {
	Article.find({
		_id:req.query.id
	}).then(result=>{
		res.render("detail",{title:"详情页面",user:req.cookies["curruser"],articleInfo:result[0]})
	})
	
});



module.exports=router;