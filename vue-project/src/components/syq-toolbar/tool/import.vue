<script setup>
import { ref } from "vue";
const importRef = ref(null);

function openImportWindow() {
  importRef.value && importRef.value.click();
}
function changeImportFile() {
  try {
    if (importRef.value && importRef.value.files) {
      const file = importRef.value.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const xmlStr = this.result;
        getModeler() && getModeler().importXML(xmlStr);
      };
      importRef.value = null;
      importRef.value.files = null;
    }
  } catch (e) {
    catchError(e);
  }
}
</script>
<template>
  <el-button type="primary" @click="openImportWindow">
    打开文件
    <input
      type="file"
      ref="importRef"
      style="display: none"
      accept=".xml,.bpmn"
      @change="changeImportFile"
    />
  </el-button>
</template>
