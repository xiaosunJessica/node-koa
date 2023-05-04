<script  setup lang='ts'>
import { reactive } from 'vue'
import draggable from 'vuedraggable'
import ResolveComponent from './resolve-component.vue'
import LC from '../../../../element-materials/core'

const props = defineProps({
  list: {
    type: Array,
    required: false,
    default: null
  },
  componentData: {
    type: Object,
    required: true
  },
  ghostClass: String,
  group: {
    type: Object,
    required: true
  }
})

const state = reactive({
  dragGroup: props.group,
  styles: {}
})
const handleChoose = () => {

}

const handleUnchoose = () => { }
const handleStart = () => {

}
const handleEnd = () => { }
const handleAdd = () => { }
const handleSort = () => { }
const handleChange = (event: any) => {
  let operationNode: any = null
  const triggerEvent = {
    target: props.componentData,
    type: '',
    child: null
  }
  if (event.added) {
    operationNode = event.added.element
    triggerEvent.type = 'appendChild'
    // 拖动组件需要重置会影响排版的样式
    operationNode.setStyle({
      position: '',
      top: '',
      right: '',
      bottom: '',
      left: '',
      zIndex: '',
      marginTop: '',
      marginRight: '',
      marginBottom: '',
      marginLeft: ''
    })
    setTimeout(() => {
      // 新加的组件默认选中
      operationNode.active()
    }, 100)
  } else if (event.removed) {
    operationNode = event.removed.element
    triggerEvent.type = 'removeChild'
  } else if (event.moved) {
    operationNode = event.moved.element
    triggerEvent.type = 'moveChild'
  }

  triggerEvent.child = operationNode
  LC.triggerEventListener(triggerEvent.type, triggerEvent)
  LC.triggerEventListener('update', triggerEvent)
  // fix: vue-draggable 内部索引不更新的问题
  // this.$refs.draggable.computeIndexes()
  // this.$emit('change', event)
}
</script>
<template>
    <draggable
        :class="$style['drag']"
        :list="props.list"
        :group="state.dragGroup"
        :chosen-class="$style['chosen']"
        :ghost-class="props.ghostClass || $style['ghost']"
        :style="state.styles"
        filter="[data-render-drag='disabled']"
        @choose="handleChoose"
        @unchoose="handleUnchoose"
        @start="handleStart"
        @end="handleEnd"
        @add="handleAdd"
        @onSort="handleSort"
        @change="handleChange"
        v-bind="$attrs">
       <template #item="{ element }">
         <resolve-component
            v-if="!element.isInteractiveComponent"
            ref="component"
            :key="element.renderKey"
            :component-data="element" />
        <!-- 交互式组件 -->
        <resolve-interactive-component
            v-else
            :key="element.renderKey"
            :component-data="element" />
      </template>
    </draggable>
</template>

<style lang="scss" module>
    .drag{
        position: relative;
        width: 100%;
        height: 100%;
        pointer-events: auto !important;
        &:empty{
            min-height: 34px;
        }
    }
    .chosen{
        opacity: .9;
    }
    .ghost{
        margin-bottom: 5px;
        &:after {
            content: "放在这里";
            display: block;
            height: 24px;
            padding: 0 5px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 24px;
            background-color: #C2D7F9;
        }
        &:global(.inline),
        &:global(.inline-block) {
            display: inline-block;
            vertical-align: sub;
            &:after {
                width: 60px;
                display: inline-block;
                position: relative;
            }
        }
        &:global(.block) {
            display: block;
            &:after {
                top: 0;
                display: inline-block;
                width: 100%;
                position: relative;
            }
        }
        & > * {
            display: none !important;
        }
    }
</style>
