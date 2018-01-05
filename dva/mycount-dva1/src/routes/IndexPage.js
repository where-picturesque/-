import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {NavLink} from "react-router-dom"
import { Table, Icon, Divider, Pagination  } from 'antd';
import { routerRedux ,Link} from 'dva/router';//react-router
import queryString from 'query-string';
class IndexPage extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state={

    }
  }

  add(){
    console.log("触发add函数")
    this.props.dispatch({
      type:'count1/add'  //count1是model的namespace
    })
  }
  cut(){
    // console.log(this.props.dispatch)
    this.props.dispatch({
      type:'count1/cut'
    })
  }
  addasync(){
    this.props.dispatch({
      type:'count1/addasync'
    })
  }
  toUser(){
    this.props.history.push("/user")
  }
  loadData(){
    this.props.dispatch({
      type:'user/getData',
      payload:1
    })
  }
  pageChangeHandler(page) {
    // 方法1：subscriptions setup
    // this.props.history.push(`/?page=${page}`)

    // 方法2：
    // this.props.dispatch(routerRedux.push({
    //   pathname: '/',
    //   search: queryString.stringify({ page }),
    // }));

    // 方法3： 对应componentwillMount
    this.props.history.push(`/?page=${page}`)
    this.props.dispatch({
      type:'user/getData',
      payload:{
        page:page
      }
    })

  }
  componentWillMount(){
    // 代替models/user.js中的subscriptions setup
    // 初始化
    var query=queryString.parse(this.props.location.search);
    console.log("willmount:",query)

    this.props.dispatch({
      type:'user/getData',
      payload:{
        ...query
      }
    })
  }
  render(){
    // console.log(this.props)
    const{ count,list } = this.props.count1;
    let{dataList,page,total} =this.props.user
    let{loading}=this.props.loading.models
    // console.log(NavLink)//dva 1使用的是react-router3
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#">Action </a>
          <Divider type="vertical" />
          <a href="#">Delete</a>
          <Divider type="vertical" />
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];

    return (
      <div className={styles.normal}>
        <button onClick={this.toUser.bind(this)}>toUser</button>
        <br/>
        count:{count}
        <p></p>
        <button onClick={()=>{this.props.dispatch({type:'count1/add'})}}>+</button>
        <button onClick={this.cut.bind(this)}>-</button>
        <p></p>
        <button onClick={this.addasync.bind(this)}>模拟异步</button>
        <br/>
        <button onClick={this.loadData.bind(this)}>加载数据</button>
        <Table 
          columns={columns} 
          dataSource={dataList} 
          loading={this.props.loading.models.user}
          rowKey={record => record.id}
          pagination={false}>
        </Table>
        <Pagination className="ant-table-pagination"  total={total}  defaultPageSize={3} onChange={this.pageChangeHandler.bind(this)} current={parseInt(page)}/>
        <Link to="/list">Link</Link>

      </div>
    );
  }

}

IndexPage.propTypes = {};

const mapStateToProps=(state)=>{

  let {count1,user,loading}=state
  console.log(state.loading)
  return {
    count1,
    user,
    loading: loading
  }
}

export default connect(mapStateToProps)(IndexPage);
