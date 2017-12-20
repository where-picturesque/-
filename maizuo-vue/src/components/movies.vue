<template>
	<div class="main">
		<header>
			<router-link to="/movies/nowplaying" class="nowplaying " activeClass="active" >正在热映</router-link>
			<router-link to="/movies/comingsoon" class="comingsoon" activeClass="active">即将上映</router-link>
		</header>
		<router-view></router-view>
	</div>
	
</template>

<script>

export default {


  data () {
    return {

    }
  },
  mounted(){
        this.$store.commit("hometitle","卖座电影")
  	
  }
}
</script>

<style lang="scss" scoped>
.main{
	padding:0 .3rem;
	background:#f9f9f9;
}
.active{
	color: #fe6e00;
    border-bottom: solid;
}
	header{
		height: 46px;
	    margin: 0 auto;
	    border-bottom: solid #fe6e00 1px;
	    a{
	    	float: left;
		    width: 50%;
		    height: 100%;
		    text-align: center;
		    font-size: 16px;
		    line-height: 46px;
		    color: #6a6a6a;
		    cursor: pointer;
	    }
	}
</style>