<script setup lang='ts'>

</script>

<template>
  <div
    id="editPageLeftSideBar"
    class="draw-page-material-panel">
    <!-- <select-panel
        v-model="activePanel"
        class="panel-list"
        @on-change="handlePanelChange" />
    <div class="panel-content">
        <component :is="panelCom" />
    </div> -->
  </div>
</template>

<style lang='scss' scoped>
  .draw-page-material-panel {
      display: flex;
      position: relative;
      height: 100%;

      .panel-list{
          flex: 0 0 42px;
          height: 100%;
      }
      .panel-content{
          flex: 0 0 calc(100% - 42px);
          max-width: calc(100% - 42px);
      }
  }
</style>