<template>
  <div id="app">
    <img alt="Vue logo" src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png">
    <Login msg="登录"/>
  </div>
</template>

<script>
import Login from './views/Login.vue'

export default {
  name: 'app',
  components: {
    Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
	background: rgba(0, 0, 0, .3);
	height: 100vh;
	width: 100vw;
}
</style>
