<script setup></script>
<template>
  <el-button-group>
    <el-button v-r-popover:undo class="el-button__no-padding" @click="undo">
      <lucide-icon name="Undo2" :size="16" />
      <el-popover
        ref="undo"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
        content="撤销"
      />
    </el-button>
    <el-button v-r-popover:redo class="el-button__no-padding" @click="redo">
      <lucide-icon name="Redo2" :size="16" />
      <el-popover
        ref="redo"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
        content="恢复"
      />
    </el-button>
    <el-button
      v-r-popover:restart
      class="el-button__no-padding"
      @click="restart"
    >
      <lucide-icon name="Eraser" :size="16" />
      <el-popover
        ref="restart"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
        content="擦除重做"
      />
    </el-button>
  </el-button-group>
</template>
