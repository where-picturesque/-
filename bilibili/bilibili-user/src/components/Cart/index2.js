import React from "react"
import SwipeableViews from 'react-swipeable-views';
import axios from "axios"
import "./index.scss"
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux"
import Header from "../Common/Header2"
import {Stepper } from 'antd-mobile'
var _ = require('lodash');
import Tr from "./Tr"



class Cart extends React.Component{
	constructor(){
		super();
	}
	componentWillMount(){
		var that=this;
		this.props.pagetype("home")
		this.props.getRecommend();
		var productStorage= localStorage.getItem("product")
		var productArr=JSON.parse(productStorage)
		if(productArr){
			this.props.addTr(productArr)

		}

	}
	
	// 商品数量
	getproductNum(carts,pid){
		var num=0;
		for(var j=0;j<carts.length;j++){
			if (carts[j].pid==pid) {
				num+=carts[j].num
			}
		}
		return num;
	}
	// 删除商品
	delProduct(id){
		var productStorage= localStorage.getItem("product")
		var productArr=JSON.parse(productStorage)
		var index=_.findIndex(productArr, {pid:id});
		productArr.splice(index,1);
		localStorage.setItem("product",JSON.stringify(productArr))
		this.props.addTr(productArr)
	}
	// 点击加入购物车
	addToCart(e){
		var {recommend,cartlistTr,updateCartListTr,addTr}=this.props

		var pid=e.target.getAttribute("name")
		var productStorage= localStorage.getItem("product")
		if (productStorage) {//Storage存在 获取storage
			var productArr=JSON.parse(productStorage)
			var newproduct={//新商品对象
					pid:pid,
					num:1
				}
			// 方法一：  找pid=pid对象的索引
			var index=_.findIndex(productArr, {pid:pid})
			console.log(index)
			if (index>=0) {//有重复值
				productArr[index].num++;
				addTr(productArr)
			} else {//无重复值，新商品
				productArr.push(newproduct)//添加到数组中
				addTr(productArr)

			}
			// 方法二：添加到数组中再去重
			// productArr.push(newproduct)//添加到数组中
			// // 去重
			// var uniqproductArr=_.uniqBy(productArr,"pid")

			// // 计算数量
			// for(var i=0;i<uniqproductArr.length;i++){
			// 	console.log(i)
			// 	var num=this.getproductNum(productArr,uniqproductArr[i].pid)
			// 	uniqproductArr[i].num=num

			// }
			// productArr=uniqproductArr
			// if (uniqproductArr.length!=productArr.length) {//有重复值
				
			// } else {//无重复值
				
			// }

		} else {//Storage不存在 第一个商品 初始化数组
			var productArr=[];
			productArr.push({
				pid:pid,
				num:1
			})
			addTr(productArr)

		}
				
		// 加到localStorage中
		localStorage.setItem("product",JSON.stringify(productArr))

		
		

	}
	// 数量加减
	onChange (val){
	    console.log(val);
	    var productStorage= localStorage.getItem("product")
	    var productArr=JSON.parse(productStorage)
	    
	}
	render(){
		var productStorage= localStorage.getItem("product")
		var {recommend,cartlistTr,cartinfo}=this.props
		console.log(cartinfo,this.props.cartinfo)
		var cartinfolist=[];
		for (var i = 0; i < cartinfo.length; i++) {
			for (var j = 0; j< recommend.length; j++) {
				if (cartinfo[i].pid==recommend[j].productId) {
					console.log("添加")
					cartinfolist.push(<Tr productInfo={recommend[j]} num={cartinfo[i].num} />)
				}
			}
		}
		var cartlist=null;
		if (productStorage) {//如果购物车里有商品
			try{
				console.log(productStorage,productStorage.length)
				if (productStorage.length==0) {
					localStorage.removeItem("product")
				}else{
					cartlist=<table>
						<tbody ref="tbody">
							<tr>
								<th>商品信息</th>
								<th>价格</th>
								<th>数量</th>
								<th>小计</th>
								<th>操作</th>
							</tr>
							{cartinfolist}
						</tbody>
					</table>
				}
			}catch(e){

			}
			
		} else {//购物车空
			cartlist=<div className="cart-empty">购物车空空的，赶紧去购物吧...</div>
		}
		

		var recommendlist=[]
		for (var i = 0; i < recommend.length; i++) {
			recommendlist.push(<li key={recommend[i].productId}>
				<img src={recommend[i].picUrl} />
				<div className="product-info">
					<p className="brandName">{recommend[i].brandName}</p>
					<p className="productName over">{recommend[i].productName}</p>
					<p className="marketPrice">{recommend[i].marketPrice}</p>
					<p className="price">￥{recommend[i].price} </p>
					<span className="addToCart" name={recommend[i].productId} onClick={this.addToCart.bind(this)}>加入购物车</span>
				</div>

				</li>)
		}
		return <div className="Cart">
			<Header></Header>
			<div className="cartList">
				{cartlist}
			</div>
			
			<div className="cart-recommend">
				<ul className="clear">{recommendlist}</ul>

			</div>
		</div>
	}


}

var action={
	pagetype(type){
		console.log(type)
		return {
			type:"pagetype",
			payload:type
		}
	},
	getRecommend(){//购物车页面的推荐商品
		return axios.get("/appapi/cms/cmsDetail/v3?silo=2013000100000000012&ids=2041000100000000251,2120000100000000085&timestamp=1512013248828&summary=141ecb257e46fcbd4223d5e9bf100988&platform_code=H5").then(res=>{
			
			return {
				type:"cartRecommend",
				payload:res.data.resultList[1].data
			}
		})
	},

	addTr(arr){
		return {
			type:"addTr",
			payload:arr
		}
	}
}
const state=(state)=>{
	return{
		recommend:state.cartReducer.recommend,
		cartlistTr:state.cartReducer.cartlistTr,
		cartinfo:state.cartReducer.cartinfo
	}
}
export default connect(state,action)(Cart)