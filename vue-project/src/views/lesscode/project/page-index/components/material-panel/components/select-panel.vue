<script setup lang='ts'>
import { defineProps, defineEmits } from 'vue'
const $emits = defineEmits(['input', 'change'])
defineProps({
   value: String
})

const handleChange = (value: string) => {
  $emits('input', value)
  $emits('change', value)
}
</script>

<template>
  <div class="select-panel">
    <div
        class="tab-item"
        :class="{
          active: value === 'component'
        }"
        v-el-tooltips.right="'组件库'"
        role="component-panel-tab"
        @click="handleChange('component')">
       <el-icon><Menu /></el-icon>
    </div>
    <div
        class="tab-item"
        :class="{
          active: value === 'template'
        }"
        v-el-tooltips.right="'页面模板管理'"
        role="template-panel-tab"
        @click="handleChange('template')">
       <el-icon><Tools /></el-icon>
    </div>
    <div
        class="tab-item"
        :class="{
          active: value === 'tree'
        }"
        v-el-tooltips.right="'页面组件树'"
        role="component-tree-panel-tab"
        @click="handleChange('tree')">
        <el-icon><Histogram /></el-icon>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .select-panel{
      font-size: 14px;
      border-right: 1px solid #dcdee5;

      .tab-item{
          width: 100%;
          height: 42px;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover{
              color: #3a84ff;
          }
          &.active{
              background-color: #e1ecff;
              color: #3a84ff;
          }
      }
  }
</style>