<template>
	<div class="main">
		<p class="location">{{location}}</p>
		<div class="cinemas">
			<ul>
				<li v-for="data in datalist" class="clear">
					
					<div class="info-l">
						<div class="info-l-t">
							<span class="cinemaname">{{data.name}}</span>
							<span class="icon-l"></span>
							<span class="icon-l"></span>
						</div>
						<div class="labels">
							<span v-for="label in data.labels">{{label.name}}</span>
						</div>
						<p class="address over">{{data.address}}</p>
					</div>
					<div class="info-r iconfont icon-more"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {

  name: 'cinema',

  data () {
    return {
    	location:"江干区",
    	datalist:[]
    }
  },
  mounted(){
  	fetch("/v4/api/cinema?__t=1510372293623").then(res=>res.json()).then(res=>{
  		console.log(res.data.cinemas);
  		this.datalist=res.data.cinemas
  	})
  }
}
</script>

<style lang="scss" scoped>
.main{
	background:#fff;
	.location{
		height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	    padding-left: 16px;
	    background: #e1e1e1;
	    margin-bottom: 1px;
	    color: #636363;
	}
}
.cinemas li{
	    border-bottom: 1px solid #e1e1e1;
	        padding: 10px 0 12px 16px;
	        .info-l{
	        	float:left;
	        	width:5.385rem;
	        	.info-l-t{
        		    margin-bottom: 5px;
        		    font-size:16px;

	        	}
	        	.labels{
        		    margin-bottom: 5px;
    				font-size: 10px;
	        	}
	        	.address{
        		    color: #ccc;
	        	}
	        }
	        .info-r{
	        	float:right;
        	    padding-right: 15px;
			    line-height: 36px;
			    color: #c6c6c6;
	        }
}
</style>