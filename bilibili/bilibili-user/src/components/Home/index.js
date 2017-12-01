import React from "react"
import axios from "axios"
import "./index.scss"
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux"
import Nav from "../Common/Header/index.js"
import Footer from "../Common/Footer"

const newmenberTitle=require("@/assets/images/newmenber.png")
class Home extends React.Component{
	constructor(){
		super();
		this.state={
			bannerlist:[],
			nextbanner:[],
			newlist:[],
			hotlist:[]

		}
	}
	componentWillMount(){
		this.props.pagetype("home")
		axios.get("/appapi/home/marketingBannerNew/v3?timestamp=1511769306760&summary=2819bde40e4fb51c2b7bb4fa5da778ab").then(res=>{
			// console.log(res.data)
			this.setState({
				bannerlist:res.data.banners
			})
		})
		axios.get("/appapi/home/appBanner/v3?type=9").then(res=>{
			// console.log(res.data.resultList)
			this.setState({
				nextbanner:res.data.resultList
			})
		})
		axios.get("/appapi/home/eventForH5?params=%7B%7D&timestamp=1511775073143&summary=9a4594d4ca470ed912e154cf437a418f&platform_code=H5").then(res=>{
			console.log(res.data.lists);
			this.setState({
				newlist:res.data.lists[0].events,
				hotlist:res.data.lists[1].events
			})
		})
	}
	render(){
		return <div className="Home">
			<Nav></Nav>
			<div className="banner" key={this.state.bannerlist.length}>
				<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:3000,speed :2000,startSlide :1}}>
	                {
	                	this.state.bannerlist.map((item,index)=>
	                		<div key={item.id}><img src={item.imgUrl} alt="图片出错" /></div>
	                		)
	                }
	            </ReactSwipe>
			</div>
			<div className="nextbanner">
				<ul className="clear">
				{
					this.state.nextbanner.map((item,index)=>
						<li key={item.name}>
							<img src={item.backImage || item.image}/>
						</li>
						)
				}
				</ul>
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
						this.state.newlist.map((item,index)=>
							<li key={item.categoryId} onClick={this.toList.bind(this,item.categoryId)}>
								<img  src={item.imageUrl}/>
							</li>
							)
					}
					</ul>
				</div>
				<div className="hot">
					<img src={require("@/assets/images/hot.png")} className="hot-t"/>
					<ul className="clear">
					{
						this.state.hotlist.map((item,index)=>
							<li key={item.categoryId}>
								<img  src={item.imageUrl}/>
							</li>
							)
					}
					</ul>
				</div>
			</div>
			<Footer></Footer>
		</div>
	}

	toList(categoryId){
		// console.log(categoryId)
		this.props.history.push(`/productlist/${categoryId}`)
	}
}

export default connect(
	null,
	{
		pagetype(type){
			console.log(type)
			return {
				type:"pagetype",
				payload:type
			}
		}
	}
	)(Home)