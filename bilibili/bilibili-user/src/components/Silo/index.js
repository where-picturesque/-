import React from "react"
import axios from "axios"
import "./index.scss"
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux"
const newmenberTitle=require("@/assets/images/newmenber.png")
import Nav from "../Common/Header"
class Home extends React.Component{

	componentWillMount(){
		this.props.pagetype("home")
		this.props.getBanner()
		this.props.getList(this.props.match.params.category)
	}
	render(){
		console.log(this.props)
		var banner=this.props.banner
		var list=this.props.list
		return <div className="Home">
			<Nav></Nav>
			<div className="banner" key={banner.length}>
				<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:3000,speed :2000,startSlide :1}}>
	                {
	                	banner.map((item,index)=>
	                		<div key={item.id}><img src={item.imgUrl} /></div>
	                		)
	                }
	            </ReactSwipe>
			</div>
			
			<div className="home-main">
				<div className="newmenber">
					<img src={newmenberTitle} className="newmenber-title"/>
					<img src={require("@/assets/images/20170818185035156.jpg")} />
				</div>
				<div className="today-new">
					<img className="today-new-t" src={require("@/assets/images/today-new.png")}/>
					<ul className="clear">
					{
						list.map((item,index)=>
							<li key={item.categoryId}>
								<img  src={item.imageUrl}/>
							</li>
							)
					}
					</ul>
				</div>
				
			</div>
		</div>
	}
	componentWillUpdate(){
		
	}
	
}
const action={
	pagetype(type){
		console.log(type)
		return {
			type:"pagetype",
			payload:type
		}
	},
	getBanner(props){
		return axios.get("/appapi/home/marketingBannerNew/v3?silo_code=12&timestamp=1511925146704&summary=8f577a0ec23fc48f788570b919a4eb33").then(res=>{
			return {
				type:"banner",
				payload:res.data.banners
			}
		})
		
	},
	getList(categoryId){
		return axios.get(`/appapi/newArrivalSilo/eventList/v3?pageIndex=1&categoryId=${categoryId}&timestamp=1511925146725&summary=59504f6a4eaa359b3aab208c25ede6cf`).then(res=>{
			return {
				type:"list",
				payload:res.data.eventList
			}
		})
	}
}
const state=(state)=>{
	console.log(state)
	return {
		banner:state.siloReducer.banner,
		list:state.siloReducer.list
	}
}
export default connect(state,action)(Home)