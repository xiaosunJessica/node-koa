<template>
  <div :class="['container', showMenu ? 'animate perspective' : '']">
		<main class = "content">
			<header>
				<ul>
					<li @click="onClickMenu()">
						<i class="iconfont icon-menu" />
						<i>MENU</i>
					</li>
					<li>
						<router-link to="/manage/list">管理</router-link>
					</li>
					<li>
						<router-link to="/list">列表</router-link>
					</li>
					<li @click="logout">
						<i>退出</i>
					</li>
				</ul>
			</header>
			<div class="wrapper">
				<div class="image" />
				<div>1234455</div>
				<div>1234455</div>
				<div>1234455</div>
				<div>1234455</div>
				<div>1234455</div>
			</div>
		</main>
		<nav class = "nav">123</nav>
  </div>
</template>

<script>
	export default {
		name: 'User',
		data: () => ({
			showMenu: false
		}),
		methods: {
			onClickMenu() {
				this.showMenu = !this.showMenu;
			},
			logout() {
				localStorage.clear();
				this.$router.push('/login')
			}
		}
	}
</script>

<style>
	.container {
		width: 100vw;
	}
	header {
		height: 72px;
		width: 100%;
		z-index: 999;
		position: relative;
	}
	li {
		line-height: 72px;
		padding: 0 72px;
		background: white;
	}
	.nav {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
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
	}
	.image {
    background-image: url('../../assets/background.jpg');
    background-size: cover;
    background-position: center center;
		background-repeat: no-repeat;
		width: 100%;
		height: 100%;
	}
	.perspective {
		width: 100%;
		height: 100%;
		perspective: 1500px;
	}
	.animate {
		transform: translateZ(0px) translateX(10%) rotateY(-50deg);
	}
</style>