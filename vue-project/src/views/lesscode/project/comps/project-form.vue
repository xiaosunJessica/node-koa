<script setup lang='ts'>
  import { reactive, computed, defineProps } from 'vue';
  import layoutThumbList from './layout-thumb-list.vue';
  const props = defineProps<{
    type: any,
    formData: any
    defaultLayoutList: any
  }>()
  const state = reactive<{
    formData: any
    formLayoutList: any[]
  }>({
    formData: props.formData,
    formLayoutList: props.defaultLayoutList
  })

  const formRules = {
    projectName: [
      {
        regex: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
        message: '由汉字，英文字母，数字组成，20个字符以内',
        trigger: 'blur'
      }
    ],
    projectCode: [
      {
        regex: /^[a-z]{1,16}$/,
        message: '只能由小写字母组成, 16个字符以内',
        trigger: 'blur'
      }
    ],
    projectDesc: [
      {
        required: true,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  }

  const formType = computed(() => {
    return props.type === 'templateProject' ? 'vertical' : 'horizontal'
  })
  const handleLayoutDefault = () => {

  }

  const handleLayoutChecked = () => {

  }

</script>

<template>
  <el-form ref="infoForm" :label-width="type === 'newProject' ? 86 : 120" :rules="formRules" :model="state.formData" :form-type="formType">
    <el-form-item label="应用名称" required property="projectName" error-display-type="normal">
      <el-input maxlength="60" v-model.trim="state.formData.projectName" placeholder="由汉字，英文字母，数字组成，20个字符以内" />
    </el-form-item>
     <el-form-item label="应用ID" required property="projectCode" error-display-type="normal">
          <el-input maxlength="60" v-model.trim="state.formData.projectCode"
              placeholder="由小写字母组成，长度小于16个字符，该ID将作为自定义组件前缀，创建后不可更改">
          </el-input>
      </el-form-item>
      <el-form-item label="应用简介" required property="projectDesc" error-display-type="normal">
          <el-input
              v-model.trim="state.formData.projectDesc"
              :type="'textarea'"
              :rows="3"
              :maxlength="100"
              placeholder="请输入">
          </el-input>
      </el-form-item>
      <el-form-item label="导航布局" style="margin-top: 10px" v-if="type === 'newProject'" error-display-type="normal">
          <span class="layout-desc">可多选，作为创建应用页面时可供选择的导航布局，便于在应用中统一配置导航</span>
          <layout-thumb-list :list="state.formLayoutList" @change-checked="handleLayoutChecked" @set-default="handleLayoutDefault" />
      </el-form-item>
  </el-form>
</template>

<style lang='scss' scoped>

</style>