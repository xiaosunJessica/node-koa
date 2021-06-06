<template>
  <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm">
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="数量">
      <el-input v-model="ruleForm.count"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
					name: '',
          count: 0
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称'}
          ]
        }
      }
		},
		mounted() {
			this.$http.get('/project/detail', {
				params: {
					id: this.$route.params.id
				}
			}).then(res => {
				const { data } = res;
				this.ruleForm = {
					name: data[0].name,
          count: data[0].count
				}
			})
		},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/project/edit', {
							name: this.ruleForm.name,
							count: this.ruleForm.count,
							id: this.$route.params.id
            }).then(res => {
							if (res.success) {
								this.$router.push('/manage/list');
							}
						})
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
  .el-form {
    width: 640px;
  }
</style>


