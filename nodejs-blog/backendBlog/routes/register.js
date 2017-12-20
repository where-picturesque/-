var express = require('express');
var router = express.Router();
var User = require("../model/user.js");
var md5 = require("md5");

router.get("/",function (req,res) {
	res.render("register",{isregister:false})
});

router.post("/",function (req,res) {
	console.log(req.body)
	User.find({
		email:req.body.email
	}).then(result=>{
		if (result.length==0) {//未注册
			//插入数据
			console.log("新用户")
			return User.create({
				username:req.body.username,
				email:req.body.email,
				password:md5(req.body.password)
			})//return 之后才能连续调用then 可以返回promise对象，then在resolve时执行，也可以返回表达式，then立即执行
		} else {
			console.log("已注册")
			res.render("register",{isregister:true})
		}
	}).then(result=>{
		//这个回调函数等待 create 的promise reslove 之后才会调用
		res.redirect("/login");
	})
})
module.exports=router;