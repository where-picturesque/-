
export default {
  namespace: 'indexpage',
  state: {
    count:0
  },
  reducers: {
   add(state){
     console.log("add")
     return {...state,count:state.count+1}
   },
   cut(state){
     return {...state,count:state.count-1}
   }
  },
  effects: {
    *asyncadd({},{put,call}){
      yield call(async function addasync() {
        await new Promise(resolve=>{
            setTimeout(function(){
                resolve();
            },1000)
          })
        })
      yield put({type:'add'})
    }
  },
  subscriptions: {},
};
