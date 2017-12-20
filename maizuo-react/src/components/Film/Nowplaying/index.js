import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import InfiniteScroll from 'react-infinite-scroller';
import "./index.scss"
class Nowplaying extends React.Component{
	constructor(){
		super();
		this.state={
			datalist:[],
			page:1,
			total:2,
			hasMore:true,
			start:true
		}
	}
	componentWillMount(){
		return axios.get(`/v4/api/film/now-playing?page=${this.state.page}&count=7`).then(res=>{
			// console.log(res.data.data.films)
			this.setState({
				datalist:res.data.data.films,
	    		page:res.data.data.page.current,
	    		total:res.data.data.page.total,

			})
		})
	}
	render(){
		return <div className="nowplaying">
			<InfiniteScroll
			    pageStart={0}
			    loadMore={this.loadFunc.bind(this)}
			    hasMore={(this.state.page<this.state.total)?true:false}
			    loader={<div className="loader">Loading ...</div>}
			>
			<ul>

			{
				this.state.datalist.map((item)=>
					<li key={item.id} className="clear" onClick={this.todetail.bind(this,item.id)}>
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
			</InfiniteScroll>
		</div>
	}
	todetail(id){
		this.props.history.push(`/detail/${id}`)
		// this.props.history.push(`/detail?id=${id}`)

	}
	loadFunc(){
		
		if (this.state.current==this.state.total) {

			this.setState({
				hasMore:false
			})
			return ;
		}
		if (this.state.start) {
			this.setState({
				start:false
			})
			var page=this.state.page+1;
			console.log(page)
			axios.get(`/v4/api/film/now-playing?__t=1511330734392&page=${page}&count=5`).then(res=>{
				
				var newlist=[...this.state.datalist,...res.data.data.films]
				console.log(newlist)
				this.setState({
					datalist:newlist,
					page:res.data.data.page.current,
		    		total:res.data.data.page.total,
		    		start:true
				})
			})
		}
			
		
		
	}
}

export default Nowplaying