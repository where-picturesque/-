var mongoose=require ("mongoose");
var Schema=mongoose.Schema;

var obj={
	username:String,
	password:String,
	email:String
}
module.exports=mongoose.model("user",new Schema(obj))