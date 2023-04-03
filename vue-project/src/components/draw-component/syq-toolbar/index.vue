<script setup lang="ts">
import SyqImports from "./tool/import.vue";
import SyqExports from "./tool/exports.vue";
import SyqPreviews from "./tool/previews.vue";
import SyqAligns from "./tool/aligns.vue";
import SyqScales from "./tool/scales.vue";
import SyqCommands from "./tool/commands.vue";
import SyqExternals from "./tool/externals.vue";
</script>

<template>
  <div class="syq-toolbar">
    <el-button-group>
      <SyqImports />
      <SyqExports />
      <SyqPreviews />
    </el-button-group>
     <SyqAligns />
     <SyqScales />
      <SyqCommands />
      <SyqExternals />
  </div>
</template>
