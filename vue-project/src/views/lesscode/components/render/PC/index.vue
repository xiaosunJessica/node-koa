<script setup lang='ts'>
import { onMounted, ref, reactive } from 'vue';
import Draggable from './components/draggable.vue';
import LC from '../../../element-materials/core'
import LesscodeTools from './tools/lesscode-tool/index.vue'
const state = reactive({
  componentData: LC.getRoot() || { "componentId": "root-79620", "type": "root", "name": "root", "complex": false, "custom": false, "interactive": false, "renderDirectives": [], "renderEvents": {}, "renderProps": {}, "renderSlots": { "default": [] }, "renderStyles": {}, "renderAlign": {}, "renderPerms": [] },
  list: []
})
const rootRef = ref()
const handleCanvaseClick = () => {

}

const handleMouseleave = () => {

}

const handleShowContextmenu = () => {}

onMounted(() => {
  // componentData.value.mounted(rootRef)
  LC._mounted()
})
</script>

<template>
   <layout>
      <div
          id="drawTarget"
          ref="rootRef"
          :class="{
            [$style['canvas']]: true,
          }"
          @click="handleCanvaseClick"
          @mouseleave="handleMouseleave"
          @contextmenu.stop="handleShowContextmenu">
          <draggable
            ref="dragArea"
            class="target-drag-area"
            :class="[$style['drag-area']]"
            :list="state.list"
            :group="{
                name: 'layout',
                pull: true,
                put: true
              }">

        </draggable>
          <lesscode-focus />
          <lesscode-tools />
          <lesscode-resize />
          <lesscode-margin />
      </div>
      <!-- <div
          v-if="showNotVisibleMask"
          :class="$style['not-visible-mask']"
          @dblclick="maskDbCLickHandler">
          <p>{{ `该组件(${invisibleComponent})处于隐藏状态，请先打开` }}</p>
          <p class="mt20">双击继续操作页面其他组件</p>
      </div> -->
  </layout>
</template>

<style lang='scss' scoped module>
   .canvas{
      position: relative;
      z-index: 99999999 !important;
      min-height: calc(100% - 20px) !important;
      &.empty{
          &::before{
              content: "请拖入组件";
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              color: #C4C6CC;
              pointer-events: all;
          }
      }
    }
    .drag-area{
        padding-bottom: 300px;
        * {
            /* 规避一些组件内部因为设置了 pointer-events 导致鼠标事件非法触发 */
            pointer-events: none;
        }
    }
    .not-visible-mask{
        position: fixed;
        z-index: 99999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(0,0,0,0.8);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding-top: 100px;
        color: #fff;
    }
</style>