import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import "@/assets/iconfont/iconfont.css"
import "@/assets/public.css"

import {connect} from "react-redux"
class Navbar extends React.Component{
	render(){
		return <nav>
			<div className="nav-l">
				<i className="iconfont icon-category" onClick={()=>{
					this.props.events()
				}} ></i>
			
				<span>{this.props.title}</span>
			</div>

			<div className="nav-r">
				<span>杭州</span>
				<i className="iconfont icon-account"></i>
			</div>
		</nav>
	}
}

export default connect(
	(state)=>{
		// console.log(state)
		return {
			title:state.titleReducer
		}
	}
	,null
	)(Navbar)