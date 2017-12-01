import React from "react"
import axios from "axios"
import "./index.scss"
import {connect} from "react-redux"
import Header from "../Common/Header2"
import Footer from "../Common/Footer"
import {NavLink} from "react-router-dom"

var _ = require('lodash');

class Cart extends React.Component{
	handleLogin(){
		axios.post("/backend/login",{
			name:this.refs.username.value,
			password:this.refs.password
		}).then(res=>{
			console.log(res)
		})
	}

	render(){
	
		return <div className="Cart">
			<Header></Header>
			<div id="box">
			登录页面
				<form action="/backend/login" method="post">
				 	<div className="group">
						<label>用户名</label>
						<div className="inputbox">
							<input type="text" placeholder="请输入用户名" name="username" ref="username" />
						</div>
				 	</div>
				 	<div className="group">
						<label>密码</label>
						<div  className="inputbox">
							<input type="password" placeholder="请输入密码" name="password" ref="password" />
						</div>
				 	</div>
				 	<button type="" onClick={this.handleLogin.bind(this)}>登录</button>
				 	<NavLink to="/register">注册</NavLink>
				</form>
			</div>
			<Footer/>

		</div>
	}


}

var action={
	pagetype(type){
		console.log(type)
		return {
			type:"pagetype",
			payload:type
		}
	}
}
const state=(state)=>{
	return{
		recommend:state.cartReducer.recommend,
		cartlistTr:state.cartReducer.cartlistTr
	}
}
export default connect(state,action)(Cart)