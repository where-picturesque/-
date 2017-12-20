import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import { connect } from "react-redux";
import "./index.scss"
class Detail extends React.Component{
	constructor(){
		super();
		this.state={
			datalist:null
		}
	}
	componentWillMount(){
		// console.log(this.props)
		return axios.get(`/v4/api/film/${this.props.match.params.movieid }`).then(res=>{
			console.log(res.data.data)
			this.setState({
				datalist:res.data.data.film
			})
			// console.log(this.state.datalist)
			this.props.getTitle(res.data.data.film.name)
		})
	}
	render(){
		return <div className="Detail">
			{
				this.state.datalist?
				<div className="detailInner">
					<div className="detail-t">
						<img src={this.state.datalist.cover.origin}/>
					</div>
					<div className="detail-c">
						<p className="detail-title">影片简介</p>
						<div className="detail-info">
							<dl className="clear">
								<dt>导演 ：</dt>
								<dd>{this.state.datalist.director}</dd>
							</dl>
							<dl className="clear">
								
								<dt>主演 ：</dt>
								{
									this.state.datalist.actors.map((item,index)=>
										<dd key={index}>{item.name}|</dd>
										)
								}
							</dl>
							<dl className="clear">
								<dt>地区语言：</dt>
								<dd>{this.state.datalist.nation}({this.state.datalist.language})</dd>
							</dl>
							<dl className="clear">
								<dt>类型：</dt>
								<dd>{this.state.datalist.category}</dd>
							</dl>
							<p className="synopsis">{this.state.datalist.synopsis}</p>
						</div>
					</div>

				</div>:null
			}
		</div>
	}
}

export default connect(
//在Detail组件外面包裹一层容器<Connect/>  两个参数，参一：属性 参二：方法 map state to props/map methods to props 可以向下传递给子组件Detail Detail中接收并调用this.props.getTitle
	null,
	{	/*action开始*/	
		getTitle:(name)=>{
			// 自动dispatch 
			return {
				type:"getmovieTitle",
				title:name
			}
		}
		/*action结束*/
	}
	)(Detail)