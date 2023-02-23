<script setup lang="ts">
// import { RouterView } from "vue-router";
import SyqToolbar from "./components/syq-toolbar/index.vue";
import SyqMenu from "./components/syq-menu/index.vue";
import SyqDesigner from "./components/syq-designer/index.vue";
import SyqPanel from "./components/syq-panel/index.vue";
</script>

<template>
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

  <!-- <RouterView /> -->
</template>

<style scoped></style>
