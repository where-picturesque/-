<template>
	<div class="main" v-if="data">
		<div class="main-t">
			<img :src="data.cover.origin" alt="">
		</div>
		<p class="title">影片简介</p>
		<div class="info">
			
			<dl>
				<dt class="director">导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：</dt>
				<dd>{{data.director}}</dd>
			</dl>
			<dl class=" actors-name">
				<dt class="actors">主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：</dt>
				<dd class=" over">
					<span v-for="actor in data.actors" >{{actor.name}} | </span></dd>
			</dl>
			<dl>
				<dt>地区语言：</dt>
				<dd>{{data.nation}}</dd>
			</dl>
			<dl>
				<dt>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>
				<dd>{{data.category}}</dd>
			</dl>
			<p class="synopsis">{{data.synopsis}}</p>
		</div>
	</div>
</template>

<script>
import axios from "axios"
export default {

  name: 'moviesdetail',

  data () {
    return {
    	id:"",
    	data:null,
    	name:""
    }
  },
  mounted(){
  	// 第一种获取id: 对应路由：route.push(/detail?id="")
  	// console.log(this.$route.query.id)
  	this.id=this.$route.query.id;

  	// // 第二种获取id: 对应路由：route.push(/detail/id)
  	// console.log(this.$route.params.movieid)//movieid是路由配置文件中接收的id 
  	// this.id=this.$route.params.movieid;

  	axios(`/v4/api/film/${this.id}`).then(res=>{
  		// console.log(res.data.data)
  		this.data=res.data.data.film
  		this.name=res.data.data.film.name
  		// this.$root.bus.$emit("moviesname",this.name);
  		// this.$emit("moviesname",this.name);
  		this.$store.commit("getheadertitle",this.name)

  	})
  }
}
</script>

<style lang="scss" scoped>
.main{
	.main-t img{
		width:100%;
	}
	.title{
			margin: .32rem auto;
		    border-left: 16px solid rgb(228, 200, 156);
		    font-size: 16px;
		    padding-left: .08rem;
		}
	.info{
		margin:0 .4rem;
		line-height: 16px;
		dl{
			overflow:hidden;
			margin-bottom:.2rem;
			dt{
				float:left;
			}

		}
		.actors-name{
			width:100%;
		}
		.synopsis{
			font:12px/18px "";
		}

	}
}
</style>