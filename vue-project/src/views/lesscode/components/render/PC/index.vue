<script setup lang='ts'>
import Draggable from './components/draggable.vue';
import LC from '../../../element-materials/core'
import ResolveComponent, { setMousedown } from './resolve-component.vue'
const  componentData: any = LC.getRoot()
console.log(componentData, 'componentDatacomponentData', componentData?.children?.length < 1)
const handleCanvaseClick = () => {

}

const handleMouseleave = () => {

}

const handleShowContextmenu = () => {}
</script>

<template>
   <layout>
      <div
          id="drawTarget"
          ref="root"
          :class="{
            [$style['canvas']]: true,
            [$style['empty']]: componentData?.children?.length < 1
          }"
          @click="handleCanvaseClick"
          @mouseleave="handleMouseleave"
          @contextmenu.stop="handleShowContextmenu">
          <draggable
            ref="dragArea"
            class="target-drag-area"
            :class="[$style['drag-area']]"
            :component-data="componentData"
            :list="componentData?.slot?.default || []"
            :sort="true"
            :group="{
                name: 'layout',
                pull: true,
                put: true
              }">
            <template v-for="componentNode in componentData?.slot?.default">
                <!-- root 的子组件只会是布局组件和交互式组件 -->
                <!-- 布局组件 -->
                <resolve-component
                    v-if="!componentNode.isInteractiveComponent"
                    ref="component"
                    :key="componentNode.renderKey"
                    :component-data="componentNode" />
                <!-- 交互式组件 -->
                <!-- <resolve-interactive-component
                    v-else
                    :key="componentNode.renderKey"
                    :component-data="componentNode" /> -->
            </template>
        </draggable>
          <!-- <lesscode-focus />
          <lesscode-tools />
          <lesscode-resize />
          <lesscode-margin /> -->
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