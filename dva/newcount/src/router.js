import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import User from "./routes/user/user"
import App from "./routes/App/app"
function RouterConfig({ history }) {
  return (
    <Router history={history}>
    <App>
      <Switch>
        <Route path="/" exact   component={IndexPage} />
        <Route path="/user"  component={User}/>

      </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
