import React from "react"
import "./index.scss"
import {NavLink,withRouter,Link} from "react-router-dom"
import axios from "axios"
import {connect} from "react-redux"
import "@/assets/fonts/fonts.css"

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
		var prevscroll=0;
		window.onscroll=function (e) {
			// console.log(document.documentElement.scrollTop)
			var nowscroll=document.documentElement.scrollTop
			if (nowscroll>prevscroll) {//向下滚动
				that.setState({
					showheader:false
				})
			} else {
				that.setState({
					showheader:true
				})
			}
			prevscroll=nowscroll
		}
	}
	goback(){
		// console.log(history)
		history.go(-1);
	}
	changepage(index){
		console.log(this.props)
	}
	render(){
		var navlist= this.props.navlist
		var category=[];
		for (var i = 0; i < navlist.length; i++) {

  			category.push(<li key={i}><NavLink to={"/silo/"+navlist[i].categoryId} activeClassName="active">{navlist[i].name}</NavLink></li>)

		}

		var listTitle=null;
		var detail=this.props.detail
		if (this.props.listInfo ||detail) {
			if ( this.props.pagetype=="list") {
				listTitle=this.props.listInfo.eventName
				
			} else {
				listTitle=<div className="detail-header">
					<p className="header-brand">{detail.brand}</p>
					<p className="header-price">￥{detail.price}</p>
				</div>
			}
		}
		// list页面的头部
		const list=<div className="list-head">
			<header className="list-header clear">
				<span className="iconfont mei-arrow" onClick={this.goback.bind(this)}></span>
				<div className="list-title over">{listTitle}</div>
				<i className="iconfont mei-dot"></i>
			</header>
			{
			//list或detail页面筛选部分显示隐藏
			}
			{
				this.props.pagetype=="list"?
				<div className="sort">
					<ul className="clear">
						<li>人气</li>
						<li>折扣</li>
						<li>价格<div className="price-sort"></div></li>
						<li>筛选</li>
					</ul> 
				</div>
				:null
			}
			
			
		</div>
		return <div id="header">
			<ReactCSSTransitionGroup
	        transitionName="example"
	        transitionEnterTimeout={300}
	        transitionLeaveTimeout={300}>
		        {
		        	this.state.showheader?list:null
		        }
	      	</ReactCSSTransitionGroup>
			
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