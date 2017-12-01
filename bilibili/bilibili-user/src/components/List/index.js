import React from "react"
import axios from "axios"
import "./index.scss"
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Icon } from 'antd-mobile';
import {connect} from "react-redux"
import Nav from "../Common/ListHeader"
import Footer from "../Common/Footer"

const locale = {
  prevText: 'Prev',
  nextText: 'Next',
};

class List extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}
	componentWillMount(){
		// this.props.listInfo=null;
		this.props.pagetype("list")
		{
			/*设置页面类型 显示不同的头部*/
		}

		// console.log(this.props.match.params.categoryId)
		var categoryId=this.props.match.params.categoryId
		this.props.getlistinfo(categoryId,1)
		this.props.changepage(1)
	}
	changepage(e){
		var categoryId=this.props.match.params.categoryId
		
		var currentPage=document.getElementById("pagination").getElementsByClassName("active")[0].innerHTML
		// console.log(currentPage)
		if (e.target.classList[1]=="next") {//点击下一页
			currentPage=parseInt(currentPage)+1
			this.props.getlistinfo(categoryId,currentPage)
			this.props.changepage(currentPage)

		} else {//点击上一页
			currentPage=parseInt(currentPage)-1

			this.props.getlistinfo(categoryId,currentPage)
			this.props.changepage(currentPage)
			
		}

	}
	todetail(productId){
		var categoryId=this.props.match.params.categoryId

		// console.log(productId,this.props.match.params.categoryId)
		this.props.history.push(`/detail/${categoryId}/${productId}`);
	}
	render(){
		var info=this.props.listInfo
		// console.log(info,this.props.currentPage)
		try{
			if ( info.appCoverPicture) {
			var cover=<div className="cover">
					<div className="cover-img">
						<img src={info.appCoverPicture}/>
					</div>
					<p className="info-promotions">{info.promotions.info}</p>
				</div>
		}
		}catch(e){

		}
		console.log(this)
		return <div className="List" >
			<Nav></Nav>
		{
			info ?
			<div className="list-main">
				{
					cover
				}
				<div className="list-mainc">
					<ul className="clear">
						{
						info.products.map((item,index)=>
							<li key={item.productId} onClick={this.todetail.bind(this,item.productId)}>
								<a>
									<div className="product-img">
										<img src={item.imageUrl} />
									</div>
									<div className="product-info">
										<p className="info-t">
										{
											item.isNewProduct==1?
											<span className="isNewProduct">当季新品</span>
											:null
										}
										{
											item.isRecommend==1?
											<span className="isRecommend">
											买手推荐</span>
											:null
										}
										</p>
										<p className="brandName">{item.brandName}</p>
										<p className="productName over">{item.productName}</p>
										<p className="marketPrice">{item.marketPrice}</p>
										<p className="price">￥{item.price}</p>
									</div>
								</a>
							</li>	
							)
						}
					</ul>

					
				</div>
				{
						/*分页器  current:当前页数 存在store中 用来请求数据  当数据请求后重新render时分页的页码又会初始化成1 用current 可以修改当前页码 保证点击上下页后页码正确*/
					}
					<div id="pagination" onClick={this.changepage.bind(this)}>
					<Pagination total={info.totalPages}
					     className="custom-pagination-with-icon"
					     current={this.props.currentPage}
					     locale={{
					       prevText: (<span className="arrow-align prev"><Icon type="left" />上一页</span>),
					       nextText: (<span className="arrow-align next">下一页<Icon type="right" /></span>),
					     }}
					   />
					</div>
			</div>
			:null
		}
			<Footer></Footer>
			
		</div>
	}
	componentDidUpdate(){
		// var currentPage=document.getElementById("pagination").getElementsByClassName("active")[0]
		// currentPage.innerHTML=this.props.currentPage
	}

}

function pagetype(type){
	// console.log(type)
	return {
		type:"pagetype",
		payload:type
	}
}
function getlistinfo(categoryId,page){
	// console.log(categoryId,page)
	return axios.get(`/appapi/event/product/v3?pageIndex=${page}&categoryId=${categoryId}&key=&sort=&timestamp=1511832186970&summary=ae782f379b54aff3d27639ef949b4878&platform_code=H5`).then(res=>{
		return {
			type:"getListInfo",
			payload:res.data
			
		}
	})
}
function changepage(page){
	return {
		type:"changepageNum",
		payload:page
	}
}
export default connect(
	(state)=>{
		console.log(state)
		return{
			listInfo:state.getListInfoReducer.list,
			currentPage:state.getListInfoReducer.currentPage
		}
	},
	{pagetype,getlistinfo,changepage}
)(List)