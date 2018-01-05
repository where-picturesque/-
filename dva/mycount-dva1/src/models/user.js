import * as usersService from "../services/user.js"
import queryString from 'query-string';
export default {
  namespace: 'user',
  state: {
  	dataList:[],
  	page:null
  },
  reducers: {
  	save(state,{payload:{dataList,page,total}}){
  		return Object.assign({},state,{dataList,page,total})
  	}
  },
  effects: {
  	*getData({payload:{page = 1}},{put,call}){
  		const {data,headers }=yield call(usersService.get,{page})
  		
  		yield put({type:'save',
  			payload:{
	  			dataList:data,
	  			page:page,
	  			total:12
  			}
  		})
  	}
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, search }) => {
    //     const query = queryString.parse(search);
    //     console.log(query)//{}
    //     if (pathname === '/') {
    //       dispatch({ type: 'getData', payload: query });
    //     }
    //   });
    // },
  }
};
