<script setup lang="ts">
import initModeler from "./initModeler";
import moduleAndExtensions from "./moduleAndExtensions";
import { createNewDiagram } from "@/utils/xml";
import { debounce } from "min-dash";
var getEditor: any = {}
function bgClass() {
  const bg = getEditor.bg;
  if (bg === "grid-image") return "designer-with-bg";
  if (bg === "image") return "designer-with-image";
  return "";
}

const reloadProcess = debounce(async function (setting: any, oldSetting: any) {
  const modelerModules = moduleAndExtensions(setting);

  await this.$nextTick();
  const modeler = initModeler(this.$refs.designerRef, modelerModules, this);
  if (!oldSetting || setting.processEngine !== oldSetting.processEngine) {
    await createNewDiagram(modeler);
  } else {
    await createNewDiagram(modeler, this.xml, setting);
  }
}, 100)
</script>
<template>
  <div
    :class="['bpmn-designer', bgClass]"
    ref="designerRef"
></div>
</template>


