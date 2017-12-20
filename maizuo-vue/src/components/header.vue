<template>
    <header>
      <div class="header-l">
        <slot></slot>
        <span id="title">{{gettitle}}</span>
        <!-- <slot name="title"></slot> -->
      </div>
      <div class="header-r">
        <p class="city">
          <span>杭州</span>
          <i class="iconfont icon-moreunfold"></i>
        </p>
          
          <i class="iconfont icon-account account"></i>
        
      </div>
    </header>

</template>
<script >
export default {
  data(){
    return{
      sidebar:true,
      title:"卖座电影"
    }
    
  },
  props:["value"],
  mounted(){
    // this.$root.bus.$on("moviesname", function (t) {     
    //     this.title = t;
    //     console.log(this.title)
    // })

  },
  computed:{
    gettitle(){
      console.log(this.$store.state.title)
      return this.title=this.$store.state.title
    }
  }
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    width:100%;
    height: 1rem;
    background: #282828;
    font-size: 14px;
    color: #fff;
    justify-content: space-between;
    line-height: 1rem;
    position: fixed;
    z-index: 10;
}

.header-l {
    color: #efefef;
    display: flex;;
}

.header-r {
  display: flex;
    color: #999;
    font-size: 14px;
    line-height: 1rem;
    margin-right:.3rem;
    .city{
      margin-right:.2rem;
      i{}
    }
}

</style>
