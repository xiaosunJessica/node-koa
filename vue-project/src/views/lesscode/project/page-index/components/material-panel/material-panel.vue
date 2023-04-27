<script setup lang='ts'>
import SelectPanel from './components/select-panel.vue';
import PanelComponent from './components/panel-component.vue';
import PanelTemplate from './components/panel-template.vue';
import PanelTree from './components/panel-tree.vue'
import { reactive, computed, type Component } from 'vue';
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

const panelCom = computed(() => {
  const comMap: {
    [key: string]: Component
  } = {
    component: PanelComponent,
    template: PanelTemplate,
    tree: PanelTree
  }
  return comMap[state.activePanel]
})
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
        <component :is="panelCom" />
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
    }
    .panel-content{
        flex: 0 0 calc(100% - 42px);
        max-width: calc(100% - 42px);
    }
  }
</style>