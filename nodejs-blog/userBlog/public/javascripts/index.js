function Main(){
	this.init();
};

$.extend(Main.prototype,{
	init:function () {
		$.ajax({
			url:"/list",
			data:{
				offset:0,
				limit:2
			}
		}).done(data=>{// 箭头函数解决this 指向
			this.renderList(data.list);
			this.pagination(data.total);//分页的页数
		})
	},
	renderList:function (list) {
		$(".list").html("");
		for (var i = 0; i < list.length; i++) {
			console.log(list[i].filename)
			var $li=$("<li>").html(`

					<div class="media">
		  <div class="media-left">
		    <a href="#">
		      <img class="media-object" src="http://localhost:3000/images/${list[i].filename}" alt="...">
		    </a>
		  </div>
		  <div class="media-body">
		    <p class="media-heading">
			    <h4>${list[i].title}</h4>
			    <span>${list[i].ctime}</span>
		    </p>
		  	<pre>${list[i].content}</pre>  
		   </div>
		</div>
				`);
			$(".list").append($li);
		}
	},
	pagination:function (num) {
		var that=this;
		for (var i = 0; i < num; i+=2) {
			var $li=$("<li>").html(`<a href="#">${i/2+1}</a>`);
			$li.click(function(){
				that.rerenderList($(this).index());
			})
				$(".pagination").append($li);
		}
	},
	rerenderList:function (count) {
		$.ajax({
			url:"/list",
			data:{
				limit:2,
				offset:2*count
			}
		}).done(data=>{
			console.log(data.list)
			this.renderList(data.list);
		})
	}
})

new Main();