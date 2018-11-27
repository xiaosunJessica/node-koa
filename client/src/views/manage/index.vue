<template>
 	<el-container>
		<el-header>后台管理</el-header>
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
			<el-main><router-view></router-view></el-main>
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