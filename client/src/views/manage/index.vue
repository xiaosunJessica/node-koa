<template>
  <el-container>
    <el-header>
			<span>后台管理</span>
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