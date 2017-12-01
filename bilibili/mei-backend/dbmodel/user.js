var mongoose =require("mongoose")
var Schema =mongoose.Schema

// 数据库中user的表模板
var obj={
	username:String,
	password:String,
	email:String
}

var model=mongoose.model("user",new Schema(obj))
module.exports=model