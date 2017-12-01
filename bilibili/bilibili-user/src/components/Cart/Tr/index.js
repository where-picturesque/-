import React from "react"
import axios from "axios"
import "./index.scss"
import {connect} from "react-redux"
import {Stepper } from 'antd-mobile'
var _ = require('lodash');



class Tr extends React.Component{
	delProduct(id){
		var productStorage= localStorage.getItem("product")		
		var productArr=JSON.parse(productStorage)
		var index=_.findIndex(productArr, {pid:id})
		productArr.splice(index,1)//删除该商品对象，再存到localStorage中
		localStorage.setItem("product",JSON.stringify(productArr))
		this.props.addTr(productArr)//改变store的值

	}
	addNum(id,num){
		var productStorage= localStorage.getItem("product")		
		var productArr=JSON.parse(productStorage)
		var index=_.findIndex(productArr, {pid:id})
		productArr[index].num++
		localStorage.setItem("product",JSON.stringify(productArr))
		this.props.addTr(productArr)//改变store的值
	}
	cutNum(id){
		var productStorage= localStorage.getItem("product")		
		var productArr=JSON.parse(productStorage)
		var index=_.findIndex(productArr, {pid:id})
		if (productArr[index].num==1) {
			return ;
		} else {
			productArr[index].num--
		}
		
		localStorage.setItem("product",JSON.stringify(productArr))
		this.props.addTr(productArr)//改变store的值
	}
	render(){
		var {productInfo,num}=this.props 	
		return (
				<tr key={productInfo.productId}>
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
			              onChange={this.props.changeNum}
			            />*/}
			            <div className="numchange">
			            	<button onClick={this.cutNum.bind(this,productInfo.productId,num)}>-</button>
			            	<span>{num}</span>
			            	<button onClick={this.addNum.bind(this,productInfo.productId,num)}>+</button>
			            </div>

					</td>
					<td>￥{parseInt(productInfo.price*num)}</td>
					<td onClick={this.delProduct.bind(this,productInfo.productId)}>删除</td>
				</tr>
			)
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
export default connect(state,action)(Tr)