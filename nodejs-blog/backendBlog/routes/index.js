var express = require('express');
var router = express.Router();
var Article = require("../model/article.js")

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(req.cookies("curruser"))
	if (req.session.userInfo) {
		Article.find({
			author:req.cookies.curruser
		}).then(result=>{
			console.log(result)
			res.render('index', { title:"title",user:req.cookies["curruser"],articleInfo:result });
		})
  		
	} else {
		console.log("未获取到session")
		res.redirect("/login");
	}
});

router.get("/logout",function(req,res){
	req.session.destroy(result=>{
		res.redirect("/login");
	})
})

module.exports = router;
