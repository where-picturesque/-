<template>
	<div class="sresult-main">
		<div class="sresult-t">
			<ul class="sresult-t-Ul" @click="switchsort">
				<li sort="0" class="active">默认</li>
				<!-- https://quan.lukou.com/api/search?word=%E5%8D%AB%E8%A1%A3+%E5%A5%B3&start=0&sort=2 -->
				<li sort="1">价格最低</li>
				<li sort="2">销量最高</li>
			</ul>
		</div>
		<div class="sresult-content">
			<ul>
				<li v-for="data in datalist" :key="data.id">
					<img :src="data.image" alt="" class="good-img" >
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
		</div>
	</div>
</template>

<script>
import { Indicator } from 'mint-ui';   
import axios from "axios"
export default {

  name: 'searchresult',

  data () {
    return {
    	datalist:[]
    }
  },
  mounted(){
  	// console.log(this.$route.params.searchword)
    this.$store.commit("detail",'search')
    Indicator.open({
      spinnerType: 'triple-bounce'
    });
    axios(`/api/search?word=${this.$route.params.searchword}&start=0&sort=0`).then(res=>{
    	// console.log(res.data.data)
      	Indicator.close();
    	this.datalist=res.data.data.list
    })
  },
  methods:{
  	switchsort(e){
  		console.log(e.target.getAttribute("sort"))
  		var sort=e.target.getAttribute("sort")
  		var lis=document.querySelector(".sresult-t-Ul").querySelectorAll("li")
  		for(var i=0;i<lis.length-1;i++){
  			lis[i].className=""
  		}
  		e.target.className="active";
  		this.datalist=[]
  		Indicator.open({
  		  spinnerType: 'triple-bounce'
  		});
  		axios(`/api/search?word=${this.$route.params.searchword}&start=0&sort=${sort}`).then(res=>{
    	// console.log(res.data.data)
      	Indicator.close();
    	this.datalist=res.data.data.list
    })
  	}
  }

}
</script>

<style lang="scss" scoped>
.sresult-main{
	position:relative;
	.sresult-t{
		background:#fff;
		position:fixed;
		top:1rem;
		width:100%;
		z-index:5;
		.sresult-t-Ul{
			display:flex;
			justify-content: space-around;			
		    border-bottom: 1px solid #d9d9d9;
			li{
				text-align: center;
			    color: #43240c;
			    line-height:.84rem;
			}
			.active{
				color:#fa585a;
			}
		}
	}
	.sresult-content{
		ul{
			display:flex;
			justify-content:space-between;
			flex-wrap:wrap;
			li{
				width:3.675rem;
				height:5.775rem;
				margin-bottom:.15rem;
				background:#fff;
				img{
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