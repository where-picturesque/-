import React from "react"
import axios from "axios"
import "./index.scss"
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux"
import Header from "../Common/Header2"
import {Stepper } from 'antd-mobile'
var _ = require('lodash');



class Tr extends React.Component{

	render(){
		var productInfo=this.props.productInfo
		return (
				<tr key={productInfo.productId+this.props.num}>
					<td>
					<div className="productInfo">
						<img src={productInfo.picUrl} />
						<span className="productName">{productInfo.productName}</span>
					</div>
					</td>
					<td>
						<p className="marketPrice">￥{productInfo.marketPrice}</p>
						<p className="price">￥{productInfo.price}</p>
					</td>
					<td>
						{/*<Stepper
			              style={{ width: '100%', minWidth: '100px' }}
			              showNumber
			              min={1}
			              value={this.props.num}
			              onChange={this.onChange}
			            />*/}
			            <div className="numchange">
			            	<button onClick={console.log("decrea")}>-</button>
			            	<span>{this.props.num}</span>
			            	<button onClick={console.log("add")}>+</button>
			            </div>

					</td>
					<td>￥{parseInt(productInfo.price*this.props.num)}</td>
					<td onClick={console.log("del")}>删除</td>
				</tr>
			)
	}
}


class Cart extends React.Component{
	constructor(){
		super();
	}
	componentWillMount(){
		var that=this;
		this.props.pagetype("home")
		this.props.getRecommend();
		

	}
	componentWillUpdate(){

	}
	onChange(){

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
	addToView(pid,num){
		var {recommend,cartlistTr,updateCartListTr}=this.props

		for (var i = 0; i < recommend.length; i++) {
			if(recommend[i].productId==pid){
				// console.log(1)
				this.props.setCartlistTr([<Tr productInfo={recommend[i]} num={num}/>])
			}
		}
	}
	updateView(pid,num,index){
		console.log("updateView")
		var {recommend,cartlistTr,updateCartListTr}=this.props

		for (var i = 0; i < recommend.length; i++) {
			if(recommend[i].productId==pid){
				// console.log(1)
				updateCartListTr(index,<Tr productInfo={recommend[i]} num={num}/>)
					// this.render();
			}
		}

	}
	delProduct(id){
		var productStorage= localStorage.getItem("product")
		var productArr=JSON.parse(productStorage)
		var index=_.findIndex(productArr, {pid:id});
		productArr.splice(index,1);
		localStorage.setItem("product",JSON.stringify(productArr))
		this.props.delCartListTr(index);
	}
	addToCart(e){
		var {recommend,cartlistTr,updateCartListTr}=this.props

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
				console.log(productArr[index].num)
				this.updateView(pid,productArr[index].num,index)
				// console.log(this.refs.tbody.children[index+1].props)
			} else {//无重复值，新商品
				productArr.push(newproduct)//添加到数组中
				this.addToView(pid,1)
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
			// console.log(productArr)
		} else {//Storage不存在 第一个商品 初始化数组
			var productArr=[];
			productArr.push({
				pid:pid,
				num:1
			})
			this.addToView(pid,1)

		}
				
		// 加到localStorage中
		localStorage.setItem("product",JSON.stringify(productArr))

		// 向页面中添加商品信息
		// var recommend=this.props.recommend		
		
		

	}

	render(){
		var productStorage= localStorage.getItem("product")
		var {recommend,cartlistTr}=this.props
		// console.log(cartlistTr)
		var cartlist=null;
		if (productStorage.length>0) {//如果购物车里有商品
			cartlist=<table>
				<tbody ref="tbody">
					<tr>
						<th>商品信息</th>
						<th>价格</th>
						<th>数量</th>
						<th>小计</th>
						<th>操作</th>
					</tr>
					{cartlistTr}
				</tbody>
			</table>
		} else {//购物车空
			cartlist=<div className="cart-empty">购物车空空的，赶紧去购物吧...</div>
		}
		// var recommend=this.props.recommend

		// console.log(recommend,this.props)
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
	setCartlistTr(cartlistTr){
		return {
			type:"setCartlistTr",
			payload:cartlistTr
		}
	},
	updateCartListTr(index,cartlistTr){
		return {
			type:"updateTr",
			payload:{index,cartlistTr}
		}
	},
	delCartListTr(index){
		return {
			type:"deleteTr",
			payload:index
		}
	}
}
const state=(state)=>{
	return{
		recommend:state.cartReducer.recommend,
		cartlistTr:state.cartReducer.cartlistTr
	}
}
export default connect(state,action)(Cart)