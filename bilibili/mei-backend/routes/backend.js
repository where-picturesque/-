var express = require('express');
var router = express.Router();
var User=require("../dbmodel/user.js")
var md5 = require("md5");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/login",function (req,res) {
	// User.find({username:"zhangsan"}).then(result=>{
	// 	console.log(res)
	// })
	res.send(res)
})
router.get("/register",function (req,res) {
	res.send("register")
})




router.post("/login",function (req,res) {
	console.log(req.body,req.query)
	User.find({username:req.body.username}).then(result=>{
		if (result.length==0) {//新用户
			console.log("用户名密码错误")
			res.send(0)
		} else {
			console.log("用户密码正确")
			res.send(1)
		}
	})
	// res.send("1")
})

router.post("/register",function (req,res) {
	User.find({username:req.body.username}).then(result=>{
		if (result.length==0) {//新用户
			console.log("新用户")
			return User.create({
				username:req.body.username,
				password:md5(req.body.password)
			})//return 之后才能连续调用then 可以返回promise对象，then在resolve时执行，也可以返回表达式，then立即执行
		} else {
			console.log("用户已存在")
			res.send(0)
		} 
	}).then(result=>{
		res.send(1)
	})



})
module.exports = router;
