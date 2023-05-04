<template>
    <div
      ref="componentRoot"
      :class="{
          [$style['component']]: true,
          [$style['precent-width']]: state.fixPercentStyleWidth,
          [$style['precent-height']]: state.fixPercentStyleHeight,
          'bk-layout-custom-component-wrapper': componentData.isCustomComponent,
          [$style['component-root']]: true
      }"
      role="component-root"
      :style="Object.assign({}, componentData.style, state.safeStyles)"
      v-bind="{
          [componentData.componentId]: '',
          ...state.bindAttrsAlign
      }"
      @mousedown.stop="handleMousedown"
      @mousemove="handleMousemove"
      @mouseup="handleMouseup"
      @click.stop="handleClick"
      @dblclick.stop="handleDBClick"
      @contextmenu.stop="handleShowContextmenu">
      <render-component
          :ref="componentData.componentId"
          :component-data="componentData"
          :test="1234" />
    </div>
</template>


<script setup lang="ts">
import { reactive  } from 'vue';
import RenderComponent from './render-component.vue'
defineProps({
  componentData: {
    type: Object,
    required: true
  },
  attachToFreelayout: {
    type: Boolean,
    default: false
  }
})


const safeStyles = {
  // fix: 影响子元素排版
  display: 'block',
  'padding': '',
  'padding-top': '',
  'padding-right': '',
  'padding-bottom': '',
  'padding-left': '',
  'line-height': '',
  'letter-spacing': '',
  'word-spacing': '',
  'text-align': '',
  'text-decoration': '',
  'text-indent': '',
  'text-overflow': '',
  'text-rendering': '',
  'text-size-adjust': '',
  'text-shadow': '',
  'text-transform': '',
  'word-break': '',
  'word-wrap': '',
  'white-space': '',
  // fix: 父子元素效果叠加
  'background': '',
  'background-attachment': '',
  'background-color': '',
  'background-image': '',
  'background-position': '',
  'background-repeat': '',
  'background-size': '',
  'border': '',
  'border-image': '',
  'border-collapse': '',
  'border-color': '',
  'border-top': '',
  'border-right': '',
  'border-bottom': '',
  'border-left': '',
  'border-top-color': '',
  'border-right-color': '',
  'border-bottom-color': '',
  'border-left-color': '',
  'border-spacing': '',
  'border-style': '',
  'border-top-style': '',
  'border-right-style': '',
  'border-bottom-style': '',
  'border-left-style': '',
  'border-width': '',
  'border-top-width': '',
  'border-right-width': '',
  'border-bottom-width': '',
  'border-left-width': '',
  'border-radius': '',
  'border-top-right-radius': '',
  'border-bottom-right-radius': '',
  'border-bottom-left-radius': '',
  'border-top-left-radius': '',
  'border-radius-topright': '',
  'border-radius-bottomright': '',
  'border-radius-bottomleft': '',
  'border-radius-topleft': '',
  opacity: ''
}

const state = reactive({
    bindAttrsAlign: {},
    // 默认会继承组件的 style 配置，如果直接继承有些样式会造成排版问题需要重置
    safeStyles: Object.assign({}, safeStyles),
    // 百分比宽度时需要修正相对父级的值
    fixPercentStyleWidth: false,
    // 百分比高度时需要修正相对父级的值
    fixPercentStyleHeight: false
})

const handleMousedown = () => {

}

const handleMousemove = () => {}

const handleMouseup = () => {}

const handleClick = () => {}

const handleDBClick = () => {}

const handleShowContextmenu = () => {}

</script>
<style lang="scss" module>
    .component {
        position: relative;
        min-height: 10px;
        pointer-events: auto !important;
        cursor: pointer;
        &.component-root {
            border: 1px solid transparent;
        }
        &.precent-width{
            & > * {
                width: 100% !important;
            }
        }
        &.precent-height{
            & > * {
                height: 100% !important;
            }
        }
        &[align-horizontal-left],
        &[align-horizontal-center],
        &[align-horizontal-right],
        &[align-horizontal-space-between]{
            & > div{
                display: flex !important;
                align-items: flex-start;
                flex-wrap: wrap;
                & > * {
                    flex-shrink: 0;
                }
            }

        }
        &[align-horizontal-left]{
            & > div{
                justify-content: flex-start;
            }
        }
        &[align-horizontal-center]{
            & > div{
                justify-content: center;
            }
        }
        &[align-horizontal-right]{
            & > div{
                justify-content: flex-end;
            }
        }
        &[align-horizontal-space-between]{
            & > div{
                justify-content: space-between;
            }
        }
        &[align-vertical-top],
        &[align-vertical-center],
        &[align-vertical-bottom]{
            & > div{
                display: flex !important;
                flex-wrap: wrap;
                & > * {
                    flex-shrink: 0;
                }
            }

        }
        &[align-vertical-top]{
            & > div{
                align-items: flex-start;
            }
        }
        &[align-vertical-center]{
            & > div{
                align-items: center;
            }
        }
        &[align-vertical-bottom]{
            & > div{
                align-items: flex-end;
            }
        }
    }
</style>
