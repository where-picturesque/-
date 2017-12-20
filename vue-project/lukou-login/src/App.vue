<template>
  <div id="app">
    <myheader></myheader>    
    <section>
      <router-view></router-view>
    </section>
    <div class="totop" @click="totop">
      <img src="./assets/images/top.02912be.png" class="totop-img" alt="">
    </div>
  </div>
</template>

<script>
import myheader from "./components/common/header.vue"
export default {
  name: 'app',
  components:{
    myheader
  },
  computed:{

    isDetail(){
      console.log(this.$store.state.isdetail)
      return this.$store.state.isdetail;
    }
  },
  methods:{
    totop(){
      // console.log(document.documentElement.scrollTop)
      var timer=setInterval(function () {
        document.documentElement.scrollTop-=500
          if(document.documentElement.scrollTop<=0){
          document.documentElement.scrollTop=0
          console.log('stop')
          clearInterval(timer)
        }
      },50)
      
    }
  }
}
// var section=document.getElementsByTagName("section")[0];
// var search=document.getElementById("search")

// window.onscroll=function () {
//   // console.log(document.documentElement.scrollTop)
//   var scrolltop=document.documentElement.scrollTop

//   // if(scrolltop<90){
//   //   search.style.display = "none"
//   //   console.log(search.style.display)
//   // }
// }
</script>
<style src="./assets/css/public.css"></style>
<style src="./assets/iconfont/iconfont.css"></style>
<style src="./assets/css/swiper.min.css"></style>
<style>
html,body{
  width:100%;
  height:100%;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*height: 100%;*/
  position: relative;
  overflow:hidden;
}
section{
  margin-top:1.8rem;
    background:#f5f5f5;
}
.totop{
  position:fixed;
  right:.2rem;
  bottom:1.5rem;
  z-index: 10;
  width:.96rem;
  height:.96rem;
  
}
.totop-img{
    width:.96rem;
  }
</style>
