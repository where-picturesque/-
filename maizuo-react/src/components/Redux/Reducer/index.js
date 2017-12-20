const titleReducer=(state="卖座电影",info)=>{
	console.log(state,info)
	let {type , title}= info;  //解构赋值
	switch(type){
		case "getmovieTitle" :
			return title ;
		default :
			return state;
	}
	return state;
}
// Reducer 函数里面不能改变 State，必须返回一个全新的对象
const cominglistReducer=(state=[],info)=>{
	console.log(state,info)
	let {type , payload}= info;
	switch(type){
		case "getcominglist" :
			return [...payload] ;
		default :
			return state;
	}
	return state;
}

export  {titleReducer,cominglistReducer}