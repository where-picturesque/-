import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex);

const  store= new Vuex.Store({
	state:{
		title:"卖座电影",
		comingsoonlist:null,
		total:1
	},
	mutations:{
		getheadertitle(state,payload){
			// console.log(state,payload);
			this.state.title=payload;

		},
		getlist(state,payload){
			console.log(this.state.comingsoonlist)
			this.state.comingsoonlist=payload.films;
			this.state.total=payload.page.total
			// console.log(this.state.comingsoonlist)
		},
		hometitle(state,payload){
			state.title=payload
		},
		getlistagin(state,payload){
			this.state.comingsoonlist=[...this.state.comingsoonlist,...payload.films];
			this.state.total=payload.page.total
		}
	},
	actions:{
		getcomingsoonlist(state,payload){
			axios(payload).then(res=>{
				// console.log(res.data.data)
				store.commit("getlist",res.data.data)
			})
		},
		getcominglistagin(state,payload){
			axios(payload).then(res=>{
				// console.log(res.data.data)
				store.commit("getlistagin",res.data.data)
			})
		}
	},
	getters:{
		datalist(state){
			return this.$store.state.comingsoonlist?this.$store.state.comingsoonlist.films:[]
		}
	}
})

export default store;