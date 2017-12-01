import React from "react"
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
}from "react-router-dom"
import store from "../components/Redux/Store"
import {Provider} from"react-redux"
import App from "../components/App"
import Home from "../components/Home"
import List from "../components/List"
import Detail from "../components/Detail"
import Silo from "../components/Silo"
import Cart from "../components/Cart/index2.js"
import Register from "../components/Register"
import Login from "../components/Login"
const router=(
	<Provider store={store} >
	<Router>
	<App>
		<Switch>
			<Route path="/home" component={Home}></Route>
			<Route path="/silo/:category" component={Silo}></Route>
			<Route path="/productlist/:categoryId" component={List}></Route>
			<Route path="/detail/:categoryId/:productId" component={Detail}></Route>
			<Route path="/cart" component={Cart}/>
			<Route path="/login" component={Login}/>
			<Route path="/register" component={Register}/>
			<Redirect from="*" to="/home"/>
		</Switch>
	</App>
	</Router>
	</Provider>
	)

export default router