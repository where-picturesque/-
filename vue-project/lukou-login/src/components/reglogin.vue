<template>
	<div class="main">
		<div class="head">
			<router-link to="/reglogin/login" activeClass="active"class="login">登录</router-link>
			<router-link to="/reglogin/register" activeClass="active" class="login">注册</router-link>
		</div>
		<div class="main-c">
			<router-view></router-view>
		</div>
	</div>

</template>

<script>
export default {

  name: 'reglogin',

  data () {
    return {

    }
  },
  mounted(){
    this.$store.commit("type",this.type)

  }
}
</script>

<style lang="scss" scoped>
.main{
	background:#fff;
	.head{
		display:flex;
		justify-content:space-around;
		height:.5rem;
		font:16px/30px "";
		border-bottom:1px solid #ddd;
			text-align:center;
		background:#f5f5f5;
		
	}
}
.active{
		color:#ffc107;
}
.main-c{
	margin-top:.5rem;
}
</style>