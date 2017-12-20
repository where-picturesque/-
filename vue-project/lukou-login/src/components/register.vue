<template>
	<div class="register">
		<form method="post" action="http://localhost:3000/register">
			<div class="username">
				<span>用户名</span>
				<input type="text" name="username" id="username">
			</div>
			<div class="password">
				<span>密码</span>
				<input type="password" name="password" id="password">
			</div>
			<div class="email">
				<span>邮箱</span>
				<input type="text" name="email" id="email">
			</div>
			<button class="btn btn-reg" @click="register">注册</button>
		</form>
	</div>
</template>

<script>
import axios from "axios"
export default {

  name: 'login',

  data () {
    return {

    }
  },
  methods:{
  	register(){
  		// alert(1)
  		var user=document.querySelector("#username").value;
  		var pwd=document.querySelector("#password").value;
  		var email=document.querySelector("#email").value;
  		axios.post("/register",{
  			username:user,
  			password:pwd,
  			email:email
  		}).then(res=>{
  			console.log(res)
  		})
  	}
  }
}
</script>

<style lang="scss" >
.register{
	width:5rem;
	margin:0 auto;
}
</style>