<script setup lang='ts'>
import { reactive } from 'vue';
const state = reactive({
  componentId: '',
  componentDocument: '',
  isAttachToForm: false
})
</script>

<template>
   <div
    id="modifierPanel"
    class="draw-page-modifier-panel">
    <div class="draw-page-modifier-panel-inner">
        <div
            v-if="state.componentId"
            class="component-info">
            <div
                class="component-id"
                >
                {{ state.componentId || '--' }}
            </div>
            <div class="action-wrapper">
                <!-- <i
                    v-if="!state.isAttachToForm"
                    class="bk-drag-icon bk-drag-delet mr5"
                    id="del-component-right-sidebar"
                    @click="handleRemoveElement"
                    v-bk-tooltips="'删除'" />
                <i class="bk-drag-icon"
                    v-show="componentData.isInteractiveComponent"
                    :class="componentData.interactiveShow ? 'bk-drag-visible-eye' : 'bk-drag-invisible-eye'"
                    @click="handleToggleInteractiveShow"
                    v-bk-tooltips="componentData.interactiveShow ? '隐藏' : '显示'" /> -->
            </div>
        </div>
        <material-modifier />
        <a
            v-if="state.componentDocument"
            class="link-prop-doc"
            :href="state.componentDocument"
            target="_blank">
            <i class="bk-drag-icon bk-drag-jump-link"></i>
            <span>查看详细属性文档</span>
        </a>
    </div>
</div>
</template>

<style lang='scss' scoped>
    .draw-page-modifier-panel {
        position: relative;
        height: 100%;

        .draw-page-modifier-panel-inner {
            height: 100%;
        }

        .component-info {
            display: flex;
            padding: 15px 0;
            text-align: center;
            border-bottom: 1px solid #dcdee5;

            .component-id {
                padding: 0 10px;
                overflow: hidden;
                width: 239px;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .action-wrapper {
                flex: 1;
                padding-right: 20px;
                &:hover {
                    color: #3a84ff;
                }
                i {
                    cursor: pointer;
                }
            }

        }

        .link-prop-doc{
            margin: 10px 0 0 10px;
            color: #3a84ff;
            cursor: pointer;
            display: inline-block;
            font-size: 12px;
        }
        .active-empty{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>