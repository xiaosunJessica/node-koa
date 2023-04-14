<script setup lang='ts'>
import { reactive, computed, type Component } from 'vue';
import RenderBaseComponent from './render-base-component.vue';
import RenderCustomComponent from './render-custom-component.vue';
import ReanderIcon from './render-icon.vue';
const state = reactive({
  tab: 'baseComponent',
  baseComponent: 'bk'
})

const handleChangeTab = (tab: string) => {
  state.tab = tab;
}

type comMapType = {
  [key: string]: Component
}

const com = computed(() =>  {
  const comMap: comMapType = {
    baseComponent: RenderBaseComponent,
    customComponent: RenderCustomComponent,
    icon: ReanderIcon
  }
  return comMap[state.tab]
})
</script>

<template>
  <div class="panel-component">
      <div class="category-tabs">
          <div
              class="tab-item base-component-box"
              :class="{ active: state.tab === 'baseComponent' }"
              @click="handleChangeTab('baseComponent')">
              <select-base-component v-model="state.baseComponent" />
          </div>
          <div
              class="tab-item"
              :class="{ active: state.tab === 'customComponent' }"
              @click="handleChangeTab('customComponent')">
              <span class="tab-item-label">自定义组件</span>
          </div>
          <div
              class="tab-item"
              :class="{ active: state.tab === 'icon' }"
              @click="handleChangeTab('icon')">
              <span class="tab-item-label">图标</span>
          </div>
      </div>
      <div class="drag-component-list">
          <component :is="com" :base-component="state.baseComponent" />
      </div>
  </div>
</template>

<style lang='scss' scoped>
    .panel-component{
        height: 100%;
        .category-tabs {
            display: flex;
            height: 46px;
            border-bottom: 1px solid #ccc;
            padding: 0 20px;
            user-select: none;
            .tab-item {
                flex: 0 0 auto;
                font-size: 14px;
                height: 46px;
                padding: 0 10px;
                line-height: 46px;
                white-space: nowrap;
                cursor: pointer;
                user-select: none;
                &:hover {
                    color: #3A84FF;
                }
                &:first-child{
                    margin-right: auto;
                }
                &.active {
                    color: #3A84FF;
                    border-bottom: 2px solid #3A84FF;
                }
                .tab-item-label {
                    font-size: 14px;
                }
                .toggle-icon {
                    line-height: 46px;
                    overflow: hidden;
                    display: inline-block;
                }
            }
        }
        .search-box{
            padding: 12px 20px;
        }
        .drag-component-list{
            height: calc(100% - 46px);
            padding-bottom: 10px;
            overflow-y: auto;

        }
    }
</style>