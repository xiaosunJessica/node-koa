<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue';
import Render from '../../../../components/render/index.vue'
import LC from '../../../../element-materials/core'
const rootRef = ref();
let renderStyles = ref()
const getOffset = (target: any) => {
  let totalLeft = null
  let totalTop = null
  let par = target.offsetParent
  totalLeft += target.offsetLeft
  totalTop += target.offsetTop
  while (par) {
    if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
      // 不是IE8我们才进行累加父级参照物的边框
      totalTop += par.clientTop
      totalLeft += par.clientLeft
    }
    totalTop += par.offsetTop
    totalLeft += par.offsetLeft
    par = par.offsetParent
  }
  return { left: totalLeft, top: totalTop }
}
const calcRenderStyles = () => {
  const {
    top
  } = getOffset(rootRef.value)

  const {
    width
  } = rootRef.value.getBoundingClientRect()

  // renderStyles.value = {
  //   width: `${width - 40}px`,
  //   'min-height': `calc(100vh - ${(top || 0) + 25}px)`
  // }
}
const props = defineProps({
  operation: {
    type: String,
    required: true
  }
})

onMounted(() => {
  calcRenderStyles()
})

const isTips = computed(() => {
  LC.getRoot()
  return false
})

</script>

<template>
  <div v-if="isTips"></div>
  <div
    ref="rootRef"
    id="lesscodeDrawHorizontalWrapper"
    :class="$style['horizontal-wrapper']">
    <div
      id="lesscodeDrawVerticalWrapper"
      :class="$style['vertical-wrapper']">
   <render
      v-show="props.operation === 'edit'"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped module>
  .horizontal-wrapper{
    background: #fff;
    background-clip: content-box;
    position: relative;
    margin: 0 20px 20px;
    padding-top: 20px;
    height: 100%;
    overflow: auto;
  }

  .vertical-wrapper{
    background: #fff;
  }
</style>