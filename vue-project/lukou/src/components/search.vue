<template>
	<div class="searchmain">
		<div class="search-t">
			<p class="hot">热门搜索</p>
			<ul class="clear">
				<li v-for="data in hotWords.slice(0,8)" @click="search(data)">{{data}}</li>
			</ul>
		</div>
		<div class="category">
			<p class="category-title">商品分类</p>
			<ul class="clear">
				<router-link :to="'/tab/'+data.id" tag="li" v-for="data in cate.slice(1)">
					{{data.name}}
				</router-link>
			</ul>
		</div>
		<p class="down">
			<span class="download-text">去熊猫优选APP，找更多优惠</span>
		</p>
		<div class="safe">
			<img src="../assets/images/aqkx_83x30.png" height="30" width="83" alt="">
		</div>
	</div>
</template>

<script>
import axios from "axios"
export default {

  name: 'search',

  data () {
    return {
    	hotWords:[],
    	cate:[]
    }
  },
  mounted(){
    this.$store.commit("detail",'search')
    this.$store.commit("keyword","")
    var that=this
    axios.all([axios("/api/hotWords"),axios("/api/tabs")]).then(axios.spread(function (hot,cate) {
    	console.log(hot.data.data,cate.data.data)
    	that.hotWords=hot.data.data;
    	that.cate=cate.data.data.list;
    }))
  },
  methods:{
  	search(data){
  		this.$store.dispatch("sresult",data)
  		this.$router.push(`/sresult/${data}`)
  	}
  }
}
</script>

<style lang="scss" scoped>
.searchmain{
	background:#fff;
	margin-top:-.45rem;
	.search-t{
		margin: .4rem;
		font-size:14px;
		color:#877a73;
		.hot{
			margin:.4rem 0 .3rem 0;
		}
		ul li{
			float:left;
			margin:0 .225rem .3rem 0 ;
			padding:.075rem .225rem;
			background:#f5f5f5;
			color:#43240c;
			text-align: center;
			border-radius:.2rem;
			line-height:18px;
		}
	}
	.category{
		font-size:14px;
		color:#877a73;
		.category-title{
			margin:.4rem;
		}
		ul li{
			float:left;
			margin-bottom:.4rem;
			width:1.875rem;
			text-align:center;
			font:15px/18px "";
			color:#43240c;
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
	.safe{
		img{
			display:block;
			margin:0 auto;
		}
	}
}

</style>