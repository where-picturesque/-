<template>
	<div class="main" v-if="detailData">
		<div class="back" @click="back"><i class="iconfont icon-back"></i></div>
		<div class="main-t">
			<swipe class="my-swipe">
			  <swipe-item class="slide" v-for="data in detailData.photo">
			    <img :src="data.url" alt="">
			  </swipe-item>     
			</swipe> 
			<div class="info">
				<p class="info-title">
				  <img src="../assets/images/taobao.98caa5a.png" height="36" width="36" alt="" v-if="detailData.platform==1" class="platform">
				<img src="../assets/images/tmall.78fc8a6.png" height="36" width="36" alt="" v-if="detailData.platform==2" class="platform">
				<img src="../assets/images/baoyou.20f74bf.png" height="47" width="92" alt="" v-if="detailData.isFreePostage" class="poster">{{detailData.title}}</p>
				<div class="useCoupon" v-if="detailData.hasCoupon">
					<div class="price">
						<img src="../assets/images/quan.574de0f.png" height="45" width="129" alt="">
						￥<span class="price-text">{{detailData.price}}</span>
					</div>
					<p class="originPrice clear">						
						<span class="originPrice-text">原价<i>{{detailData.originPrice}}</i></span>
						<span class="saleNum">月销量：{{detailData.saleNum}}</span>
					</p>
				</div>
				<div class="nocoupon clear" v-else>
					<span class="price">￥<i class="price-text">{{detailData.price}}</i></span>
					<span class="saleNum">月销量：{{detailData.saleNum}}</span>
				</div>
			</div>  	
		</div>	
		<div class="main-c">
			<div class="main-c-t">
				<span data-v-7540cfa6="" class="line"></span> 
				<span data-v-7540cfa6="" class="text">淘宝图文详情</span> 
				<span data-v-7540cfa6="" class="line"></span>
			</div>
			<ul class="main-c-detail">
				<li v-for="data in detailData.descContentList">
					<img :src="data.image.url" alt="">
				</li>
			</ul>
			<p class="down">
				<span class="download-text">去熊猫优选APP，商品详情更丰富</span>
			</p>
			
		</div>
		<footer class="clear">
			<router-link class="buy" to="/reglogin">去淘宝买</router-link>
		</footer>	
	</div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe';
export default {

  name: 'detail',

  data () {
    return {
    	type:"noback"
    }
  },
  mounted(){//https://quan.lukou.com/api/detail?id=1469387&normal=1
  	console.log(this.$route)
  	this.$store.dispatch("detailData",`/api/detail?id=${this.$route.params.detailid}&normal=1`)
  },
  computed:{
  	detailData(){
  		console.log(this.$store.state.detaildata)
  		return this.$store.state.detaildata?this.$store.state.detaildata:null;
  	}
  },
   components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem
  },
  methods:{
  	back(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
	margin-top:-1.8rem;
	background:#f5f5f5;
	color:#b1a9a5;
	.back{
		width:.75rem;
		height:.75rem;
		position:fixed;
		top:.4rem;
		left:.4rem;
		border-radius:50%;
		background:rgba(0,0,0,.5);
		text-align:center;
		z-index:5;
		i{
			line-height:.75rem;
			color:#fff;
			font-weight:700;
			font-size:18px;
		}
	}
	.main-t{
		background:#fff;
	}
	.my-swipe {
	  height: 7.5rem;
	  .slide{
	    img{
		    width: 100%;
		  }
	  }	  
	}
	.info{
		padding:.2rem .2rem .2rem .24rem;
		.info-title{
			font-size:15px;
		}
		.platform{
		  width:.32rem;
		  height:.32rem;
		}
		.poster{
		  width:.66rem;
		  height:.338rem;
		  padding:0 .075rem;
		}
		.useCoupon{
			.price{
				margin-top:.1rem;
				color: #fa585a;
				img{
					width:1.05rem;
					height:.366rem;
				}
				.price-text{
					vertical-align:middle;
				    font-size: 26px;
				    font-weight: 700;
				}
			}
			.originPrice{
				.originPrice-text{
					float:left;
					i{
					text-decoration:line-through;

					}
				}
				.saleNum{
					float:right;
				}
			}
		}
		.nocoupon{
			margin-top:.1rem;
			.price{
				float:left;
				color: #fa585a;
				.price-text{
					font-size: 26px;
				    font-weight: 700;
				    line-height:36px;
				}
			}
			.saleNum{
				float:right;
				line-height:36px;
			}
		}
	}
	.main-c{
		.main-c-t{
			text-align: center;
			color: #b1a9a5;
			background-color: #f5f5f5;
			height: .8rem;
			line-height:.8rem;
			font-size: 0;
			.line{
				background-color: #b1a9a5;
				width: 10%;
				height: 1px;
				display: inline-block;
				margin: .08rem 0;
			}
			.text{
				font-size:12px;
				margin:0 .1rem;
			}
		}
		.main-c-detail{
			img{
				width:100%;
			}
		}
	}
	.down{
		text-align:center;
		background:#fff;
		.download-text{
			margin:.9rem 0;
			padding:.12rem .5rem ;
			border:1px solid #fa521e; 
			color:#fa521e;
			font:14px/18px "";
			display:inline-block;
			border-radius:18px;
		}
	}
	.buy{
		float:right;
		width:3rem;
		height:1rem;
		background:#fa585a;
		color:#fff;
		text-align:center;
		font:700 16px/50px "";
	}
	
}
</style>