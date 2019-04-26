<template>
  <el-container>
    <el-header>
			<span>后台管理</span>
			<el-badge v-if="noticeNum" :value="noticeNum" class="item">
				<i class="el-icon-bell" />
			</el-badge>
			<router-link class="goBack" to="/home"><i class="el-icon-arrow-left"/>返回</router-link>
		</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item index="1-1">
              <router-link to="/manage/add">新增</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
              <router-link to="/manage/list">列表</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
				noticeNum: 0,
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称'}
          ]
        }
      }
		},
		mounted() {
			// 初始化一个WebSocket对象，可接受两个参数
			// 第一个参数是ws协议的WebSocket的连接地址，也可以是wss的安全连接地址，第二个参数是可接受的子协议，如STOMP协议
			let ws = new WebSocket("ws://localhost:3000/ws/notice");
			// WebSocket连接成功触发事件
			const _this = this;
			ws.onopen = function () {
				// 使用 send() 方法发送数据
				ws.send("发送数据");
			};
			// 接收服务端数据触发事件
			ws.onmessage = function (event) {
				_this.$data.noticeNum = event.data;
			};
			// 连接断开触发事件
			ws.onclose = function () {
			};
			// 主动关闭WebSocket连接
			// ws.close()
		},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit')
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
	.el-header {
		display: flex;
    justify-content: space-between;
    align-items: center;
		font-size: 32px;
		box-shadow: 0px 0px 12px #eeeeee;
		margin-bottom: 10px;
		.goBack {
			font-size: 16px;
			text-decoration: none;
		}
	}
  .content {
    width: 640px;
  }
</style>