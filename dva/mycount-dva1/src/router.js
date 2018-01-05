import React from 'react';
import { Router, Route,Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import List from "./routes/List/List.js"
import User from "./routes/User.js";

function RouterConfig({ history }) {
	console.log(history)
  return (
    <Router history={history}>
   		<Switch>//dva1中没有switch和NavLink  所以不用在外面包裹switch   dva2引用react-router4 router里面只能有一个元素 所以需要包裹div 或switch
	      <Route path="/" component={IndexPage} exact  />
	      <Route path="/user" component={User} />
	      <Route path="/list" component={List}/>
	      <Route path="*" component={User} />
    	</Switch>
    </Router>
  );
}

export default RouterConfig;
