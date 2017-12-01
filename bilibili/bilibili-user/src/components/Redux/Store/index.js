import {combineReducers, createStore ,applyMiddleware } from 'redux'
import {pagetypeReducer,getNavReducer,getListInfoReducer,detailReducer,siloReducer,cartReducer} from "../Reducer"
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger'
const rootReducer = combineReducers({
    pagetypeReducer,
    getNavReducer,
    getListInfoReducer,
    detailReducer,
    siloReducer,
    cartReducer
});



const store = createStore(rootReducer,applyMiddleware(logger,promiseMiddleware))
export default store;