	document.documentElement.style.fontSize=document.documentElement.clientWidth/750*100+"px";


	var home = {
	    template: `

			<div class="main-inner">
				<div class="swiper-container">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide" v-for="data in banner" >
			            <img :src="data.imageUrl"/>
			            </div>
			        </div>
			    </div>
				<div class="main-c">

				</div>
			</div>

		`,
	    data() {
	        return {
	            banner: []
	        }

	    },
	    mounted() {
	        $.ajax({
	            url: "../maizuo/php/maizuo-data.php",
	            dataType: "json"
	        }).done(data => {
	            console.log(data);
	            this.banner = data.data.billboards;
	            this.$nextTick(() => {
	                var mySwiper = new Swiper('.swiper-container', {
	                    loop: true,
	                    // paginationClickable: true, //分页器可以点击
	                    autoplay: true,
	                    speed: 4000
	                })
	            })
	        })
	        // fetch(../maizuo/php/maizuo-data.php).then(res=>res.json()).then(res=>{
	        // 	console.log(res)
	        // })
	    }
	}
	var movies = {
	    template: `
		<div class="movies">
			<div class="movies-header clear">
				<a href="#" class="checked">正在热映</a>
				<a href="#">即将上映</a>
			</div>
		</div>
		`,
	    mounted() {
	        // $.ajax({
	        //     url: "http://m.maizuo.com/v4/api/film/now-playing?__t=1510056551412&page=1&count=5",
	        //     dataType: "jsonp"
	        // }).done(data => {
	        //     // console.log(data)
	        // })
	    }
	}
	var film = {
	    template: `
		<div class="film">
			影院
		</div>
		`
	}
	var market = {
	    template: `
		<div class="market">
			market
		</div>
		`
	}
	var my = {
	    template: `
		<div class="my">
			my
		</div>
		`
	}
	var card = {
	    template: `
		<div class="card">
			card
		</div>
		`
	}
	var vm = new Vue({
	    el: "#box",
	    data: {
	        sidebar: false,
	        current: "home"
	    },
	    methods: {
	        showside() {
	            this.sidebar = !this.sidebar
	        },
	        changepage(e) {
	            var page = e.target.getAttribute("page");
	            console.log(page);
	            this.sidebar = false;
	            this.current = page
	        }
	    },
	    components: {
	        home,
	        movies,
	        film,
	        market,
	        my,
	        card
	    }
	})