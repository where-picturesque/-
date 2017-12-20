<template>
  <div id="main">
    <swipe class="my-swipe" v-if="!recs">
      <swipe-item class="slide" v-for="data in bannerlist">
        <img :src="data.imageUrl" alt="">
      </swipe-item>     
    </swipe>  
    <div class="block clear"v-if="!recs" >
      <ul>
        <li v-for="data in grids" @click="column(data.url)">
          <div class="desc">
            <p class="title">{{data.title}}</p>
            <p class="text">{{data.text}}</p>
          </div>
          <img :src="data.imageUrl" alt="" >
          <!-- https://quan.lukou.com/api/column?id=6 -->
        </li>
      </ul>
    </div>
    <div id="swipe" v-if="recs && recs.length>0" class="swiper-container">
      <ul id="swipeul" class="swiper-wrapper">
        <li class="swipeItem swiper-slide" v-for="data,index in recs" v-swipe="[index,recs.length,1.5]" @click="column(data.url)">
          <img :src="data.imageUrl" alt="">
        </li>
      </ul>
    </div>  
    
    <div class="select" v-if="selectlist">
        <div class="select-title">
          <span class="line"></span>
          <span class="text">潮流精选</span>
          <span class="line"></span>
        </div>
        <ul class="selectUl clear">
          <li v-for="data in selectlist" key="data.id" @click="category(data.url)">
            <img :src="data.imageUrl" alt="">
            <p class="categoryName">{{data.title}}</p>
          </li>
        </ul>
      </div>
    <div class="update">
      <div class="update-title">
        <span class="line"></span>
        <span class="text">每天早8点晚8点半更新</span>
        <span class="line"></span>
      </div>
      <div class="update-c">
        <ul class="clear" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="false" >
          <li v-for="data in updatelist" key="data.id" @click="detail(data)">
            <img :src="data.image" alt="" class="good-img"  v-if="data.title">
            <img :src="data.image" alt="" class="allimage" v-else>
            <div class="info" v-if="data.title">
              <div class="info-t">
                
                <p class="info-title">
                  <img src="../assets/images/taobao.98caa5a.png" height="36" width="36" alt="" v-if="data.platform==1" class="platform">
                <img src="../assets/images/tmall.78fc8a6.png" height="36" width="36" alt="" v-if="data.platform==2" class="platform">
                <img src="../assets/images/baoyou.20f74bf.png" height="47" width="92" alt="" v-if="data.isFreePostage" class="poster">{{data.title}}</p>
              </div>              
              <p class="keywords" v-if="data.keywords[0]">{{data.keywords[0]}}</p>
              <div class="info-bottom">
                <span class="price">￥<i class="price-text">{{data.price}}</i></span>
                <del class="originPrice">￥{{data.originPrice}}</del>
                <span class="couponValue" v-if="data.hasCoupon">{{data.couponValue}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="notice" v-if="updatelist.length>0">{{notice}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { Swipe, SwipeItem } from 'vue-swipe';
import { Indicator } from 'mint-ui';   
import router from "@/router"
export default {
  data () {
    return {
      bannerlist:[],
      grids:[],
      updatelist:[],
      selectlist:null,
      recs:null,
      canload:true,
      isEnd:"",
      nextIndex:30,
      loading:false,
      notice:"",
      type:"noback"
    }
  },
   components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem
  },
  watch:{
    $route(){
      // console.log("change")
      this.$store.commit("type",this.type)
      this.bannerlist=[];
      this.recs=null;
      this.selectlist=null;
      this.updatelist=[];
      this.selectlist=[];
      Indicator.open({
        spinnerType: 'triple-bounce'
      });
      console.log(this.$route.path)
      var url=null;
      if (this.$route.path=="/home") {
        url=`/api/tab/1?start=0`
      } else {
        url=`/api${this.$route.path}`
      }
   axios(url,{
      params:{
        start:0
      }
    }).then(res=>{
      Indicator.close();
      console.log(res.data.data)
      this.recs=res.data.data.recs;
      this.bannerlist=res.data.data.banners;
      this.grids=res.data.data.grids;
      var swipe=document.getElementById("swipe");
      var swipeul=document.getElementById("swipeul")

      // swipeul.style.width=res.data.data.recs.length*4.755 +"rem";
      this.selectlist=res.data.data.categories;
      this.updatelist=res.data.data.items.list;
      this.nextIndex=res.data.data.items.nextIndex

    })
    }
  },
  mounted(){
    this.$store.commit("type",this.type)
    this.$store.commit("detail",false)
    Indicator.open({
      spinnerType: 'triple-bounce'
    });
    var url=null;
      if (this.$route.path=="/home") {
        url=`/api/tab/1?start=0`
      } else {
        url=`/api${this.$route.path}`
      }
    axios(url).then(res=>{
      console.log(res.data.data)
      Indicator.close();
      this.bannerlist=res.data.data.banners;
      this.recs=res.data.data.recs;
      this.grids=res.data.data.grids;
      this.updatelist=res.data.data.items.list
      this.nextIndex=res.data.data.items.nextIndex
      this.notice="正在加载，请稍后..."
      // console.log(this.updatelist)
    })
  },
  methods:{
    column(url){//https://quan.lukou.com/api/column/6
      // youxuan://column?id=6
      var exp=url.match(/\/\/\w*/g)
      var route=exp[0].slice(2)
      // console.log(route)
      var reg=url.match(/\d+$/)
      // console.log(reg[0])
      this.$router.push(`/${route}/${reg[0]}`)

    },
    category(url){
      var exp=url.match(/category/)
      var route=exp[0];
      var reg=url.match(/\d+$/)
      console.log(exp)
      this.$router.push(`/category/${reg[0]}`)
    },
    detail(data){
      // console.log(data.type)
      if (data.type==1) {
        this.$router.push(`/detail/${data.id}`)
      } else {
        var url=data.url;
        var exp=url.match(/\/\/\w*/g)
        var route=exp[0].slice(2)
        var reg=url.match(/\d+$/)
        // console.log(route)
        this.$router.push(`/${route}/${reg[0]}`)
      }
    },
    loadMore() {
      console.log(1)  
      if(this.isEnd==true){
        this.notice="暂无数据...";
        this.loading=true;//停止无限加载
        return ;
      }
      if (this.canload) {
        this.canload=false;
        var url=null;
        console.log("canload")
        if (this.$route.path=="/home") {
          url=`/api/tab/1?start=0`
        } else {
          url=`/api${this.$route.path}`
        }
        axios(url,{
          params:{
            start:this.nextIndex
          }
        }).then(res=>{
            // console.log(res.data.data.items.list)
            
            this.nextIndex=res.data.data.items.nextIndex;
            this.isEnd=res.data.data.items.isEnd;
            this.updatelist=[...this.updatelist,...res.data.data.items.list]
            // console.log(this.updatelist)
            this.canload=true;

          })
      }
      
      
    }
  }
}
</script>
<style src="../../node_modules/vue-swipe/dist/vue-swipe.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
#main{
    padding-top:.2rem;
}
.my-swipe {
  height: 2.96rem;

  .slide{
    img{
    width: 100%;
  }
  }
  
}
#swipe {
    height: 1.65rem;
   padding:.225rem 0rem .225rem .225rem;

  .swipeItem{
    
    height:1.84rem;
    // margin-right:.3rem;
    float:left;
    img{
     height:1.65rem;
     border-radius:.15rem;
    }
  }
  
}
.block{
  ul li{
    float: left;
    width:3.34rem;
    padding:.2rem;
    background:#fff;
    border-right:1px solid #d9d9d9;
    border-bottom:1px solid #d9d9d9;
    .desc{
      width:1.9rem;
      float:left;
      .title{
        font:16px/28px "";
          margin-top: .3rem;
      }
      .text{
        font:12px/18px "";
      }
    }
    img{
      width:1.4rem;
      height:1.4rem;
      float:right;
    }
  }
  li:first-child .title{
    color:#fa485f;
  }
  li:nth-child(2n){
    border-right:0px;
    .title{
    color:#eb913a;

    }
  }
  li:nth-child(3),li:nth-child(4){
    border-bottom:0px;
    .title{
      color:#ea5fb9;      
    }
  }
  li:nth-child(3) .title{
    color:#26acea;
  }

}
.select{
  background:#fff;
}
.select-title{
    height:.8rem;
    text-align:center;
    vertical-align:middle;
    line-height:.8rem;
    .line{
        height: 1px;
        background-color: #fdde4a;
        width: 12%;
        display: inline-block;
        margin-bottom: 3px;
    }
    .text:after,.text:before{
      content: "";
      width: 0;
      height: 0;
      border: 3px solid #fdde4a;
      transform: rotate(45deg);
      display: inline-block;
      box-sizing: border-box;
      margin-top: -3px;
    }
    .text:after{
      margin-left:.4rem;
    }
    .text:before{
      margin-right:.4rem;
    }
  }
  .selectUl{
    li{
      float:left;
      width:1.875rem;
      margin-bottom:.32rem;
      img{
        display:block;
        width:.96rem;
        margin:0 auto;

      }
      .categoryName{
        text-align:center;
        margin-top:.12rem;
      }
    }
  }
.update{
  .update-title{
    height:.8rem;
    text-align:center;
    vertical-align:middle;
    line-height:.8rem;
    .line{
        height: 1px;
        background-color: #fdde4a;
        width: 12%;
        display: inline-block;
        margin-bottom: 3px;
    }
    .text:after,.text:before{
      content: "";
      width: 0;
      height: 0;
      border: 3px solid #fdde4a;
      transform: rotate(45deg);
      display: inline-block;
      box-sizing: border-box;
      margin-top: -3px;
    }
    .text:after{
      margin-left:.4rem;
    }
    .text:before{
      margin-right:.4rem;
    }
  }
  .update-c{
    overflow:hidden;
    background:#f5f5f5;
    ul{
      width:120%;
        li{
          width:3.675rem;
          height:5.775rem;
          float:left;
          margin-right:.15rem;
          margin-bottom:.15rem;
          background:#fff;

          .good-img{
            width:100%;
            height:3.675rem;
          }
          .allimage{
            width:100%;
            height:5.775rem;
          }
          .info{
            margin:.2rem .12rem;
            height:1.76rem;
            position:relative;
          }
          .info-t{
            display:flex;
            color: #877a73;
            font-size: 12px;
            height:.66rem;
            overflow:hidden;
          }
          .platform{
            width:.26rem;
            height:.26rem;
          }
          .poster{
            width:.6rem;
            height:.28rem;
          }
          .keywords{
            color: #fa585a;
            padding: 0 .1rem;
            display: inline-block;
            border: 1px solid #fa585a;
            border-radius: .08rem;
            margin: .107rem .16rem 0 0;
          }
          .info-bottom{
            position:absolute;
            bottom:.1rem;
            width:100%;
          }
          .price{
            color: #fa585a;
            font-weight: 700;
            margin-right: .2rem;
            .price-text{              
              font-size: 20px;             
            }
          }
          .originPrice{
            text-decoration:line-through
          }
          .couponValue{
            float:right;
            color: #fa585a;
            display: inline-block;
            background: url("../assets/images/coupon-bg.26d715c.png");
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: 100% 100%;
            text-align: center;
            padding: .012rem .1rem 0;
            margin-right:.24rem;
          }
          
        }
    }
  }
}
.notice{
  text-align:center;
  line-height:.4rem;
  font-size:14px;
}
</style>
