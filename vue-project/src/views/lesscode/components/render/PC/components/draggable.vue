<script  setup lang='ts'>
import { reactive } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  list: {
    type: Array,
    required: false,
    default: null
  },
  // componentData: {
  //   type: Object,
  //   required: true
  // },
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
const handleChange = () => { }
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
          <div>
             {{element}}
          </div>
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
