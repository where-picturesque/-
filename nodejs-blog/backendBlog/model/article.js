var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj={
	author:String,
	title:String,
	content:String,
	filename:String,
	ctime:Date
}
var model=mongoose.model("article",new Schema(obj));
// 生成articles表与之对应  操作这个表模板就能操作数据库中的articlesb表
module.exports = model;


