var express = require('express');
var router = express.Router();
var md5=require("md5") 
var User=require ("../model/user.js")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('register');
});
router.post("/",function (req,res) {
	User.find({email:req.body.email}).then(res=>{
		console.log(res)
		if (res.length>0) {//已注册过
			console.log(0)
			res.send(0)
		} else {
			User.create({
				username:req.body.username,
				password:md5(req.body.password),
				email:req.body.email
			})
			console.log(1)
			res.send(1)
		}
	})
})
module.exports = router;
