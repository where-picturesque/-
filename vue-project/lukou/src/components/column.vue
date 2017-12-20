<template>
	<div class="main">
		<div class="banner" v-if="columndata">
			<img :src="columndata.cover" alt="">
			<p class="title">{{columndata.description}}</p>
		</div>
		<div class="main-c">
	      <ul class="clear" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
	        <li v-for="data in updatelist" key="data.id" @click="todetail(data.id)">
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
	      <div class="notice">{{notice}}</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import router from "@/router"
import { Indicator } from 'mint-ui';   

export default {

  name: 'column',

  data () {
    return {
    	columndata:null,
    	updatelist:[],
    	type:"canback",
      isEnd:false,
      nextIndex:0,
      loading:false,
      notice:""
    }
  },
  mounted(){
  	// console.log(this.$route)
    Indicator.open({
      spinnerType: 'triple-bounce'
    });
  	var that=this;
    this.$store.commit("detail",false)
  	this.$store.commit("type",this.type)
  	axios.all([axios(`/api${this.$route.path}`),axios(`/api${this.$route.path}/items?start=0`)]).then(axios.spread(function (column,items) {
  		console.log(column.data.data,items.data.data)
      Indicator.close();
      if (that.$route.name=="column") {
        that.columndata=column.data.data;
      }
      console.log(items.data.data.isEnd)
      that.isEnd=items.data.data.isEnd==false ?items.data.data.isEnd:items.data.data.items.isEnd;
      that.nextIndex=items.data.data.nextIndex?items.data.data.nextIndex:items.data.data.items.nextIndex;
      // console.log(that.nextIndex)
  		that.updatelist=items.data.data.list||items.data.data.items.list
  	}))
  },
  methods:{
    todetail(id){
      this.$router.push(`/detail/${id}`)
    },
    loadMore(){
      console.log("column到底",this.isEnd)
      Indicator.open({
        spinnerType: 'triple-bounce'
      });
      var that=this;
      if (this.isEnd==true) {
        this.loading=true;
        this.notice="没有商品了..."
        return ;
      }
      axios.all([axios(`/api${this.$route.path}`,{}),axios(`/api${this.$route.path}/items?start=${this.nextIndex}`)]).then(axios.spread(function (column,items) {
      // console.log(column.data.data,items.data.data)
      Indicator.close();
      if (that.$route.name=="column") {
        that.columndata=column.data.data;
      }

      that.isEnd=items.data.data.isEnd==false ?items.data.data.isEnd:items.data.data.items.isEnd;     
      that.nextIndex=items.data.data.nextIndex||items.data.data.items.nextIndex;
      if (items.data.data.list) {
        that.updatelist=[...that.updatelist,...items.data.data.list]
      } else {
        that.updatelist=[...that.updatelist,...items.data.data.items.list]
      }
      // that.updatelist=[...that.updatelist,...items.data.data.list]||[...that.updatelist,...items.data.data.items.list]
    }))
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
	width:100%;
	background:#fff;
	img{
		width:100%;
	}
	.title{
		color: #877a73;
		padding: .4rem .36rem .4rem .6rem;
		font:12px/20px "";
		position:relative;
	}
	.title:before{
		content: "";
		background: url("../assets/images/rect.4efd933.png") no-repeat 50%;
		background-size: 100% auto;
		width: .26rem;
		height: .26rem;
		display: inline-block;
		position: absolute;
		left: .2rem;
		top: .5rem;
	}
}

  .main-c{
    overflow:hidden;
    background:#f5f5f5;
    padding-top:.2rem;
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
.notice{
  text-align:center;
  line-height:.4rem;
  font-size:14px;
}
</style>