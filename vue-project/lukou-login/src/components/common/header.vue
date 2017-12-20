<template>
    <header  v-if="isDetail==false||'search'">
      <div class="header-box" v-if="isDetail==false">
        <div class="top-search" id="search" v-scroll>
           <router-link to="/search" tag="p" class="search"><i class="iconfont icon-search"></i>搜索商品，发现更多优选</router-link>
         </div>
        <nav>
          <div class="birefcategory clear" v-if="showbiref">
            <router-link to="/home" tag="p" v-show="getType=='noback'?true:false" class="recommend" style="display:none;" activeClass="active">今日推荐</router-link>
            <div class="back" @click="back" v-show="getType=='canback'?true:false" >
              <i class="iconfont icon-back"></i>
              <span class="back-text">返回</span>
            </div>
            <p class="line"></p>
            <div class="category swiper-container">
              <ul class="clear swiper-wrapper">
                <!-- <li v-for="data,index in category.slice(1)"  v-swipe="[index,category.slice(1).length]" activeClass="active" @click="tocategory(data.id)">{{data.name}}</li> -->
              <router-link v-for="data,index in category.slice(1)" activeClass="active" tag="li"  :to="'/tab/'+data.id" v-swipe="[index,category.slice(1).length,4.5]">{{data.name}}</router-link>
            </ul>
            </div>
            
            <svg  class="icon more" aria-hidden="true" @click="showCategory" >
               <use xlink:href="#icon-category"></use>
            </svg >
          </div>
          <div class="detailCategory"  v-else>
            <p class="detail-text">全部分类</p>
            <i class="iconfont icon-close" @click="showCategory"></i>
          </div>
        </nav>
        <div class="category-box " v-if="showbiref==false? true :false">
          <ul class="clear">
            <!-- <router-link v-for="data in category" tag="li" :to="'/tab/'+data.id" @click="tocategory(data.id)">
              <img :src="data.imageUrl" alt="">
              <p class="category-name">{{data.name}}</p>
            </router-link> -->
            <li to="/home"  class="recommend" activeClass="birefactive" @click="tohome">
              <img :src="category[0].imageUrl" alt="">
              <p class="category-name">{{category[0].name}}</p>
            </li>
            <li v-for="data in category.slice(1)"  @click="tocategory(data.id)" activeClass="birefactive">
              <img :src="data.imageUrl" alt="">
              <p class="category-name">{{data.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-header clear" v-if="isDetail=='search'">
        <div class="search-tbox clear">
          <p class="back" @click="back">返回</p>
          <form action="">
            <input type="text" placeholder="热搜商品，发现更多精选" :value="keyword" @focus="focusInp" @blur="blurInp" id="Input">
            <i class="iconfont icon-search"></i>
            <i class="iconfont icon-close" v-if="closeinp" @click="clearwords"></i>
          </form>
          <p class="search-btn" id="search-btn" @click="tosearch">搜索</p>
        </div>
      </div>
    </header>
  
</template>

<script>
import "../../assets/iconfont/iconfont.js"
import axios from "axios"
import router from "@/router"
var more=document.querySelector(".more");

export default {
  data () {
    return {
      category:[],
      showbiref:true,
      closeinp:false
    }
  },
  mounted(){

    axios("/api/tabs").then(res=>{
      // console.log(res.data.data);
      this.category=res.data.data.list;
    })
  },
  methods:{
    tohome(){
      this.showbiref=!this.showbiref;
      this.$router.push("/home")
    },
    tocategory(id){
      this.showbiref=true;
      console.log(this.showbiref)
      this.$router.push(`/tab/${id}`)
    },
    showCategory() {
      this.showbiref=!this.showbiref;
      },
    back(){
      this.$router.go(-1);
    },
    focusInp(){
      this.closeinp=true;
    },
    blurInp(){
      this.closeinp=false;
    },
    tosearch(){
      var inputvalue=document.getElementById("Input");
      var value=inputvalue.value;
      this.$store.commit("keyword",value)
      this.$router.push(`/sresult/${value}`)
    },
    clearwords(){
      var inputvalue=document.getElementById("Input");
      inputvalue.value=""
    }
    
  },
  computed:{

    isDetail(){
      console.log(this.$store.state.isdetail)
      return this.$store.state.isdetail;
    },
    getType(){
      console.log(this.$store.state.type)
      return this.$store.state.type;
    },
    keyword(){
      return this.$store.state.keyword
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.icon {
   width: .5rem; height: .5rem;
   display:inline-block;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.more{
  margin-top:.2rem;
  font-weight:700;
  float:right;
  color:#222;
}
header{
  width:100%;
  background:#fdde4a;
  position:fixed;
  top:0;
  left:0;
  z-index:5;
}
.top-search{
  height:.6rem;
  padding-top:.2rem;
  .search{
    width:6.4rem;
    height:.6rem;
    margin:0 auto ;background:#fff;
    border-radius:.3rem;
    padding-left:.3rem;
    font:14px/30px "";
    color:#877a73;
    .icon-search{
      margin-right:.04rem;
    }
  }
}
nav{
  font-size:15px;
  color:#333;
  padding:0 .4rem 0 .33rem;
  .recommend{
    float:left;
    color: #333;
    line-height: .9rem;
  }
  .back{
    float:left;
    color: #877a73;
    line-height: .9rem;
    vertical-align:middle;
    font-size:15px;
    .icon-back{
      font:700 24px/.9rem "";
      vertical-align:middle;
      color:#222;
    }
  }
  .line{
    width: 1px;
    height: .4rem;
    margin: .24rem .1rem .35rem .08rem;
    background-color: #877a73;
    display: inline-block;
    float: left;
  }
  .active{
    color: #43240c;
    border-bottom: 4px solid #43240c;
  }
  .category,.swiper-container{
    width:4.6rem;   
    height:1rem;
    overflow:hidden;
    float:left;
    margin-right:.2rem;
  }
  ul{
    height:1rem;
    display:inline-block;
    width:12rem;
  }
  ul li{
    float:left;
    line-height: .9rem;
    color: #333;
    margin-right:.3rem;
  }
}
.hidden{
  display:none;
}
.category-box{
  background:#fff;
  ul li{
    width:1.875rem;
    margin-bottom:.32rem;
    float:left;
    img{
      width:.96rem;
      height:.96rem;
      display:block;
      margin: 0 auto;
    }
    .category-name{
      text-align:center;
    }
  }
}
.detailCategory{
  position:relative;
  color:#877a73;
  .detail-text{
    text-align:center;
    font:14px/40px "";
  }
  .icon-close{
    position:absolute;
    right:.2rem;
    bottom:0.2rem;
    font-size:18px;
  }
  .birefactive{
    color:#f3595e;
  }
}
 
.search-header{
  color:#877a73;
  font:15px/50px "";
  .back{    
    float:left;
    margin-left:.4rem;
  }
  form{
    float:left;
    position:relative;
    width:5.2rem;
    line-height:44px;
    input{
      width:4.6rem;
      height:.6rem;
      background:#eee;
      border-radius:6px;
      margin:0 .16rem 0;
      padding-left:.6rem;
      outline:none;
      font-size:14px;
    }
    .icon-search{
      position:absolute;
      left:.4rem;
      top:.05rem;
      color:#877a73;

    }
    .icon-close{
      position:absolute;
      right:0rem;
      top:.05rem;
      color:#877a73;

    }
  }
  .search-btn{
    float:right;
    margin-right:.225rem;
  }
 }
</style>
