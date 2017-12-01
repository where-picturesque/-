import React from "react"
import axios from "axios"
import "./index.scss"
import {connect} from "react-redux"

import ReactSwipe from 'react-swipe';
import Nav from "../Common/Header/index.js"
import Footer from "../Common/Footer"

class list extends React.Component{
	render(){
		return {

		}
	}
}

class Detail extends React.Component{
	componentWillMount(){
		console.log(this.props.match)
		this.props.pagetype("detail")
		this.props.getDetail(this.props.match.params.productId)
		this.props.getRecommend(this.props.match.params.productId,this.props.match.params.categoryId)
	}
	todetail(productId){
		var categoryId=this.props.match.params.categoryId

		// console.log(productId,this.props.match.params.categoryId)
		this.props.history.push(`/detail/${categoryId}/${productId}`);

	}
	addToCart(e){
		console.log(e.target.getAttribute("name"))
		var categoryId=this.props.match.params.categoryId
		var pid=e.target.getAttribute("name")
		var productStorage= localStorage.getItem("product")
		// console.log(productStorage)
		if (productStorage) {//Storage存在 获取storage
			var productArr=JSON.parse(productStorage)
				productArr.push({
					pid:pid,
					categoryId:categoryId,
					num:1
				})
		} else {//Storage不存在 第一个商品 初始化数组
			var productArr=[];
			productArr.push({
				pid:pid,
				categoryId:categoryId,
				num:1
			})
		}
		// localStorage.setItem("product",JSON.stringify(productArr))

	}
	render(){
		var detailInfo=this.props.detailInfo
		var recommend = this.props.recommend
		if (detailInfo==null) {
			return <li>正在加载中</li>
		}
		var swipe=[];
		var service=[];
		var size=[];
		var attributesList=[];
		var productimg=[];
		var maintenanceList=[];
		var recommed=[];
		if (detailInfo) {
			for(var i=0;i<detailInfo.images.lengthl;i++){
				swipe.push(<div key={i}><img src={detailInfo.images[i].bigImgUrl}/></div>)
			}
			for(var i=0;i<detailInfo.service_labels.length;i++){
				service.push(<dd key={i}><span>{detailInfo.service_labels[i].label_title}</span><span>|</span></dd>)
			}
			for (var i = 0; i < detailInfo.size.length; i++) {
				size.push(<span key={detailInfo.size[i].sizeId} className="sizetext">{detailInfo.size[i].sizeValue}</span>)
			}
			for (var i = 0; i < detailInfo.description.attributesList.length; i++) {
				attributesList.push(<p key={i} className="clear"><span>{detailInfo.description.attributesList[i].name}</span><span>{detailInfo.description.attributesList[i].value}</span></p>)
			}
			for (var i = 0; i < detailInfo.description.product_img1.length; i++) {
				productimg.push(<img  src={detailInfo.description.product_img1[i].bigImgUrl} key={i}/>)
			}
			for (var i = 0; i < detailInfo.description.maintenanceList.length; i++) {
				maintenanceList.push(<li key={i}>{detailInfo.description.maintenanceList[i]}</li>)
			}
			for (var i = 0; i < recommed.length; i++) {
				recommend.push()
			}
			
		}
		
		return <div className="detail">
			<Nav></Nav>
				<div className="detail-main" >
					<div className="swipe" key={detailInfo}>
						<ReactSwipe className="carousel" swipeOptions={{continuous: false,auto: 3000,speed:1000,continuous:true}}>
			                {
			                	detailInfo.images.map((item,index)=>
									<div key={index}>
										<img src={item.bigImgUrl} />
									</div>
			                	)
			                }
			            </ReactSwipe>
					</div>
					<div className="detail-info">
						<ul>
							<li>
								<p className="name">{detailInfo.name}</p>
								<p className="marketPrice">￥{detailInfo.marketPrice}</p>
								<p className="price">
									<span className="price-num">￥{detailInfo.price}</span>
									<span className="discount">{detailInfo.discount}</span>
									<div className="addToCart" name={this.props.match.params.productId}  onClick={this.addToCart.bind(this)}>加入购物车</div>
								</p>
								<p className="deliver_date">{detailInfo.deliver_date}</p>
							</li>
							<li>
								<span className="quickbuy">闪购</span>
								<span className="quickbuy-text">距离结束0天0小时0分0秒</span>
							</li>
							<li className="clear">
								<span className="service">服务</span>
								<dl className="service_labels clear">
									{
										service
									}
								</dl>
							</li>
							<li className="size">
								<span>尺码</span>
								{size}
							</li>
							<li className="attributesList">
								<p className="li-t">商品参数</p>
								{attributesList}
							</li>
							<li>
								<p className="li-t">商品详情</p>
								<p className="design">{detailInfo.description.design}</p>
								<div className="productimg">
									{productimg}
									<p>{detailInfo.description.message}</p>
								</div>
							</li>
							<li>
								<p className="li-t">洗护与保养</p>
								<ul>{maintenanceList}</ul>
							</li>
							<li className="brandinfo">
								<p className="li-t">{detailInfo.brandName}</p>
								<img src={detailInfo.brandImg} />
								<p className="brand_story">{detailInfo.brand_story}</p>
							</li>
							<li>
								<p className="li-t">用户评论</p>

							</li>
							<li className="recommend">
								<p className="li-t">搭配推荐</p>
								<div className="list-mainc">
									<ul>
										{
										recommend.map((item,index)=>
											<li key={item.productId} onClick={this.todetail.bind(this,item.productId)}>
												<a>
													<div className="product-img">
														<img src={item.imgUrl} />
													</div>
													<div className="product-info">
														<p className="info-t">
														{
															item.newProduct==true?
															<span className="isNewProduct">当季新品</span>
															:null
														}
														{
															item.is_recommended==true?
															<span className="isRecommend">
															买手推荐</span>
															:null
														}
														</p>
														<p className="brandName">{item.brand_name}</p>
														<p className="productName over">{item.product_name}</p>
														<p className="marketPrice">{item.market_price}</p>
														<p className="price">￥{item.price}</p>
													</div>
												</a>
											</li>	
											)
										}
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
		
		</div>
	}
	componentWillReceiveProps(nextProps){
		// 点击推荐列表商品，商品详情显示更换内容重新触发ajax
		if (nextProps.location.pathname != this.props.location.pathname) {
         	// console.log(nextProps)
			
			this.props.getDetail(nextProps.match.params.productId)
			this.props.getRecommend(nextProps.match.params.productId,nextProps.match.params.categoryId)
			window.scrollTo(0,0);
     	} 
		
		
	}
}

const action={
	getDetail(productId){
		return axios.get(`/appapi/product/detail/v3?productId=${productId}&platform_code=H5&summary=3501f6edf35331fc2b6dfd41aaef881a`).then(res=>{
			return {
				type:"getDetail",
				payload:res.data.infos
			}
		})
	},
	pagetype(type){
		return {
			type:"pagetype",
			payload:type
		}
	},
	getRecommend(productId,categoryId){
		return axios.get(`/appapi/product/hot/v3?categoryId=${categoryId}&productId=${productId}&platform_code=H5`).then(res=>{
			return {
				type:"recommend",
				payload:res.data.categoryList
			}
		})
	}
}

const state=(state)=>{
	// console.log(state.detailReducer)
	return {
		detailInfo:state.detailReducer.detail,
		recommend:state.detailReducer.recommend

	}
}

export default connect(state,action)(Detail)