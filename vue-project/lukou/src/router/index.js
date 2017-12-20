import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Category from '../components/category.vue'
import Column from '../components/column.vue'
import Detail from "../components/detail.vue"
import Article from "@/components/article.vue"
import Search from "@/components/search.vue"
import SearchResult from "@/components/searchresult.vue"
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path:"/tab/:tabid",
      component:Home
    },
    {
      path:"/column/:columnid",
      component:Column,
      name:"column"
    },
    {
      path:"/category/:columnid",
      component:Column,
      name:"category"
    },    
    {
      path:"/article/:articleid",
      component:Article
    },
    {
      path:"/detail/:detailid",
      component:Detail
    },
    {
      path:"/search",
      component:Search
    },
    {
        path:"/sresult/:searchword",
        component:SearchResult
      },
    {
    	path:"*",
    	redirect:"/home"
    }
  ]
})
