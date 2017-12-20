var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('login');
});
router.post("/",function (req,res) {
	console.log(req.body)
	res.send("login请求")
})
module.exports = router;
