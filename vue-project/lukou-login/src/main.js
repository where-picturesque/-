// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import store from "./store/"
/* eslint-disable no-new */

Vue.directive("swipe",{
	inserted(el,binding){
		// console.log(binding.value[2])
		if(binding.value[0]==binding.value[1]-1){
			// console.log("yes")
			var mySwiper = new Swiper('.swiper-container',{
				slidesPerView: binding.value[2],
				spaceBetween: 30,
				freeMode : true
			})
		}
	}
})

Vue.directive("scroll",{
	inserted(el,binding){
		var pre=0
		window.onscroll=function () {
			var now=document.documentElement.scrollTop
			if (now-pre>0) {//向下滚
				// console.log('上')
				el.style.display = "none"
			} else {//向上滚
				// console.log("下")
				el.style.display = "block"

			}
			pre=now
		}
	}
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

document.documentElement.style.fontSize=document.documentElement.clientWidth/750*100+"px";
