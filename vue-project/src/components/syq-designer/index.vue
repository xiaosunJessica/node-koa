<script setup lang="ts">
import initModeler from "./initModeler";
import moduleAndExtensions from "./moduleAndExtensions";
import { createNewDiagram } from "@/utils/xml";
import { debounce } from "min-dash";
import { defineProps, watch, reactive, nextTick, ref } from "vue";
import { mapGetters, useStore } from "vuex";
const designerRef = ref(null);
const props = defineProps({
  xml: {
    type: String,
    default: undefined,
  },
});

const store = useStore();

function bgClass() {
  const bg = store.state.editor.bg;
  console.log(store.state, store.state.editor)
  if (bg === "grid-image") return "designer-with-bg";
  if (bg === "image") return "designer-with-image";
  return "";
}

const reloadProcess = debounce(async function (setting: any, oldSetting: any) {
  console.log('---reloadoooooo')
  const modelerModules = moduleAndExtensions(setting);

  await nextTick();
  const modeler = initModeler(designerRef.value, modelerModules);
  if (!oldSetting || setting.processEngine !== oldSetting.processEngine) {
    await createNewDiagram(modeler);
  } else {
    await createNewDiagram(modeler, props.xml, setting);
  }
}, 100);


watch(store.state.editor, (value, oldValue) => {
  try {
    reloadProcess(value, oldValue);
  } catch (e) {
    console.log(e, '----eee----eee')
  }
})
</script>
<template>
  <div :class="['syq-designer', bgClass()]" ref="designerRef"></div>
</template>
