项目名称：魅力惠
项目介绍：B2C模式的电商网站
技术栈：react react-router redux react-redux nodejs webpack

安装环境：react react-dom mongodb  ruby webpack
功能模块：首页 列表页 详情页 购物车 登录注册（登录注册暂不支持）

技术难点：1.路由改变 加载同一组件时，不会刷新组件 
解决方案：
componentWillReceiveProps(nextProps){
	// 点击推荐列表商品，商品详情显示更换内容重新触发ajax
	if (nextProps.location.pathname != this.props.location.pathname) {
     	// console.log(nextProps)
		
		this.props.getDetail(nextProps.match.params.productId)
		this.props.getRecommend(nextProps.match.params.productId,nextProps.match.params.categoryId)
		window.scrollTo(0,0);
 	} 
	
	
} 
技术难点：2.点击加入购物车，在函数中把商品信息存到localStorage,定义变量存储创建的tr来显示商品信息(图片商品名)，render渲染页面时不能访问变量，于是把tr存到store中，但是更改商品数量时store变化，不会更新视图，强制render视图也不会更新
解决方案：点击加入购物车，把商品信息存到localStorage，同时把商品id，数量 存到store中，在render时遍历store中存放的商品信息数组，获取商品信息

演示地址：