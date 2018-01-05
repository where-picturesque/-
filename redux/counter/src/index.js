import React from "react"
import ReactDOM　from "react-dom"
import Counter from "./component/counter.js"
import store from "./Store"

const render=()=>ReactDOM.render(<Counter
 state={store.getState()} 
 onIncrease={()=>store.dispatch({type:"INCREASE",payload:1})}
 onDecrease={()=>{store.dispatch({type:"DECREASE"})}}>
 </Counter>,
 document.getElementById("app"));


 render();
 store.subscribe(render)

 
 
 