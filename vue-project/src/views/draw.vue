<script setup lang="ts">
  import SyqToolbar from "@/components/draw-component/syq-toolbar/index.vue"
  import SyqMenu from "@/components/draw-component/syq-menu/index.vue"
  import SyqDesigner from "@/components/draw-component/syq-designer/index.vue"
  import SyqPanel from "@/components/draw-component/syq-panel/syq-panel.vue"
</script>

<template>
  <SyqToolbar msg="You did it!" />
  <div class="main-content">
   <SyqDesigner />
      <SyqPanel />
  </div>
  <SyqMenu />

</template>

<style scoped></style>
