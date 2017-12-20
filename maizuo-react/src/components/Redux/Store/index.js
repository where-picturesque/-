import { createStore,combineReducers } from 'redux'
// 多个reducer  用combineReducers合并
import {titleReducer,cominglistReducer} from "../Reducer"

// action异步请求使用中间件
import {applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';


// 使用redux-devtools 加下面两个变量
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk,promiseMiddleware)
  // other store enhancers if any
);


/*const store = createStore(
  titleReducer,
  applyMiddleware(thunk)
);*/
const store = createStore(combineReducers({
	titleReducer,cominglistReducer
}),enhancer)
export default store;