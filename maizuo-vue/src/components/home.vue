<template>
	<div id="main">
		<swipe class="my-swipe">
		  <swipe-item class="slide" v-for="data in bannerlist">
		  	<img :src="data.imageUrl" alt="">
		  </swipe-item>
		</swipe>
    <div class="main">
      <div class="nowplaying">
      <ul>
        <li v-for="data in playing" @click="todetail(data.id)">
          <img :src="data.cover.origin">
          <div class="info clear">
            <div class="info-l">
              <p class="name">{{data.name}}</p>
              <p class="intro">{{data.cinemaCount}}家影院上映{{data.watchCount}}人购票</p>
            </div>
            <p class="info-r">{{data.grade}}</p>
          </div>
          
        </li>
      </ul>
      <div class="nowplay-more">更多热映电影</div>
    </div>
    <div class="comingsoon">
      <div class="dividing-line">
        <div class="comingsoon-t">
          即将上映
        </div>
      </div>
      
      <ul>
        <li v-for="data in coming">
          <img :src="data.cover.origin">
          <div class="info clear">
            <div class="info-l">
              <p class="name">{{data.name}}</p>
            </div>
          </div>
          
        </li>
      </ul>
    </div>
    </div>
    
	</div>
</template>


<script>
import "vue-swipe/dist/vue-swipe.css"; //css 模块化 导入
import { Swipe, SwipeItem } from 'vue-swipe';
import { Indicator } from 'mint-ui';//未加载前的圈
import router from "@/router";
export default {

  data () {
    return {
    	bannerlist:[],
      playing:[],
      coming:[]
    }
  },
   components: {
    'swipe': Swipe,
    'swipe-item': SwipeItem
  },
  methods:{
    todetail(id){
      // 编程式导航第一种方式
      router.push(`/movies/detail?id=${id}`);
      // 第二种方式
      // router.push(`/detail/${id}`)
    }
  },
  mounted(){
        this.$store.commit("hometitle","卖座电影")
    Indicator.open('加载中...');
    Promise.all([fetch("/v4/api/billboard/home?__t=1510282324021").then(res=>res.json()),fetch("/v4/api/film/now-playing?__t=1510313281396&page=1&count=5").then(res=>res.json()),fetch("/v4/api/film/coming-soon?__t=1510316897431&page=1&count=3").then(res=>res.json())]).then(res=>{
        console.log(res);
        Indicator.close();
        this.bannerlist=res[0].data.billboards
        this.playing=res[1].data.films
        this.coming=res[2].data.films
    })
//     // 轮播
//   	fetch("/v4/api/billboard/home?__t=1510282324021").then(res=>res.json()).then(res=>{
//   		// console.log(res.data.billboards)
//   		this.bannerlist=res.data.billboards
//   	})

// // 正在热映
//     fetch("/v4/api/film/now-playing?__t=1510313281396&page=1&count=5").then(res=>res.json()).then(res=>{
//       console.log(res.data.films);
//       this.playing=res.data.films
//     })

// // 即将上映
//     fetch("/v4/api/film/coming-soon?__t=1510316897431&page=1&count=3").then(res=>res.json()).then(res=>{
//       console.log(res.data.films);
//       this.coming=res.data.films
//     })

  }

}
</script>

<style lang="scss" scoped>

.my-swipe {
  height: 200px;
  img{
  	width: 100%;
  }
}
.main{
    background:#e1e1e1;
}
.nowplaying,.comingsoon{

  ul{
    padding-top:.36rem;
    margin-bottom:.2rem;
    li{
      margin:0 .34rem .34rem;
      background:#f9f9f9;
      text-align:left;
      img{
        width:6.82rem;
      }
      .info{
        border:.01rem solid #ccc;
        .info-l{
          float:left;
          margin-left:.22rem;
          line-height:15px; 
          padding-top:.26rem;
        }
        .name{
          font:12px/15px "";
        }
        .intro{
          font-size: 8px;
          color: #9a9a9a;
        }
        .info-r{
          float:right;
            color: #f78360;
            display: inline-block;
            line-height: 1rem;
            float: right;
            margin-right: .3rem;
            font-size: 18px;
        }
      }
    }
  }
  .nowplay-more{
      width: 3.2rem;
      height: .6rem;
      border: 1px solid #aaa;
      border-radius: .3rem;
      margin: .2rem auto .6rem;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      color: #616161;
      cursor: pointer;
      // margin-bottom:10rem;
  }
}

  .comingsoon-t{
    width: 1.3rem;
    height: .4rem;
    margin: 0 auto;
    margin-bottom: -.2rem;
    border-radius: .1rem;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    color: #eee;
    background-color: #a7a7a7;

  }
  .comingsoon{
    .info-l{
      height:.6rem;
    }
  }
  .dividing-line {
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #a8a8a8;
}

</style>