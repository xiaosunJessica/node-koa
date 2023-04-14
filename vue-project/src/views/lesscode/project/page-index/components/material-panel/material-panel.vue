<script setup lang='ts'>
import SelectPanel from './components/select-panel.vue';
import PanelComponent from './components/panel-component.vue';
import { reactive } from 'vue';
const state = reactive({
  isCollapse: false,
  activePanel: 'component'
})
/**
  * @desc 切换面板
  * @param { String } panel
  */
const handlePanelChange = (panel: string) => {
  state.activePanel = panel
}
</script>

<template>
  <div
    id="editPageLeftSideBar"
    class="draw-page-material-panel">
    <select-panel
        v-model="state.activePanel"
        class="panel-list"
        @on-change="handlePanelChange" />
    <div class="panel-content">
        <component :is="PanelComponent" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .draw-page-material-panel {
    display: flex;
    position: relative;
    // height: 100%;

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