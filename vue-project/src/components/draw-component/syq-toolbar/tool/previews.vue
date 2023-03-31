<script setup>
var modelTitle, codeModelVisible;
function openXMLPreviewModel() {
  
}

function openJsonPreviewModel() {
  
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
      <el-button v-popover:popover type="primary"> 预览文件 </el-button>
    </template>
    <div class="button-list_column">
      <el-button type="primary" @click="openXMLPreviewModel"
        >预览 XML</el-button
      >
      <el-button type="primary" @click="openJsonPreviewModel"
        >预览 JSON</el-button
      >
    </div>
  </el-popover>

  <el-dialog
    :title="modelTitle"
    v-model:visible="codeModelVisible"
    width="72vw"
    append-to-body
    destroy-on-close
  >
    <div class="preview-model">
      <highlightjs :code="codeString" :language="codeLanguage" />
    </div>
  </el-dialog>
</template>
