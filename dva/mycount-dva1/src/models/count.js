
export default {
  namespace: 'count1',
  // state: 0,
  state:{
  	count:0,
  	list:[]
  },
  // reducers: {
  // 	add(state){
  // 		console.log(state+"add")
  // 		return state+1
  // 	},
  // 	cut(state){
  // 		return state-1
  // 	}
  // },
  reducers:{
  	add(state){
  		console.log(state)
  		// return {...state,count:state.count+1}
  		return Object.assign({},state,{count:state.count+1})
  	},
  	cut(state){
  		return {...state,count:state.count-1}
  	}
  },
  effects: {
  	*addasync({},{ put, call }){
  		console.log("addasync")
  		yield call(
  			async function  asyncadd(){
				await new Promise(function(resolve){
					setTimeout(function(){
						console.log("1秒后")
						resolve()
					},1000)
				})
					
			}
		)
  		yield put({type:'add'})
  	}
  },
  subscriptions: {},
};
