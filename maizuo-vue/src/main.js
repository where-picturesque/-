// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "../src/assets/css/public.css"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
import store from "./store"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

document.documentElement.style.fontSize=document.documentElement.clientWidth/750*100+"px";
