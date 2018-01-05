import dva from 'dva';
import './index.css';
import {browserHistory} from "dva/router"
import createBrowserHistory from 'history/createBrowserHistory'
import createLoading from 'dva-loading';
// 1. Initialize
const app = dva({
    history:createBrowserHistory()
});

// 2. Plugins
// app.use({});
app.use(createLoading({
    effects: true
  }))
// 3. Model
// app.model(require('./models/example'));
app.model(require("./models/indexpage"));

app.model(require("./models/users"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
