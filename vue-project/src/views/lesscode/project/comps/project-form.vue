<script setup lang='ts'>
import { reactive, computed, defineProps, defineExpose, ref } from 'vue';
import layoutThumbList from './layout-thumb-list.vue';
const formRef = ref<any>(null)

const props = defineProps<{
  type: any,
  formData: any
  defaultLayoutList: any
}>()
const state = reactive<{
  formLayoutList: any[]
}>({
  formLayoutList: props.defaultLayoutList
})

const formData = reactive<{
  formData: any
}>({
  ...props.formData
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
const handleLayoutDefault = (layout: any) => {
  state.formLayoutList.forEach((item: any) => (item.isDefault = 0))
  layout.isDefault = 1
}

const handleLayoutChecked = (layout: any) => {
   layout.checked = !layout.checked
    if (!layout.checked && layout.isDefault) {
      layout.isDefault = 0
      state.formLayoutList.filter((item: any) => item.checked)[0].isDefault = 1
    }
}

 defineExpose({
  formRef,
  formData
})


</script>

<template>
  <div>
    <el-form ref="formRef" :label-width="type === 'newProject' ? 86 : 120" :rules="formRules" :model="formData" :form-type="formType">
      <el-form-item label="应用名称" required property="projectName" error-display-type="normal">
        <el-input maxlength="60" v-model.trim="formData.projectName" placeholder="由汉字，英文字母，数字组成，20个字符以内" />
      </el-form-item>
      <el-form-item label="应用ID" required property="projectCode" error-display-type="normal">
            <el-input maxlength="60" v-model.trim="formData.projectCode"
                placeholder="由小写字母组成，长度小于16个字符，该ID将作为自定义组件前缀，创建后不可更改">
            </el-input>
      </el-form-item>
      <el-form-item label="应用简介" required property="projectDesc" error-display-type="normal">
          <el-input
              v-model.trim="formData.projectDesc"
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
  </div>
</template>

<style lang='scss' scoped>

</style>