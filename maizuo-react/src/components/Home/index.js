import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import { Swipe, SwipeItem } from 'swipejs/react';
import "./index.scss"

import {connect} from "react-redux"
class Home extends React.Component{
	constructor(){
		super();
		this.state={
			bannerlist:[],
			nowplaying:[],
			comingsoon:[]
		}
	}
	componentWillMount(){
		this.props.setTitle("卖座电影")
		return (
			Promise.all([axios.get("/v4/api/billboard/home"),axios.get("/v4/api/film/now-playing?__t=1511349984355&page=1&count=5"),axios.get("/v4/api/film/coming-soon?__t=1511349984361&page=1&count=3")]).then(res=>{
				// console.log(res)
				this.setState({
					bannerlist:res[0].data.data.billboards,
					nowplaying:res[1].data.data.films,
					comingsoon:res[2].data.data.films
				})
			
			})
			)
	}
	render(){
		return <div className="home">
			<Swipe className='custom-swipe-container-class'
             ref='swipe'
             speed={300}
             auto={3000}
             continuous={true}
             draggable ={true}
             key={this.state.bannerlist.length}
             >
             {
             	this.state.bannerlist.map((item)=>
             		<SwipeItem  key={item.id} className='custom-swipe-item-class'> 
             			<img src={item.imageUrl} />
             		</SwipeItem>
             		)
             }
	        
	        
	      </Swipe>
	      <div className="home-nowplaying">
	      	<ul>
	      		{
	      			this.state.nowplaying.map((item)=>
	      				<li key={item.id}>
	      					<img src={item.cover.origin} />
	      					<div className="home-np-info">
	      						<div className="info-l">
									<p className="info-name">{item.name}</p>
									<p className="info-count">
										<span>{item.cinemaCount}家影院上映</span>
										<span>{item.watchCount}人购票</span>
									</p>
	      						</div>
	      						<div className="info-r">{item.grade}</div>
	      					</div>
	      				</li>
	      				)
	      		}
	      	</ul>
	      </div>
	      <div className="home-coming">
	      	<ul>
	      		{
	      			this.state.comingsoon.map((item)=>
						<li key={item.id}>
	      					<img src={item.cover.origin} />
	      					<div className="home-np-info">
	      						<div className="info-l">
									<p className="info-name">{item.name}</p>
									<p className="info-count">
										<span>{item.cinemaCount}家影院上映</span>
										<span>{item.watchCount}人购票</span>
									</p>
	      						</div>
	      						<div className="info-r">{item.grade}</div>
	      					</div>
	      				</li>
	      			)
	      		}
	      	</ul>
	      </div>
		</div>
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
)(Home)