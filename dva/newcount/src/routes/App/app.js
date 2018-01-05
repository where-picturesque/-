import React from 'react';
import { connect } from 'dva';
import {Router,Route,Switch} from "dva/router"
import queryString from "query-string"
import IndexPage from "../IndexPage"
import User from "../user/user"
class App extends React.Component{
  constructor(){
    super();
  }
  componentWillMount() {
    
  }
  render(){
    console.log('app render')
    return (
      <div className="app">
       这是APP
       <div className="section">
       {
           this.props.children
        }

        {/* 写了以下两句后，在router.js中不需要配置路由 ~~router.js中的配置 */}
        {/* <Route path="/" exact component={IndexPage} />
        <Route path="/user" component={User}/> */}
        </div>

      </div>
    )
  }
}

App.propTypes = {
};

// export default connect()(App);
export default App;//APP外面不能包裹connect不然路由变化不会引起组件变化
