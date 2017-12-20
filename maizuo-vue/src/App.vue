<template>
  <div id="app">
    <myheader v-model="title">
      <span @click="showside" class="menu iconfont icon-category"></span>
      
    </myheader>
    <sidebar v-model="isshow"></sidebar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>

import myheader from "./components/header.vue"
import sidebar from "./components/sidebar.vue"
export default {
  name: 'app',
  data(){
    return {
      isshow:false,
      title:"卖座电影"
    }
  },
  props:["value"],
  methods:{
    showside(){
      this.isshow=!this.isshow;
    }
  },
  components:{
    myheader,sidebar
  },
  mounted(){
    // this.$root.bus.$on("moviesname", function (t) {     
    //     this.title = t;
    //     console.log(this.title)
    // })
    // this.$on("moviesname",function (t) {
    //   console.log(t)
    //   this.title = t;
    // })
  }
}
</script>
<style type="text/css" src="../src/assets/iconfont/iconfont.css"></style>
<style type="text/css" src="../src/assets/css/animate.css"></style>
<style lang="scss" >
html,body{
  width:100%;
  height:100% ;
  background:#f9f9f9;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    flex-direction: column;
    height: 100%;
    position: relative;
    background:#ebebeb;
}
section{
  padding-top:1rem;
}
.menu{
  font-size: 20px;
    margin: 0 .6rem 0 .32rem;
    color: #999;
}
</style>
