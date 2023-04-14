<script setup lang='ts'>
import pageList from './components/page-list/index.vue';
import OperationSelection from './components/operation-select/index.vue'
import ActionTool from './components/action-tool/index.vue';
import ExtraLinks from '../../components/ui/extra-links.vue';
import DrawLayout from './components/draw-layout/index.vue';
import NoticeGuide from '../../components/notice-guide/notice-guide.vue'
import MaterialPanel from './components/material-panel/material-panel.vue'
const handleStartGuide = () => {

}

const guideStep: any = [
  {
    title: '组件库和图标',
    content: '从基础组件、自定义业务组件、图标库中拖拽组件或图标到画布区域进行页面编排组装',
    target: '#editPageLeftSideBar'
  },
  {
    title: '组件树',
    content: '以全局组件树的形式，快速切换查看页面的所有组件',
    target: '#editPageLeftSideBar',
    entry: () => {
      // 切换组件树 tab
      const $componentEl: HTMLElement = document.body.querySelector('[role="component-tree-panel-tab"]') as HTMLElement;
      if ($componentEl) {
        $componentEl.click()
      }
    },
    leave: () => {
      // 离开时切换到组件选择 tab
      const $componentEl: HTMLElement = document.body.querySelector('[role="component-panel-tab"]') as HTMLElement;
      if ($componentEl) {
         $componentEl.click()
      }
    }
  },
  {
    title: '画布编辑区',
    content: '可在画布自由拖动组件、图标等进行页面布局，选中组件或布局后可右键对选中项进行复制粘贴等快捷操作',
    target: '#lesscodeDrawContent'
  },
  {
    title: '组件配置',
    content: '在画布中选中对应组件，可在这里进行组件样式、属性、事件及指令的配置',
    target: '#modifierPanel',
    entry: () => {
      const $componentEl: HTMLElement  = document.body.querySelector('[role="component-root"]') as HTMLElement
      if ($componentEl) {
        $componentEl.click()
      }
    }
  },
  {
    title: '页面操作',
    content: '可以查看并下载完整源码，对页面生命周期、路由、函数等进行配置，以及对内容进行保存、预览、清空等操作',
    target: '#toolActionBox'
  },
  {
    title: '切换页面',
    content: '点击页面名称可以快速切换页面，新建页面，以及复制已有的页面',
    target: '#editPageSwitchPage'
  }
]
</script>

<template>
  <main class="lesscode-editor-page">
    <div class="lesscode-editor-page-header">
      <page-list />
      <div
        id="toolActionBox"
        class="function-and-tool">
        <operation-selection></operation-selection>
        <action-tool />
      </div>
      <extra-links
        show-help-box
        :help-click="handleStartGuide"
        :help-tooltips="{
          content: '画布操作指引',
          placements: ['bottom']
        }"             />
    </div>
    <!--编辑应用的普通页面-->
    <draw-layout>
      <template #left>
        <material-panel />
      </template>
    </draw-layout>
    <notice-guide ref="guide" :data="guideStep"></notice-guide>
  </main>
</template>

<style lang='scss' scoped>
 $headerHeight: 52px;
 $pageHeaderHeight: 52px;

  .lessocde-editor-page {
      min-width: 1366px;
      height: calc(100vh - $headerHeight);
      margin-top: $headerHeight;
  }
  .lesscode-editor-page-header {
      position: relative;
      display: flex;
      justify-content: space-between;
      height: 52px;
      background: #fff;

      &:after{
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
          height: 1px;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
      }

      .function-and-tool {
          position: relative;
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
      }
      .spilt-line {
          height: 22px;
          width: 1px;
          margin: 0 5px;
          background-color: #dcdee5;
      }
  }
  .lesscode-editor-page-content{
      height: calc(100vh - $headerHeight - $pageHeaderHeight);
  }
</style>