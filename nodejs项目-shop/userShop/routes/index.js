var express = require('express');
var router = express.Router();
var Shop = require("../dbmodel/shop.js")
var Good = require("../dbmodel/goods.js")
var Category = require("../dbmodel/category.js")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '唯品会商城' });
});


router.get("/list", function(req, res) {
    Promise.all([Shop.find({}), Good.find({})]).then(result => {
        res.send({
            shops: result[0],
            goods: result[1]
        })
    })

});

//详情页
router.get("/gooddetail", function(req, res) {
	console.log(req.query)
    Good.find({ _id: req.query.id }).then(result => {
        Promise.all([Good.find({ _id: req.query.id }), Shop.find({ _id: result[0].shopid })]).then(result => {
            console.log(result[0])
            res.send({
                detail: result[0][0],
                curshop:result[1][0]
            })
        })
    })

});
//店铺页
router.get("/store",function (req,res) {
	console.log(req.query);
	var sign=req.query.price||1;
	var sex=req.query.sex||{"$in":["男","女"]}
	// console.log(decodeURI(req.query.category))
	// var categoryid=[];
	// var cate=[];
	// Category.find({shopid:req.query.keyword}).then(result=>{
	// 	cate={"$in":result.type};
	// 	categoryid=req.query.category||cate
	// 	console.log(categoryid)

	// })
	
	Promise.all([Shop.find({}),Shop.find({_id:req.query.keyword}),Good.find({shopid:req.query.keyword},{},{sort:{price:sign},limit:req.query.limit,skip:req.query.offset}),Category.find({shopid:req.query.keyword}),Good.find({shopid:req.query.keyword})]).then(result=>{
		// console.log(result)
		res.send({
			shops:result[0],
			curshop:result[1][0],
			goods:result[2],
			category:result[3][0],
			allgoods:result[4]
		})
	})
	
});

router.get("/filter",function (req,res) {
	// console.log(req.query)
	Promise.all([Shop.find({}),Shop.find({_id:req.query.keyword}),Good.find({shopid:req.query.keyword,sex:req.query.sex,category:req.query.category},{},{limit:req.query.limit,skip:req.query.offset}),Category.find({shopid:req.query.keyword}),Good.find({shopid:req.query.keyword})]).then(result=>{
		// console.log(result[0],result[1],result[2],result[3]);
		res.send({
			shops:result[0],
			curshop:result[1][0],
			goods:result[2],
			category:result[3][0],
			allgoods:result[4]
		});
	})
})


module.exports = router;