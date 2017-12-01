import React from "react"
import "./index.scss"
import {NavLink,withRouter,Link} from "react-router-dom"
import axios from "axios"
import {connect} from "react-redux"
import "@/assets/fonts/fonts.css"
class  Nav extends React.Component{
	constructor(){
		super();
		this.state={
			navlist:[],
			showheader:true
		}
	}
	componentWillMount(){
		this.props.getNav();
		
		var that=this;
		window.onscroll=function (e) {
			// console.log(document.documentElement.scrollTop)
			var nowscroll=document.documentElement.scrollTop
			// if (nowscroll>100) {//向下滚动
			// 	that.setState({
			// 		showheader:false
			// 	})
			// } else {
			// 	that.setState({
			// 		showheader:true
			// 	})
			// }
		}
	}
	goback(){
		console.log(history)
		history.go(-1);
	}
	changepage(index){
		console.log(this.props)
	}
	render(){
						

		// 首页头部
		const home=<div className="head"> 
			<header className="header clear">
				<div className="header-l">
					<NavLink to="/login">登录</NavLink>				
				</div>
				<div className="logo">
					
					<img src={require("@/assets/images/logo.png")}  />
				</div>
				
				<div className="header-r">
					<NavLink to="/"  >首页</NavLink>					
				</div>

			</header>
			
		</div>
		return <div id="header">
			{home}
		</div>
	}
	
} 

export default connect(
	(state)=>{
		// console.log(state)
		return {
			pagetype:state.pagetypeReducer,
			navlist:state.getNavReducer,
			listInfo:state.getListInfoReducer.list,
			detail:state.detailReducer.detail
		}
	},
	{
		getNav:()=>{
			return axios.get("/appapi/silo/navigationAll/v3?timestamp=1511769306826&summary=1e817a388a1d17258df951f1831b7768").then(res=>{
				return {
					type:"getNav",
					payload:res.data.lists
				}
			})
		}
	}
)(Nav)