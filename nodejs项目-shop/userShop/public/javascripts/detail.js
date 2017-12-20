function Detail() {
    this.init();
};

$.extend(Detail.prototype, {
    init: function() {
        var req = location.search.substring(1).split("&");
        var query = {}
        for (var i = 0; i < req.length; i++) {
            var qq = req[i].split("=");
            query[qq[0]] = qq[1]
        }
        this.getData(query);
        this.zoom();
        this.num();
    },
    getData: function(query) {
        $.ajax({
            url: "/gooddetail",
            data: query
        }).done(data => {
            console.log(data)
            var detail = data.detail;
            var curshop = data.curshop;
            var files = JSON.parse(detail.filename)
            $(".product-show .title .shop").html(curshop.shopname).attr("href", "/shop.html?keyword="+curshop._id);
            $(".product-show .title .good-name").html(detail.title);
            $(".bigimg-box .small-Img").attr("src", "http://127.0.0.1:3000/images/" + files[0]);
            $(".bigimg-box .big-Img").attr("src", "http://127.0.0.1:3000/images/" + files[0]);
            $(".select-title .shopname").html(curshop.shopname);
            $(".select-title .goodname").html(detail.title);
            $(".J-price").html(detail.price);
            for (var $j = 0; $j < 2; $j++) {
                for (var $i = 0; $i < files.length; $i++) {
                    var $clonelistImg = $(".list-img-ex").clone(true);
                    $clonelistImg.appendTo($(".moreImg-ul")).removeClass("list-img-ex");
                    
                    $clonelistImg.find("img").attr("src","http://127.0.0.1:3000/images/"+files[$i] )

                }
            }

        });

    },
    zoom: function() {
        $(".list-img").click(function() {
            $(".small-Img").attr("src", $(this).find("img").attr("src"));
            $(".big-Img").attr("src", $(this).find("img").attr("src"));
        });
        $(".bigimg-box").on("mouseover", function() {
            $(".zoom").show();
            $(".small-Img").hide();
            $(".big-Img").show();
            var scale = $(".big-Img").width() / $(".bigimg-box").width();
            $(".zoom").width($(".bigimg-box").width() / scale);
            $(".zoom").height($(".bigimg-box").height() / scale);
            //				console.log($(".zoom").width());
            //				console.log(scale);

            $(".bigimg-box").on("mousemove", function(e) {
                var mleft = e.pageX - $(this).offset().left - $(".zoom").width() / 2;
                var mtop = e.pageY - $(this).offset().top - $(".zoom").height() / 2;
                if (mleft < 0) {
                    mleft = 0
                } else if (mleft > $(this).width() - $(".zoom").width()) {
                    mleft = $(this).width() - $(".zoom").width();
                }
                if (mtop < 0) {
                    mtop = 0
                } else if (mtop > $(this).height() - $(".zoom").height()) {
                    mtop = $(this).height() - $(".zoom").height();
                }

                $(".zoom").css({
                    top: mtop,
                    left: mleft
                })

                $(".big-Img").css({
                    top: -scale * mtop + "px",
                    left: -scale * mleft + "px"
                })

            })
        })
        $(".bigimg-box").on("mouseout", function() {
            $(".zoom").hide();
            $(".small-Img").show();
            $(".big-Img").hide()
        })
        var perimgWidth = $(".list-img img").width();
        $("#right").click(function() {
            if ($(".moreImg-ul").position().left > -($(".moreImg-ul").width() - $(".moreImg-box").width())) {
                $(".moreImg-ul").stop(true, true).animate({
                    left: $(".moreImg-ul").position().left - perimgWidth + "px"
                })
            }

        });

        $("#left").click(function() {
            console.log($(".moreImg-ul").position())
            if ($(".moreImg-ul").position().left != 0) {
                $(".moreImg-ul").stop(true, true).animate({
                    left: $(".moreImg-ul").position().left + perimgWidth + "px"
                })
            }

        });

    },
    num: function() {
        //减

        $(".num-box .num-reduce").click(function() {
            var goodNum = $(".num-box .num-input").html();

            var canreduce = $(".num-box .num-reduce").hasClass("num-reduce-disabled");
            //			console.log(canreduce);
            if (!canreduce) {
                var goodNum = $(".num-box .num-input").html();
                goodNum--;
                $(".num-box .num-input").html(goodNum);
            }
            if (goodNum == 1) {
                $(this).addClass("num-reduce-disabled");
            } else {
                $(this).removeClass("num-reduce-disabled");
            }

        });
        $(".num-box .num-add").click(function() {
            var goodNum = $(".num-box .num-input").html();

            goodNum++;
            $(".num-box .num-input").html(goodNum);
            if (goodNum == 1) {
                $(".num-box .num-reduce").addClass("num-reduce-disabled");
            } else {
                $(".num-box .num-reduce").removeClass("num-reduce-disabled");
            }
        })
    }
})

new Detail();