<!--
  Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
  Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
  Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://opensource.org/licenses/MIT
  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
-->

<template>
    <draggable
        ref="draggable"
        :class="{
          [$style['block']]: true,
          [$style['empty']]: (componentData?.children?.length || 0) < 1
        }"
        :sort="true"
        :list="componentData?.slot?.default"
        :component-data="componentData"
        :group="{
            name: 'component',
            pull: true,
            put: [
                'layout',
                'component'
            ]
        }">
        <template #item="{element}">
          <div>
             <resolve-component
                ref="component"
                :key="element.renderKey"
                :component-data="element" />
          </div>
        </template>
    </draggable>
</template>
<script setup lang="ts">
  import LC from '../../../../element-materials/core'
  import Draggable from '../components/draggable.vue'
  import ResolveComponent from '../components/resolve-component.vue'

  const props = defineProps({
    componentData: {
      type: Object,
      default: () => ({})
    }
  })


  const autoType =  (childNode: any) => {}
</script>
<style lang="scss" module>
    .block{
        position: relative;
        border: 1px dashed #ccc;
        &.empty{
            min-height: 34px !important;
            background: #FAFBFD;
            &::before{
                content: "请拖入组件";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                color: #C4C6CC;
                pointer-events: all;
            }
        }
    }
</style>
