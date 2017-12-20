<template>
	<div class="main">
		<div class="main-inner" v-if="data">
			<div class="main-t">
				<img :src="data.coverUrl" alt="">
				<p class="title">{{data.title}}</p>
			</div>
			<div class="main-c">
				<ul>
					<li v-for="data in contentList">
						<div class="head" v-if="data.type==1">{{data.text}}</div>
						<div class="title" v-if="data.type==2">
							<p class="title-t" v-if="data.seq.length>1">{{data.seq}}</p>
							<p class="title-t" v-else>0{{data.seq}}</p>
							<div class="title-c">
								<p class="line"></p>
								<p class="title-text">{{data.title}}</p>
								<p class="line"></p>
							</div>
						</div>
						<div class="content" v-if="data.type==4">
							<router-link :to="'/detail/'+data.commodity.id">
								<div class="content-inner">
									<img :src="data.commodity.image" alt="">
									<p class="content-title over" >{{data.commodity.title}}</p>
									<div class="content-b clear">
										<span class="price">￥{{data.commodity.price}}</span>
										<span class="originPrice">￥{{data.commodity.originPrice}}</span>
										<i class="iconfont icon-more"></i>
										<span class="Coupon" v-if="data.commodity.hasCoupon">{{data.commodity.couponValue}}</span>
									</div>
								</div>
							</router-link>
						</div>

					</li>
				</ul>
			</div>
		</div>		
	</div>
</template>

<script>
import axios from "axios"
export default {

  name: 'article',

  data () {
    return {
    	type:"canback",
    	data:null,
    	contentList:null
    }
  },
  mounted(){
    this.$store.commit("detail",false)
  	this.$store.commit("type",this.type)
  	console.log(this.$route)
  	axios(`/api/${this.$route.path}`).then(res=>{
  		console.log(res.data.data)
  		this.data=res.data.data
  		this.contentList=res.data.data.contentList
  	})

  }
}
</script>

<style lang="scss" scoped>
.main{
	background:#fff;
}
.main-t{
	img{
		width:100%;		
	}
	.title{
		color: #43240c;
		font-size: 21px;
		font-weight: 700;
		padding: .3375rem .33rem 0;
	}
}
.main-c{
	ul li{
		.head{
			color: #877a73;
		    padding: .6rem .33rem .45rem;
		    line-height: 1.8;
		    font-size:14px;
		}
		.title{
			.title-t{
				font-size: 32px;
				text-align: center;
				font-weight: 700;
				color: #877a73;
				margin: .6rem 0 .42rem;
			}
			.line{
				height: 1px;
			    width: 2rem;
			    background-color: #43240c;
			    margin: 0 auto;
			}
			.title-text{
				vertical-align: middle;
			    font-size: 18px;
			    padding: .24rem .3rem;
			    color:#43240c;
			    font-weight:700;
			    text-align:center;
			}
		}
		.content{
			margin:.6rem .5rem 0;
			position:relative;
			background:#f5f5f5;
			img{
				width:100%;
			}
			.content-title{
				margin: .225rem .9rem .21rem .2rem;
				color: #877a73;
			}
			.content-b{
				color: #fa585a;
				margin: 0 .2rem;
				padding-bottom: .15rem;
				position: relative;
				.price{
					font:700 18px/20px "";
					float:left;
					vertical-align:bottom;
				}
				.originPrice{
					text-decoration:line-through;
					color:#b1a9a5;
					font-size:12px;
					float:left;
					vertical-align:bottom;
				}
				.Coupon{
					float:right;
					background:url("../assets/images/coupon-bg.26d715c.png") no-repeat ;
					background-repeat: no-repeat;
				    background-position: 50%;
				    background-size: 100% 100%;
				    text-align: center;
				    padding:.075rem .15rem;
				    font-size:14px;
				    margin-right:.4rem;
				}
				.icon-more{
					float:right;
					color:#b1a9a5;
					font-size:20px;
					font-weight:700;
				}
			}

		}
	}
}
</style>