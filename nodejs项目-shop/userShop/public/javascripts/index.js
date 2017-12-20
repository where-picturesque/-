function Main() {
    this.init();
}

$.extend(Main.prototype, {
    init: function() {
        $.ajax({
            url: "/list"
        }).done(data => {
            console.log(data)
            var goods=data.goods;
            var shops=data.shops;
            for (var i = 0; i < goods.length; i++) {
                var files=JSON.parse(goods[i].filename)
                // console.log(files)
                var $clonenode = $(".list-item-hidden").clone(true);
                $clonenode.removeClass("list-item-hidden").addClass("list-item");
                $(".main-c-list").append($clonenode);
                $clonenode.find("a").attr("href","/detail.html?id="+goods[i]._id)
                $clonenode.find(".good-img img").attr("src","http://127.0.0.1:3000/images/"+files[0])
                $clonenode.find(".good-price-info .price-text").html(goods[i].price);
                $clonenode.find(".good-title").html(goods[i].title);
                for (var j = 0; j < shops.length; j++) {
                    if (shops[j]._id==goods[i].shopid) {
                        $clonenode.find(".good-title-info .good-shopname").html(shops[j].shopname);
                        break;
                    }
                }
            }
        })
    }
})


new Main();


//轮播图
var $index = 0;
var mleft = 0;
var sign = true;
var timer = null;
timer = setInterval(function() {
    $("#right").click();
}, 2000)

function lunboMove() {
    var btnsLength = $("#banner .lunbo .btns .btns-ul li").size();
    if ($index > btnsLength - 1) {
        $index = 0
    } else if ($index < 0) {
        $index = btnsLength - 1;
    }
    //btns下面的滑块移动
    mleft = $index * $(".silder").width();
    //              console.log(mleft)
    $(".silder").stop(true, true).animate({
        left: mleft + "px"
    }, 500, function() {
        sign = true;
    })
    //轮播图图片变化
    $("#banner .lunbo-imgs li").eq($index).fadeIn().siblings("li").fadeOut();

}
//鼠标滑过下面的介绍btns时
$("#banner .lunbo .btns .btns-ul").on("mouseover", "li", function() {
    $index = $(this).index();
    lunboMove();
})

//鼠标划入轮播图片
$("#banner .lunbo-imgs ").hover(function() {
    clearInterval(timer)
    //左右箭头出现
    $(this).children("#left").stop(true, true).animate({
        marginLeft: "0px"
    })
    $(this).children("#right").stop(true, true).animate({
        marginRight: "2px"
    })

}, function() { //鼠标滑出
    $(this).children("#left").stop(true, true).animate({
        marginLeft: "-33px"
    })
    $(this).children("#right").stop(true, true).animate({
        marginRight: "-31px"
    })
    timer = setInterval(function() {
        $("#right").click();
    }, 2000)
})
//点击左右箭头
$("#right").click(function() {
    if (sign == true) {
        sign = false;
        $index++;
        lunboMove();
        //                      console.log($index)
    }

})
$("#left").on("click", function() {
    if (sign == true) {
        sign = false;
        $index--;
        lunboMove();
        console.log($index);

    }

})
