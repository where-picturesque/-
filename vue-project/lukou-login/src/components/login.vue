<template>
	<div class="login">
		<!--   -->
		<form method="post" action="http://localhost:3000/login" >
			<div class="username">
				<span>用户名:</span>
				<input type="text" name="username" id="username">
			</div>
			<div class="password">
				<span>密码: </span>
				<input type="text" name="password" id="password">
			</div>
			<button class="btn btn-log" @click="login">登录</button>
		</form>
	</div>
</template>

<script>
export default {

  name: 'login',

  data () {
    return {

    }
  },
  methods:{
  	login(){
  		var user=document.querySelector("#username").value;
  		var pwd=document.querySelector("#password").value;
  		console.log(user)
  		alert(user)
  		fetch("/login",{
  			method:'post',
            headers: {
                "Content-Type": "application/json"
               },
            body: JSON.stringify({
	  			username:user,
	  			password:pwd
  			})
  		}).then(res=>res.json()).then(res=>{
  			console.log(res)
  		})
  	}
  }
}
</script>

<style lang="scss" >
.login {
	margin:0 auto;
	width:5rem;
	font:16px/20px "";
	
	
}
input{
	height:.5rem;
	border:1px solid  #ddd;
	margin-bottom:.5rem;
	outline:none;
		}
	.btn{
		border:0px;
		padding:.1rem;
		font:14px/20px "";
	}

</style>