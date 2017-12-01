import React from"react"
import ReactDOM from "react-dom"
import {NavLink} from "react-router-dom"
import "../../assets/public.css"
import "../../assets/iconfont/iconfont.css"
import "./index.scss"

class App extends React.Component{
	constructor(){
		super();
		this.state={
			isshow:false 
		}
	}
	render(){
		return <div className="app">
			
			<section id="section">
			{
				this.props.children
			}
			</section>
			
		</div>
	}
	
}

export default App