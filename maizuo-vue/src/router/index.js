import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/home.vue"
import Cinema from "../components/cinema.vue"
import Movies from "../components/movies.vue"
import Nowplaying from "../components/nowplaying.vue"
import Comingsoon from "../components/comingsoon.vue"
import MoviesDetail from "../components/moviesdetail.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:Home
    },
    {
    	path:"/home",
    	component:Home
    },
    {
    	path:"/cinema",
    	component:Cinema

    },
    {
    	path:"/movies",
    	component:Movies,
        children:[
        {
            path:"nowplaying",
            component:Nowplaying
        },
        {
            path:"comingsoon",
            component:Comingsoon
        },

        {
            path:"/",
            redirect:"/movies/nowplaying"
        }
        ]
    },
    // 第一种路由定义方式 对应/movies/detail?id=
    {
        path:"/movies/detail",
        component:MoviesDetail
    },

    // 第二种路由定义方式 对应/movies/detail/id
    // {
    //     path:"/movies/detail/:movieid",//moviesid 只需在此处定义 在详情页获得的地址栏参数名即为movieid
    //     component:MoviesDetail
    // },
    {
    	path:"*",
    	redirect:"/home"
    }
  ]
})
