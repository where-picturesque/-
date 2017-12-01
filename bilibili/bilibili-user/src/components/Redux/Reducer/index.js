const pagetypeReducer=(state="home",info)=>{
	let {type,payload}=info
	// console.log(payload)
	switch(type){
		case "pagetype" :
			return payload;
		default :
			return state;
	}
	return state;
}

const getNavReducer =(state=[],info)=>{
	let {type,payload}=info
	// console.log(payload)
	switch(type){
		case "getNav" :
			return [...payload];
		default :
			return state;
	}
	return state;
}
const initState={
	list:null,
	currentPage:1
}
const getListInfoReducer=(state=initState,info)=>{
	let {type,payload}=info;
	// console.log(info)
	switch(type){
		case "getListInfo":
			return Object.assign({},state,{list: payload });
		case "changepageNum":
			return Object.assign({},state,{currentPage: payload });
		default :
			return state;
	}
	return state;//可加可不加
}

const detailState={
	detail:null,
	recommend:[]
}
const detailReducer=(state=detailState,info)=>{
	let {type,payload}=info;
	switch(type){
		case "getDetail":
			return Object.assign({},state,{detail: payload });
		case "recommend":
			return Object.assign({},state,{recommend:payload});
		default:
			return state;
	}
	return state;
}
const silostate={
	banner:[],
	list:[]
}
const siloReducer=(state=silostate,info)=>{
	let{type,payload}=info
	switch(type){
		case "banner":
			return  Object.assign({},state,{banner:payload});
		case "list":
			return Object.assign({},state,{list:payload});
		default :
			return state;
	}
	return state;
}
const cartState={
	recommend:[],
	cartlistTr:[],
	cartinfo:[]
}
const cartReducer=(state=cartState,info)=>{
	let{type,payload}=info;
	switch(type){
		case "cartRecommend":
			return Object.assign({},state,{recommend:payload});
		case "setCartlistTr":
			return Object.assign({},state,{cartlistTr:[...state.cartlistTr,...payload]});
		case "updateTr":
			state.cartlistTr.splice(payload.index,1,payload.cartlistTr)
			return Object.assign({},state,{cartlistTr:state.cartlistTr});
		case "deleteTr":
			state.cartlistTr.splice(payload.index,1)
			return Object.assign({},state,{cartlistTr:state.cartlistTr});


		case "addTr":
			state.cartinfo.push(payload)
			return Object.assign({},state,{cartinfo:payload})
		default:
			return state;
	}
	return state;
}

export  {pagetypeReducer,getNavReducer,getListInfoReducer,detailReducer,siloReducer,cartReducer};