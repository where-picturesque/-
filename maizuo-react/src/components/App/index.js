import React from"react"
import ReactDOM from "react-dom"
import {NavLink} from "react-router-dom"
import "./index.scss"

import Home from "../Home/index.js"
import Navbar from "../Common/Navbar"
import Sidebar from "../Common/Sidebar"
class App extends React.Component{
	constructor(){
		super();
		this.state={
			isshow:false 
		}
	}
	render(){
		return <div className="app">
			<Navbar events={this.showsidebar.bind(this)}  ></Navbar>
			<Sidebar show={this.state.isshow} event={()=>{
				this.setState({
					isshow:false
				})
			}}></Sidebar>
			<section id="section">
			{
				this.props.children
			}
			</section>
			
		</div>
	}
	showsidebar(){
		console.log("1111")
		this.setState({
			isshow:!this.state.isshow
		})
	}
}

export default App