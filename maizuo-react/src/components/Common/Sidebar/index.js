import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import {NavLink} from "react-router-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

class Sidebar extends React.Component{
	render(){
		return <div>
		<ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
          	this.props.show?
          	<div id="sidebar">
          		<ul onClick={()=>{
          			this.props.event()
          		}}>
          			<li>
          				<NavLink  to="/home">
          					<span>首页</span>
          					<i className="iconfont icon-more"></i>
          				</NavLink>
          				
          			</li>
          			<li>
          				<NavLink  to="/film">
          					<span>影片</span>
          					<i className="iconfont icon-more"></i>
          				</NavLink>
          				
          			</li>
          			<li>
          				<NavLink  to="/film">
          					<span>影院</span>
          					<i className="iconfont icon-more"></i>
          				</NavLink>
          			</li>
          			<li>
          				<NavLink  to="/my">
          					<span>我的</span>
          					<i className="iconfont icon-more"></i>
          				</NavLink>
          			</li>
          		</ul>

          	</div>
          	:null
          }
         
        </ReactCSSTransitionGroup>
			
		</div>
	}
}

export default Sidebar