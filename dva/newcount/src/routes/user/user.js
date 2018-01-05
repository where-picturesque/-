import React from 'react';
import { connect } from 'dva';
import styles from "./user.css"
import {Table,Spin} from 'antd'
import queryString from "query-string"
class User extends React.Component{
  constructor(){
    super();
  }
  componentWillMount() {
    console.log("mount",this.props.location.search);
    const query=queryString.parse(this.props.location.search)
    this.props.dispatch({
      type:"users/getData",
      payload:{
        ...query
      }
    })
  }
  render(){
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
  const  loading1 =  this.props.loading.effects['users/getData'] 
  // console.log(loading1)
  let{dataList}=this.props.users
  let{loading}=this.props.loading
  console.log(loading1)
    return (
      <div className="user">
       <Spin spinning={loading1}>
          <h3 className={styles.red}>这是表格</h3>
        {/* <Table columns={columns} loading={false} ></Table> */}
        </Spin>
      </div>
    )
  }
}

User.propTypes = {
};
const mapStateToProps=(state)=>{
  let{users,loading}=state;
  console.log(loading)
  return{
    users,loading
  }
}
export default connect(mapStateToProps)(User);
