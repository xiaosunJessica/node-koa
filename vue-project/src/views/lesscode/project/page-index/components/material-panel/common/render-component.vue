<script setup lang='ts'>
import { defineProps, computed } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
const displayClass = computed(() => {
   if(props.data.renderStyles && props.data.renderStyles.display) {
    return props.data.renderStyles.display
  }
  return ''
})
</script>

<template>
  <div class="render-drag-item" :class="displayClass">
    <div class="component-icon">
        <el-icon>
          <component :is="props.data.icon" />
        </el-icon>
    </div>
    <div class="component-name">{{ props.data.displayName }}</div>
    <slot />
</div>
</template>

<style lang='scss' scoped>

</style>