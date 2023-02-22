<script setup>
</script>
<template>
  <el-button-group>
    <template v-for="(btn, index) in buttons">
      <el-button
        v-r-popover:popover="index"
        class="el-button__no-padding"
        :tag="btn.key"
        @click="alignElements(btn.key)"
      >
        <lucide-icon
          :name="btn.icon"
          :size="16"
        />
        <el-popover
          ref="popover"
          placement="bottom"
          trigger="hover"
          popper-class="button-popover"
          :content="btn.name"
        />
      </el-button>
    </template>
</el-button-group>
</template>