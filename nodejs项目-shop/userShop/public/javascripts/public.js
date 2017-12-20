// 选择地址

$(".area td span").click(function() {
    console.log(11111111111)
    $(".province").html($(this).html())
})


//下拉列表

$(".location,.header-cart,.top-nav li").not(".signin").has(".top-nav-box").hover(function(e) {
    //					console.log(e.target);
    $(this).children(".top-nav-box").show();
    $(this).css({ //li本身
        background: "#ffffff",
        borderColor: "#cdcdcd"
    });
    $(this).children(".sprit").css({ //斜杠消失
        visibility: "hidden"
    });
    //三角形变上下指向
    $(this).children("i.select").removeClass("select").addClass("selected");

}, function() {
    $(this).children(".top-nav-box").hide();
    $(this).css({
        background: "#f5f5f5",
        borderColor: "transparent"
    });
    $(".header-cart").css({
        borderColor: "#dddddd"
    })
    $(this).children(".sprit").css({
        visibility: "visible"
    });
    $(this).children("i.selected").removeClass("selected").addClass("select");
})
//签到动画
$(".top-nav li.signin").hover(function() {
    $(this).children(".top-nav-box").show().css({
        opacity: 0
    });
    $(this).children(".top-nav-box").animate({
        opacity: 1,
        top: "25px"
    });
}, function() {
    $(this).children(".top-nav-box").hide().css({
        top: "40px"
    });
});


$(".top-nav a,td span").hover(function() {
    $(this).addClass("hover-red");
}, function() {
    $(this).removeClass("hover-red")
})//侧边栏

$(".sidebar-nav li").has(".sidebarcom-hover").hover(function() {
    $(this).find(".sidebarcom-hover").addClass("curr");
    $(this).addClass("hover")
}, function() {
    $(this).find(".sidebarcom-hover").removeClass("curr");
    $(this).removeClass("hover")
})

$(".sidebar-ft .totop").click(function() {
    $(window).scrollTop(0);
})