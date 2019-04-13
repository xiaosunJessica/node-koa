<template>
  <div class="container">
    <div class="panda" />
    <el-form :model="ruleForm" ref="ruleForm" label-width="60px">
      <el-form-item label="用户名" class="username" prop="username">
        <el-input class="input-username" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <span class="forget">忘记密码？</span>
          <router-link to="/register" class="register">注册</router-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')" class="btn-login">登录</el-button>
      </el-form-item>
			<div class="icon-groups">
				<a href="https://github.com/login/oauth/authorize?client_id=f2662b7c806033f69284&scope=user,public_repo"><img class="icon-login" src="../assets/github.jpg" alt="" /></a>
			</div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      ruleForm: {
        username: '',
        password: ''
      }
    }
  },
  props: {
    msg: String
  },
  methods:{
    login(){
      this.$http.post('/user/login', {
       username: this.ruleForm.username,
       password: this.ruleForm.password
     }).then(res => {
       if (res.success) {
         window.localStorage.setItem(`bear`, res.token);
         this.$router.push('/home')
       }
     })
    },
    register() {
    
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 320px;
  height: 350px;
  margin: 0 auto;
  background: #FFFFFF;
  transform: translate(-50%, 50%);
  border-radius: 4px;
	position: relative;
}

.panda {
  position: absolute;
  left: 55px;
  top: -140px;
  background: url('../assets/panda.png');
  background-size: contain;
  width: 250px;
  height: 200px; 
}

.forget {
  float: left;
  font-size: 12px;
}

.register {
  float: right;
  font-size: 12px;
}

.btn-login {
  width: 100%;
}

.username:focus-within .input-username {
  border-color: red;
} 

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.icon-groups {
	text-align: center;
}
.icon-login {
	width: 64px;
}
</style>
