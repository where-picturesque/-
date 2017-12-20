var express = require('express');
var router = express.Router();
var User = require("../model/user.js")
var md5 = require("md5");


router.get("/",function (req,res) {
	res.render("login",{pwderror:false})
});

router.post("/",function (req,res) {
	User.find({
		email:req.body.email,
		password:md5(req.body.password)
	}).then(result=>{
		console.log(result)
		if (result.length==0) {//用户名密码不正确
			// console.log("用户名密码不正确")
			res.render("login",{pwderror:true})
		} else {
			console.log('正确');
			res.cookie("curruser",result[0].username)
			req.session.userInfo=result[0];
			
			res.redirect("/");
		}
	})
});



module.exports=router;