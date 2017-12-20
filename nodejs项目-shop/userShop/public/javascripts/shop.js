function Shop() {
    this.init();
}

$.extend(Shop.prototype, {
    init: function() {
        var req = location.search.substring(1).split("&");
        var query = {}
        for (var i = 0; i < req.length; i++) {
            var qq = req[i].split("=");
            query[qq[0]] = qq[1]
        }
        this.getData(query);
        this.filter();
    },
    getData: function(query) {
        query.limit=8;
        query.offset=0;
        $.ajax({
            url: "/store",
            data: query
        }).done(data => {
            console.log(data);
            this.page(data.allgoods.length,query);
            this.renderMainTop(data);
            this.renderMainC(data);
            this.sortbyprice(query);
            this.filterSex(query);
            this.filterprice(query)
        })
    },
    renderMainTop: function(data) {
        var shops = data.shops;
        var curshop = data.curshop;
        var goods = data.goods;
        var category = data.category.type;
        var allgoods= data.allgoods

        // 商品数量
        $(".pro-paging .good-num").html(allgoods.length);
        //上方推荐品牌
        var li = "";
        for (var i = 0; i < shops.length; i++) {
            li += `<li class="c-filter-data-item ">
                <a class="c-filter-brand-link" href="shop.html?keyword=${shops[i]._id}"><img class="c-filter-brand-img" src="http://127.0.0.1:3000/images/shop/${shops[i].shopimages}"/></a>
                </li>
                `
        }
        $(".J-brand-filter-data-list").html(li);
        // 分类
        var categoryli = "";
        for (var i = 0; i < category.length; i++) {
            categoryli += `<li class="c-filter-data-item  J-filter-data-item">
                            <a class="c-filter-category-link" target="_self"  href="/shop.html?keyword=${curshop._id}&category=${encodeURI(encodeURI(category[i]))}">${category[i]}</a>
                            </li>`
        }
        $(".c-filter-category-list").html(categoryli);

        // 性别
        var sex=[];
        for (var i = 0; i < allgoods.length; i++) {
            sex.push(allgoods[i].sex);
        }
        var set=new Set(sex);
        set=new Array(...set);
        // console.log(set);
        var sexli="";
        for (var i = 0; i < set.length; i++) {
            sexli+=`<li class="c-filter-data-item  J-filter-data-item"><a class="c-filter-property-link" target="_self" href="/shop.html?keyword=${curshop._id}&sex=${set[i]}">${set[i]}</a></li>`
            // sexli+=`<li class="c-filter-data-item  J-filter-data-item"><span class="c-filter-property-link" >${set[i]}</span></li>`
        }
        $(".c-filter-property-list").html(sexli)

        
    },
    renderMainC:function (data) {
        
        var shops = data.shops;
        var curshop = data.curshop;
        var goods = data.goods;
        var category = data.category.type;
        // 主体商品
        for (var i = 0; i < goods.length; i++) {
            var files = JSON.parse(goods[i].filename)
            var $clonenode = $(".list-item-hidden").clone(true);
            $clonenode.removeClass("list-item-hidden").addClass("list-item").appendTo($(".main-c-list"));
            $clonenode.find("a").attr("href", "/detail.html?id=" + goods[i]._id)
            $clonenode.find(".good-img").attr("src", "http://127.0.0.1:3000/images/" + files[0])
            $clonenode.find(".good-price-info .price-text").html(goods[i].price);
            $clonenode.find(".good-title").html(goods[i].title);
        }
    },
    page: function(count,query) {
        // console.log(query)
        var that=this;
        $(".page-count").html("/" + Math.ceil(count / 8))
        //下一页
        $(".page-next-txt").click(function() {
            var pageNow = $(".page-nub").html();
            if (pageNow < count / 8) {
                $(".main-c-list .list-item").remove();
                pageNow=parseInt(pageNow) + 1
                $(".page-nub").html(pageNow);
                query.limit=8;
                query.offset=8*(pageNow-1)
                $.ajax({
                    url: "/store",
                    data:query
                }).done(data=>{
                    console.log(data);
                    that.renderMainC(data);
                })
            }

        })
        // 上一页
        $(".page-pre").click(function () {
            var pageNow = $(".page-nub").html();
            if(pageNow>0){
                $(".main-c-list .list-item").remove();
                pageNow=parseInt(pageNow) - 1
                $(".page-nub").html(pageNow);
                query.limit=8;
                query.offset=8*(pageNow-1)
                $.ajax({
                    url: "/store",
                    data:query
                }).done(data=>{
                    console.log(data);
                    that.renderMainC(data);
                })
            }
        })
    },
    //按价格排序
    sortbyprice:function (query) {
        var price=1;
        var that=this;
        $(".oper-price-tc").click(function () {
            price*=-1;
            query.price=price
            $.ajax({
                url:"/store",
                data:query
            }).done(data=>{
                $(".main-c-list .list-item").remove();
                that.renderMainC(data);
            })
        })
        
    },
    // 筛选性别
    filterSex:function (query) {
        // $(".c-filter-property-list").on("click",".c-filter-property-link",function (e) {
        //     var sex=e.target.innerHTML;
        //     query.sex=sex;
        //     $.ajax({
        //         url:"/store",
        //         data:query
        //     }).done(data=>{
        //         console.log(data)
        //     })
        // })
    },
    //筛选
    filter:function () {
        $(".J_oper_tag").click(function () {
            $(this).addClass("z-oper-current-selected").siblings().removeClass("z-oper-current-selected");
            $("#J_sortSubmit_btn").hide();
        })
        $("#J_inputLayout").click(function () {
            $("#J_sortSubmit_btn").show();
            $(this).addClass("z-oper-current-selected").siblings(".J_oper_tag").removeClass("z-oper-current-selected");
        })

    },
    filterprice:function (query) {
        $("#J_sortSubmit_btn").click(function () {
            var priceStart=$("#J_priceStart").val();
            var priceEnd=$("#J_priceEnd").val();
            query.price={$gte:priceStart,$lte:priceEnd}
            $.ajax({
                url:"/store",
                data:query
            }).done(data=>{
                console.log(data)
            })
        })
    }
});

new Shop();