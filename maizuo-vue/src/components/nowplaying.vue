<template>
	<div class="main-c">
		<ul v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  infinite-scroll-immediate-check="false" >
			<li v-for="data in datalist" class="clear" @click="todetail(data.id)">
				<img :src="data.poster.origin" alt="">
				<div class="item-r">
					<div class="info-t clear">
						<p class="name over">{{data.name}}</p>
						<p class="grade">
							{{data.grade}}
							<i class="icon">></i>
						</p>
					</div>
					<p class="info-intro over">{{data.intro}}</p>
					<div class="info-count">
						<p class="cinemaCount">
							<span class="countnum">{{data.cinemaCount}}</span>家影院上映
						</p>
						<span class="countnum">{{data.watchCount}}</span>人购票
					</div>
				</div>
			</li>
		</ul>
		<div>{{notice}}</div>
	</div>
</template>

<script>
import axios from "axios"
import { Indicator } from 'mint-ui';
import router from "@/router";
export default {

  name: 'nowplaying',

  data () {
    return {
    	datalist:[],
    	loading:false,
    	currentpage:1,
    	total:1,
    	notice:"正在加载，请稍后..."
    }
  },
  mounted(){
  	Indicator.open('加载中...');
  	axios("/v4/api/film/now-playing?page=1&count=7").then(res=>{
  		console.log(res.data.data);
  		Indicator.close();
  		this.datalist=res.data.data.films
  		this.total=res.data.data.page.total
  	})

  },
  methods:{
  	loadMore(){
  		// console.log('到底部')
  		this.currentpage++;
  		// 没有更多数据
  		if(this.currentpage>this.total){
  			this.loading=true;
  			this.notice="影片全部加载完"
  			return ;
  		}
  		axios("/v4/api/film/now-playing",{
  			params:{
  				page:this.currentpage,
  				count:7
  			}
  		}).then(res=>{
  		console.log(res.data.data);
  		this.datalist=[...this.datalist,...res.data.data.films]
  	})
  	},
  	todetail(id){
  		// 编程式导航第一种方式
  		router.push(`/movies/detail?id=${id}`);
  		// 第二种方式
  		// router.push(`/movies/detail/${id}`)
  	}
  }
}
</script>

<style lang="scss" scoped>
.main-c{
	li{
		padding:.4rem 0;
		text-align:left;
		width: 100%;
	    border-bottom: dashed 1px #c9c9c9;
	    cursor: pointer;
		img{
			width:1.2rem;
			float:left;
		}
		.item-r{
			float:left;
			width:4.87rem;
			margin-left:.3rem;
		}
		.info-t{
			.name{
				float:left;
				font-size: 16px;
			    line-height: 32px;
			    color: #000;
			    width:4rem;
			}
			.grade{  
				float:right;  
			    font-size: 16px;
			    line-height: 32px;
			    color: #fc7103;
			}
			.icon{
				line-height: 29px;
   				color: #c6c6c6;
			}
		}
		.info-intro{
			height: .48rem;
		    line-height: 24px;
		    color: #8e8e8e;
		    font-size: 12px;
		    width: 100%;
		}
		.info-count{
			line-height: 24px;
		    color: #8e8e8e;
		    font-size: 12px;
		    .countnum{
		    	color:#8aa2bf;
		    }
		    .cinemaCount{
		    	display:inline-block;
		    	margin-right:.4rem;
		    }
		}
	}
}
</style>