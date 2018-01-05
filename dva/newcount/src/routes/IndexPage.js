import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import {Table} from 'antd'
import {NavLink,Link} from "dva/router"
class IndexPage extends React.Component{
  constructor(){
    super();
    
  }
  componentWillMount() {
    // console.log(this.props);
  }
  add(){
    this.props.dispatch({
      type:"indexpage/add"
    })
  }
  cut(){
    this.props.dispatch({
      type:"indexpage/cut"
    })
  }
  asyncadd(){
    this.props.dispatch({
      type:"indexpage/asyncadd"
    })
  }
  render(){
    console.log(this.props)
    let{count}=this.props.indexpage

    return (
      <div className="indexpage">
        count:{count}
        <br/>
        <button onClick={this.add.bind(this)}>+</button>
        <button onClick={this.cut.bind(this)}>-</button>
        <br/>
        <button onClick={this.asyncadd.bind(this)}>异步</button>
        <br/>
        <Link to="/user" >toUser</Link>
      </div>
    )
  }
}

IndexPage.propTypes = {
};

const mapPropsToState=(state)=>{
    console.log(state.indexpage)
    let {indexpage}=state
  return{
    indexpage
  }
}
export default connect(mapPropsToState)(IndexPage);
