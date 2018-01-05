import * as userService from "../services/user"
import queryString from 'query-string';

export default {
  namespace: 'users',
  state: {
    dataList:[],
    page:1,
    total:0
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
  effects: {
    *getData({payload:{page=1}},{put,call}){
      // console.log(page)
      const data=yield call(userService.get,{page})
      console.log("data:",data)
      yield put({
        type:"save",
        payload:{
          dataList:data,
          page:parseInt(page),
          total:12
        }
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      // return history.listen(({pathname,search})=>{
      //   const query=queryString.parse(search)
      //   console.log("query:",query)
      //   if (pathname === '/user') {
      //     dispatch({ type: 'getData', payload: query });
      //   }
      // })
    }
  }
};
