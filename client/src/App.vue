<template>
  <div id="app">
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
	background: url(./assets/background-min.jpeg);
	height: 100vh;
	width: 100vw;
}
</style>
