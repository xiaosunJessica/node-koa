<script setup>
function downloadProcessAsBpmn() {
  this.downloadProcess("bpmn");
}
function downloadProcessAsXml() {
  this.downloadProcess("xml");
}
function downloadProcessAsSvg() {
  this.downloadProcess("svg");
}
</script>
<template>
  <el-popover
    ref="popover"
    placement="bottom"
    popper-class="button-popover"
    trigger="hover"
  >
    <template #reference>
      <el-button v-popover:popover type="primary"> 导出文件 </el-button>
    </template>
    <div class="button-list_column">
      <el-button type="primary" @click="downloadProcessAsBpmn"
        >导出为 Bpmn</el-button
      >
      <el-button type="primary" @click="downloadProcessAsXml"
        >导出为 XML</el-button
      >
      <el-button type="primary" @click="downloadProcessAsSvg"
        >导出为 SVG</el-button
      >
    </div>
  </el-popover>
</template>
