<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm">
			<el-form-item label="项目名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
  </div>
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
						alert('submit')
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