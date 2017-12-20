 import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import InfiniteScroll from 'react-infinite-scroller';
import "./index.scss"
import {connect} from "react-redux"
class Comingsoon extends React.Component{
	constructor(){
		super();
		this.state={
			datalist:[]
		}
	}
	componentWillMount(){
		if (this.props.datalist.length<=0) {
			this.props.comingpromise();
		}
	}
	render(){
		return <div className="comingsoon">
		<ul>
		{
			this.props.datalist.map((item)=>
				<li key={item.id} className="clear">
					<img src={item.poster.origin} className="item-img" />
					<div className="item-info">
						<p className="info-name">{item.name}</p>
						<p className="info-intro">{item.intro}</p>
					</div>
					<div className="item-grade">
						<span className="item-grade">{item.grade}</span>
						<i className="iconfont icon-more"></i>
					</div>
				</li>
				)
		}
		</ul>
		</div>
	}
}



export default connect(//给组件外面包裹一层容器组件
	(state)=>{
		console.log(state)
		return {
			datalist:state.cominglistReducer
		}
	},
	{
		getcominglist:()=>{//切换组件时从store中取数据 不用再次请求服务器 当刷新后，销毁store对象则store数据为空重新向服务器发出请求
				 //异步action 借助 redux-thunk 中间件实现 
			return (dispatch)=>{
				axios.get("/v4/api/film/coming-soon?page=1&count=7").then(res=>{
						// console.log(res.data.data)
						// 手动dispatch
						dispatch({
							type:"getcominglist",
							payload:res.data.data.films
						})
					})
			}
		},
		comingpromise:()=>{
			return axios.get("/v4/api/film/coming-soon?page=1&count=7").then(res=>{
					// console.log(res.data.data)
					// 自动dispatch
					return{
						type:"getcominglist",
						payload:res.data.data.films
					}
				})
		}
	}
	)(Comingsoon)