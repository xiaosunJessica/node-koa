<template>
  <div :class="['container', showMenu ? 'perspective' : '']">
		<main :class="['content', showMenu ? 'animate' : '']">
			<header>
				<ul>
					<li @click="onClickMenu()">
						<i class="iconfont icon-menu" />
						<i>MENU</i>
					</li>
					<li @click="logout">
						<i>退出</i>
					</li>
				</ul>
			</header>
			<div class="wrapper">
				<div class="image">
					<p class="welcome">Welcome to study node + koa + mongo + vue</p>
				</div>
			</div>
		</main>
		<nav class = "nav">
			<ul>
				<li>
					<router-link to="/manage/list">后台管理</router-link>
				</li>
			</ul>
		</nav>
  </div>
</template>

<script>
	import { removeCookie } from "../../utils/cookie.js";
	export default {
		name: 'Home',
		data: () => ({
			showMenu: false
		}),
		methods: {
			onClickMenu() {
				this.showMenu = !this.showMenu;
			},
			logout() {
				removeCookie('token');
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
	}
	header {
		height: 72px;
		width: 100%;
		z-index: 999;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 11;
		ul > li {
			display: inline-block;
			line-height: 72px;
			height: 72px;
			vertical-align: middle;
			padding: 0 72px;
			background: white;
		}
	}
	.nav {
		z-index: 5;
		margin: 5%;
	}
	.wrapper {
		position: absolute;
    top: 0;
    left: 0;
		width: 100%;
		height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    background-size: cover;
		background-position: center center;
		z-index: 10;
	}
	.image {
    background-image: url('../../assets/background.jpg');
    background-size: cover;
    background-position: center center;
		background-repeat: no-repeat;
		min-width: 100%;
		min-height: 100%;
		position: absolute;
		.welcome {
			position: absolute;
			font-size: 60px;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: #ffffff;
		}
	}
	a {
		text-decoration: none;
	}
	.perspective {
		position: fixed;
		width: 100%;
		height: 100vh;
		perspective: 1500px;
	}
	.animate {
		transform: translateZ(0px) translateX(10%) rotateY(-50deg);
	}
</style>