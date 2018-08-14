<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <el-form :model="ruleForm" ref="ruleForm" label-width="60px">
      <el-form-item label="用户名" class="username" prop="username">
        <el-input class="input-username" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        <el-button @click="register('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      ruleForm: {
        username: '1',
        password: '123'
      }
    }
  },
  props: {
    msg: String
  },
  methods:{
    login(){
     this.$http.post('http://localhost:3000/user/login', {
       username: this.ruleForm.username,
       password: this.ruleForm.password
     })
    },
    register(formName) {
      console.info(this.$refs[formName])
      console.info(this.ruleForm)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
	width: 320px;
	height: 370px;
	margin: 0 auto;
	padding: 20px;
	background: #FFFFFF;
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
