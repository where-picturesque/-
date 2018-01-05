import React from "react"
import {connect} from "react-redux"
class Counter extends React.Component{
	constructor(){
		super();
		
	}
	addodd(){
		if(this.props.value%2==0){
			this.props.onIncrease();
		}
	}
	render(){
		console.log('render')
		let{state,onIncrease,onDecrease}=this.props;
		console.log(state)
		return (
			<div className="counter">
				count:{this.props.state.count}
				<p></p>
				<button onClick={onIncrease}>+</button>
				<button onClick={onDecrease}>-</button>
			</div>
			)
	}
}

export default Counter;