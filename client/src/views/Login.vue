<template>
  <div class="container">
    <h1>{{ msg }}</h1>
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
          <span @click="register('ruleForm')" class="register">注册</span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')" class="btn-login">登录</el-button>
      </el-form-item>
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
         this.$router.push('/user')
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
  padding: 20px;
  background: #FFFFFF;
  transform: translate(0, 50%);
  border-radius: 4px;
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
</style>
