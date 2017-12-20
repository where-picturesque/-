<template>
	<div id="main" >
		<div id="swipe" v-if="bannerlist.length>0" class="swiper-container">
      <ul id="swipeul" class="swiper-wrapper">
        <li class="swipeItem swiper-slide" v-for="data,index in bannerlist" v-swipe="[index,bannerlist.length]" @click="column(data.url)">
          <img :src="data.imageUrl" alt="">
        </li>
      </ul>
		</div>     
    	<div class="select">
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
        <span class="text">大家都在逛</span>
        <span class="line"></span>
      </div>
      <div class="update-c">
        <ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="false" class="clear">
          <li v-for="data in updatelist"  key="data.id">
            <img :src="data.image" alt="" class="good-img">
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
<style src="../../node_modules/vue-swipe/dist/vue-swipe.css"></style>

<script>
import { Swipe, SwipeItem } from 'vue-swipe';
import axios from "axios"
import { Indicator } from 'mint-ui';   

export default {


  data () {
    return {
    	bannerlist:[],
    	selectlist:[],
    	updatelist:[],
    	notice:"正在加载中，请稍候...",
    	isEnd:false,
    	nextIndex:30,
      type:"noback"

    }
  },
  watch:{
  	$route(){
  		// console.log("change")
      this.$store.commit("type",this.type)
      this.bannerlist=[];
      this.selectlist=[];
      this.updatelist=[];
  		Indicator.open({
	      spinnerType: 'triple-bounce'
	    });
  	 axios(`/api${this.$route.path}`,{
    		params:{
    			start:0
    		}
    	}).then(res=>{
        Indicator.close();
    		console.log(res.data.data)
    		this.bannerlist=res.data.data.recs
    		var swipe=document.getElementById("swipe");
  		  var swipeul=document.getElementById("swipeul")

    		console.log(res.data.data.recs.length)
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
  	console.log(this.$route.path) // /tab/2
  	axios(`/api${this.$route.path}`,{
  		params:{
  			start:0
  		}
  	}).then(res=>{
      Indicator.close();
  		console.log(res.data.data)
  		this.bannerlist=res.data.data.recs
  		// var swipe=document.getElementById("swipe");
		// var swipeul=document.getElementById("swipeul")

  		// swipeul.style.width=res.data.data.recs.length*4.755 +"rem";
  		this.selectlist=res.data.data.categories;
  		this.updatelist=res.data.data.items.list;
      	this.nextIndex=res.data.data.items.nextIndex

  	})
  },

   components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem
  },
  methods:{
  	loadMore() {
      console.log(1)  
      
    },
    column(url){//https://quan.lukou.com/api/column/6
      // youxuan://column?id=6
      var exp=url.match(/\/\/\w*/g)
      var route=exp[0].slice(2)
      // console.log(route)
      var reg=url.match(/\d+$/)
      // console.log(reg[0])
      this.$router.push(`/column/${reg[0]}`)

    },
    category(url){
      var exp=url.match(/category/)
      var route=exp[0];
      var reg=url.match(/\d+$/)
      console.log(exp)
      this.$router.push(`/category/${reg[0]}`)
    }
  }
}
</script>

<style lang="scss" scoped>
#main{
	background:#fff;
	margin-top:1.92rem;
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
</style>