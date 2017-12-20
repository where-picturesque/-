import React,{Component} from "react"
import ReactDOM from "react-dom"
import {NavLink} from "react-router-dom"
import "./index.scss"

import {connect} from "react-redux"
class Film extends Component{
	componentWillMount(){
		this.props.setTitle("卖座电影")
	}
	render(){
		return (
			<div className="film">
				<div className="film-t">
					<NavLink activeClassName="active" to="/film/nowplaying">正在热映</NavLink>
					<NavLink activeClassName="active" to="/film/comingsoon">即将上映</NavLink>

				</div>
				<div className="film-c">
				{
					this.props.children
				}
				</div>

			
			</div>
			)
	}
}

export default connect(
	null,
	{
		setTitle:(name)=>{
			return {
				type:"getmovieTitle",
				title:name
			}
		}
	}
)(Film)