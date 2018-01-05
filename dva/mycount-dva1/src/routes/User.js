import React from 'react';
import { connect } from 'dva';
import styles from './User.css';
import {NavLink} from "react-router-dom"
import {Link} from "dva/router"
function User({dispatch,count1}) {//function User(props)
	function add(){
    	console.log("触发add函数")
	    dispatch({
	      type:'count1/add'  //count1是model的namespace
	    })
	  }
	function  cut(){
	    // console.log(this.props.dispatch)
	    dispatch({
	      type:'count1/cut'
	    })
	  }
    function handlechange(){
      console.log(history
        )
    }
  return (
    <div className={styles.normal}>
    	userComponent

    	<br/>
    	count:{count1.count}
        <p></p>
        <button onClick={add}>+</button>
        <button onClick={cut}>-</button>
        <br/>
        <button onClick={handlechange}>to/user/2</button>
    </div>
  );
}

function mapStateToProps({count1}=state) {
  return {
  	count1
  };
}

export default connect(mapStateToProps)(User);
