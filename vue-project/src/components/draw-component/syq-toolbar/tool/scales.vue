<!-- filename: scales.vue -->
<script setup lang="ts">
import { onBeforeMount, reactive } from "vue";
import EventEmitter from "@/utils/EventEmitter";
const state = reactive<{
  currentScale: number;
  _canvas: any;
}>({
  currentScale: 1,
  _canvas: {},
});

onBeforeMount(() => {
  EventEmitter.on("modeler-init", (modeler: any) => {
    console.log(modeler, '----mode00000')
    try {
      state._canvas = modeler.get("canvas");
      state.currentScale = state._canvas.zoom();
    } finally {
      modeler.on("canvas.viewbox.changed", ({ viewbox }: { viewbox: any }) => {
        state.currentScale = viewbox.scale;
      });
    }
  });
});

function zoomReset(newScale: any) {
  state._canvas &&
    state._canvas.zoom(
      newScale,
      newScale === "fit-viewport" ? undefined : { x: 0, y: 0 }
    );
}
function zoomOut(newScale: any) {
  state.currentScale =
    newScale || Math.floor(state.currentScale * 100 - 0.1 * 100) / 100;
  zoomReset(state.currentScale);
}
function zoomIn(newScale?: any) {
  state.currentScale =
    newScale || Math.floor(state.currentScale * 100 + 0.1 * 100) / 100;
  zoomReset(state.currentScale);
}
</script>
<template>
  <el-button-group>
    <el-button
      v-r-popover:zoomOut
      class="el-button__no-padding"
      @click="zoomOut"
    >
      <lucide-icon name="ZoomOut" :size="16" />
      <el-popover
        ref="zoomOut"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
        content="缩小视图"
      />
    </el-button>
    <el-button v-r-popover:zoomReset @click="zoomReset('fit-viewport')">
      >
      <span style="text-align: center; display: inline-block; width: 40px">
        {{ Math.floor(state.currentScale * 10) * 10 + "%" }}
      </span>
      <el-popover
        ref="zoomReset"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
        content="重置缩放"
      />
    </el-button>
    <el-button
      v-r-popover:zoomIn
      class="el-button__no-padding"
      @click="zoomIn()"
    >
      <lucide-icon name="ZoomIn" :size="16" />
      <el-popover
        ref="zoomIn"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
        content="放大视图"
      />
    </el-button>
  </el-button-group>
</template>
