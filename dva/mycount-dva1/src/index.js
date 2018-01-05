import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import { useRouterHistory ,browserHistory } from 'dva/router';
import { createHashHistory } from 'history';

// 1. Initialize
const app = dva({
	// history: useRouterHistory(createHashHistory)({ queryKey: false }),//history去除k参数
	history: browserHistory,  //browserhistory
	// onError (error) {
 //    	message.error(error.message)
	// }
});

// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
// app.model(require('./models/example'));

app.model(require("./models/count"));

app.model(require("./models/user"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
