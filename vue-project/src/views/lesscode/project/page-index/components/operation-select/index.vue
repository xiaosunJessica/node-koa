<script setup lang='ts'>
  const handleChange = (value: any) => {

  }
  const value = '';
</script>

<template>
 <div class="operation-select">
    <div
        class="select-item"
        :class="{ active: value === 'edit' }"
        @click="handleChange('edit')">
        <i class="el-drag-icon el-drag-huabu" />
        <span>画布</span>
    </div>
    <div
        class="select-item"
        :class="{ active: value === 'vueCode' }"
        @click="handleChange('vueCode')">
        <i class="el-drag-icon el-drag-yuanma" />
        <span>源码</span>
    </div>
    <div
        class="select-item"
        :class="{ active: value === 'jsonSource' }"
        @click="handleChange('jsonSource')">
        <i class="el-drag-icon el-drag-json" />
        <span>JSON</span>
    </div>
    <div
        class="select-item"
        :class="{ active: value === 'pageFunction' }"
        @click="handleChange('pageFunction')">
        <i class="el-drag-icon el-drag-yemianhanshu" />
        <span>页面函数</span>
    </div>
    <div
        class="select-item"
        :class="{ active: value === 'pageVariable' }"
        @click="handleChange('pageVariable')">
        <i class="el-drag-icon el-drag-page-variable" />
        <span>页面变量</span>
    </div>
    <div
        class="select-item"
        :class="{ active: value === 'setting' }"
        @click="handleChange('setting')">
        <i class="el-drag-icon el-drag-set" />
        <span>页面设置</span>
    </div>
</div>
</template>

<style lang='scss' scoped>
  .operation-select{
    display: flex;
    height: 100%;
    .select-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        height: 100%;
        cursor: pointer;
        min-width: 60px;
        margin-right: 10px;
        &:hover,
        &.active {
            background-color: #e1ecff;
            color: #3a84ff;
        }
        i {
            font-size: 16px;
            margin-bottom: 5px;
        }
    }
}
</style>