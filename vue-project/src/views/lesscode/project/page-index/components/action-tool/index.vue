<script setup lang='ts'>
import ShowFunction from './components/show-function/index.vue'
import SaveCanvas from './components/save-canvas/index.vue'
import Preview from './components/preview/index.vue'
import ClearCanvas from './components/clear-canvas/index.vue'
import QuickOperation from './components/quick-operation/index.vue'
</script>

<template>
  <div class="action-tool-list">
      <show-function />
      <div class="func-split-line" />
      <save-canvas />
      <preview />
      <!-- <save-as-template v-if="iamNoResourcesPerm[$IAM_ACTION.manage_template[0]]" /> -->
      <clear-canvas />
      <quick-operation />
  </div>
</template>

<style lang='scss' scoped>
  .action-tool-list{
      display: flex;
      align-items: center;
      height: 100%;
  }
  .func-split-line {
      height: 22px;
      width: 1px;
      margin-left: 5px;
      background-color: #dcdee5;
  }
</style>