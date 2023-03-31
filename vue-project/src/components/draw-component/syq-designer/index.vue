<script setup lang="ts">
import initModeler from "./initModeler";
import moduleAndExtensions from "./moduleAndExtensions";
import { createNewDiagram } from "@/utils/xml";
import { debounce } from "min-dash";
import { defineProps, watch, reactive, nextTick, ref, getCurrentInstance } from "vue";
// import { mapGetters, useStore } from "vuex";
const designerRef = ref(null);
const props = defineProps({
  xml: {
    type: String,
    default: undefined,
  },
});

// const store = useStore();

function bgClass() {
  // const bg = store.state.editor.bg;
  const bg = 'grid-image';
  if (bg === "grid-image") return "designer-with-bg";
  if (bg === "image") return "designer-with-image";
  return "";
}

const reloadProcess = debounce(async function (setting: any, oldSetting: any) {
  console.log('---reloadoooooo')
  const modelerModules = moduleAndExtensions(setting);

  await nextTick();
  const instance = getCurrentInstance()
  const modeler = initModeler(designerRef.value, modelerModules, instance);
  if (!oldSetting || setting.processEngine !== oldSetting.processEngine) {
    await createNewDiagram(modeler);
  } else {
    await createNewDiagram(modeler, props.xml, setting);
  }
}, 100);

// watch(
//   store.state.editor,
//   (value, oldValue) => {
//     try {
//       reloadProcess(value, oldValue);
//     } catch (e) {
//       console.log(e, '----eee----eee')
//     }
// }, {immediate: true, deep: true})

// getEditor: {
//   immediate: true,
//     deep: true,
//       handler: async function (value, oldValue) {
//         try {
//           this.reloadProcess(value, oldValue);
//         } catch (e) {
//           catchError(e);
//         }
//       }
// }
</script>
<template>
  <div :class="['syq-designer', bgClass()]" ref="designerRef"></div>
</template>
