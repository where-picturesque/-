import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  	type:"",
  	isdetail:false,
  	detaildata:null,
    keyword:""
  },
  mutations: {
    type(state,payload){
    	// console.log(payload)
    	state.type=payload
    },
    detail(state,payload){
    	console.log(payload)
    	state.isdetail=payload
    },
    isdetail(state,payload){
    	console.log(payload)
    	state.isdetail=payload.isdetail;
    	state.detaildata=payload.data;
    },
    keyword(state,payload){
      state.keyword=payload
    }
  },
  actions:{
  	detailData(state,payload){
  		// console.log(payload)
  		axios(payload).then(res=>{
  			// console.log(res.data.data.detail)
  			store.commit("isdetail",{data:res.data.data.detail,isdetail:"detail"})
  		})
  	},
    sresult(state,payload){
      store.commit("keyword",payload)
    }
  }
})

export default store;