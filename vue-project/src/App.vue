<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SyqToolbar from './components/syq-toolbar/index.vue'
import SyqMenu from './components/syq-menu/index.vue'
import SyqDesigner from './components/syq-designer/index.vue'
import SyqPanel from './components/syq-panel/index.vue'
</script>

<template>
  <div class="wrapper">
    <SyqToolbar msg="You did it!" />
    <div class="main-content">
      <SyqDesigner />
      <SyqPanel />
    </div>
    <SyqMenu />
    
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
  </div>

  <RouterView />
</template>

<style scoped>
</style>
