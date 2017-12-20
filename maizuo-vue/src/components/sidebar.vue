<template>
  <transition name="sidebar" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" >
    <div class="sidebar" v-show="value">
      <ul class="sidebar-ul" @click="changepage" >
        <router-link to="/home" tag="li">首页</router-link>
        <router-link to="/movies" tag="li">影片</router-link>
        <router-link to="/cinema" tag="li">影院</router-link>
        <router-link to="/market" tag="li">商城</router-link>
        <router-link to="/my" tag="li">我的</router-link>
        <router-link to="/card" tag="li">卖座卡</router-link>
      </ul>
    </div>
  </transition>

</template>

<script>
export default {
  props:["value"],
  methods:{
    changepage(){
      this.$emit("input",false);
    }
  }
}
</script>

<style  lang="scss" scoped >
.sidebar {
    height: 100%;
    width: 5rem;
    background: #282828;
    position: fixed;
    z-index: 5;
    left: 0rem;
    top:1rem;
    height: 100%;
    border-top: .01rem solid #222;
    box-shadow: 0 .01rem .01rem #363636 inset;
}
.sidebar-ul{
  height:100%;
  li{
    line-height: 1rem;
    color: #9a9a9a;
    font-size: 14px;
      padding: 0 .32rem;
      border-bottom: .01rem dotted #333;
      text-align: left;
      a{
        color: #9a9a9a;
        display: block;
        /*padding: 0 .16rem;*/
        line-height: 1rem;
      }
      .i-sidebar{
        float: right;
        color: #666;
          font-size: .14px;
      }
  }
}


</style>
