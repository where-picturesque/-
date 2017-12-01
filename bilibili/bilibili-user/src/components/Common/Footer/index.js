import React from "react"
import "./index.scss"
import {NavLink} from "react-router-dom"
import axios from "axios"
class  Footer extends React.Component{
	constructor(){
		super();
		this.state={
			
		}
	}

	render(){
		return <footer className="footer">
			<a  className="tel">400 - 664 - 6698</a> 
			<div className="footer-c">
				<a href="/" className="router-link-active">首页</a>
				<span>|</span> 
				<a href="">客户端</a> 
				<span>|</span> 
				<a href="/login" className="">登录</a> 
				<span>|</span> 
				<a href="/login" className="">注册</a>
			</div> 
			<p className="icp">浙ICP备16004860号-1</p>
		</footer>
	}
} 

export default Footer