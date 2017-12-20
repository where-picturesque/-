var express = require('express');
var router = express.Router();
var Article = require("../model/article.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '用户首页' });
});

router.get("/list",function (req,res) {
	var limit=req.query.limit;
	var offset = req.query.offset;
	Promise.all([Article.find({},{},{limit:limit,skip:offset,sort:{ctime:-1}}),Article.count()]).then(result=>{
		console.log(result)
		res.send({
			total:result[1],
			list:result[0]
		})
	})
})

module.exports = router;
