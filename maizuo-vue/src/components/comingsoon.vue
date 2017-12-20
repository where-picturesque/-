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
						<i class="iconfont icon-more icon"></i>
						
					</div>
					<p class="info-intro">{{data.intro}}</p>
					
				</div>
			</li>
		</ul>
		<div>{{notice}}</div>
	</div>
</template>

<script>
import axios from "axios";
import router from "@/router"
import { mapGetters } from 'vuex'
import { Indicator } from 'mint-ui';
export default {

  name: 'comingsoon',

  data () {
    return {
    	currentpage:1,
    	loading:false,
    	total:1,
    	notice:""

    }
  },
  mounted(){
  	// 分发 Action
  	if(!this.$store.state.comingsoonlist){
  	this.$store.dispatch("getcomingsoonlist","/v4/api/film/coming-soon?page=1&count=7");
  	}
  		
  },
  computed:{
  	datalist(){
  		// console.log(this.$store.state.comingsoonlist.films)
  		return (this.$store.state.comingsoonlist?this.$store.state.comingsoonlist:[])
  		 // this.$store.state.comingsoonlist;
  		
  	}

  	// ...mapGetters(["datalist"])
  },
  methods:{
  	loadMore(){
  		// console.log('到底部')
  		this.currentpage++;
  		// 没有更多数据
  		if(this.currentpage>this.$store.total){
  			this.loading=true;
  			this.notice="影片全部加载完"
  			return ;
  		}
  		// axios("/v4/api/film/coming-soon",{
  		// 	params:{
  		// 		page:this.currentpage,
  		// 		count:7
  		// 	}
  		// }).then(res=>{
  		// console.log(res.data.data);
  		// this.datalist=[...this.datalist,...res.data.data.films]
			// })
			this.$store.dispatch("getcominglistagin",`/v4/api/film/coming-soon?page=${this.currentpage}&count=7`);
	
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

			.icon{
				float:right;
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