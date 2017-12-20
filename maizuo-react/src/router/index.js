import React from "react"
import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch
}from "react-router-dom"

import App from "../components/App"
import Home from "../components/Home"
import Film from "../components/Film"
import My from "../components/My"
import Nowplaying from "../components/Film/Nowplaying"
import Comingsoon from "../components/Film/Comingsoon"
import Detail from "../components/Detail"

import {Provider}  from "react-redux";
import store from "../components/Redux/Store"

const router=(
	<Provider store={store}>
	<Router>
		<App>
		<Switch>
			<Route path="/home" component={Home}/>
			<Route path="/film" render={()=>
				<Film>
				<Switch>
					<Route path="/film/nowplaying" component={Nowplaying}/>
					<Route path="/film/comingsoon" component={Comingsoon}/>
					<Redirect from="*" to="/film/nowplaying"/>
				</Switch>
				</Film>
			}/>
			<Route path="/my" component={My}/>
			<Route path="/detail/:movieid" component={Detail}/>
			<Route path="/detail" component={Detail}/>
			<Redirect from="*" to="/home"/>
		</Switch>
		</App>
	</Router>
	</Provider>
	)	

	export default router