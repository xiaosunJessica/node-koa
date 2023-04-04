<script setup lang='ts'>
import { provide, reactive } from 'vue';
import ListCard from './children/list-card.vue';
import useProjectStore from '@/stores/modules/project';
const projectStore = useProjectStore();
const getUpdateInfoMessage = () => {
  return '123344'
}
provide('getUpdateInfoMessage', getUpdateInfoMessage)
const state = reactive({
  projectList: [],
  pageMap: {}
})
let projectList: any = []
let pageMap: any = {}



const getProjectList = async () => {
  const data = await projectStore.query()
  console.log(data, 'datadatadata')
  state.projectList = data.projectList
  state.pageMap = data.pageMap
}

getProjectList();


const filterLinks = [
  { name: '全部应用', value: '' },
  { name: '我创建的', value: 'my' },
  { name: '我收藏的', value: 'favorite' }
]

const handleClickFilter = (val?: string) => {

}
</script>

<template>
  <main class="projects page-content">
    <div class="page-head">
      <!-- 新建按钮 -->
     <el-dropdown>
      <span class="el-dropdown-link">
        新建
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click=" handleClickFilter()">
            空白应用
          </el-dropdown-item>
          <el-dropdown-item
            @click=" handleClickFilter()">
            从模板新建
          </el-dropdown-item>
          <el-dropdown-item
            @click=" handleClickFilter()">
            导入应用
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
     </el-dropdown>

     <ul class="filter-links">
      <li
        v-for="(link, index) in filterLinks"
        :key="index"
        :class="['link-item', { 'active': link.value }]"
        @click="handleClickFilter(link.value)">
        {{ link.name }}
      </li>
     </ul>

      <div class="extra">
        <span class="total" v-show="state.projectList.length">共<em class="count">{{ state.projectList.length }}</em>个应用</span>
         <el-input
            style="width: 260px"
            class="w-50 m-2"
            size="large"
            placeholder="Please Input"
          />
        <!--
        <bk-input
            style="width: 260px"
            placeholder="请输入应用名称或描述"
            :clearable="true"
            :right-icon="'bk-icon icon-search'"
            v-model="keyword"
            @clear="handleSearchClear"
            @enter="handleSearchEnter">
        </bk-input>
        <icon-button-toggle
            :icons="displayTypeIcons"
            @toggle="handleToggleDisplayType"
        />
        <sort-select v-model="sort" :has-default="false" @change="handleSortChange" /> -->
    </div>
    </div>

    <!-- 应用列表 -->
     <div :class="['page-body', { 'is-empty': !state.projectList.length }]" v-bkloading="{ opacity: 1 }">
      <div class="page-body-inner">
          <component
            :is="ListCard"
            :project-list="state.projectList"
            :page-map="state.pageMap"
          />
        </div>
      </div>
    <!-- 创建应用弹窗 -->
    <!-- 应用重命名弹窗 -->
    <!-- 删除应用确认弹窗 -->
  </main>
</template>

<style lang='scss' scoped>
 .page-head {
      margin-bottom: 8px;
      display: flex;

      .extra {
          display: flex;
          align-items: center;
          flex: none;
          margin-left: auto;
      }

      .total {
          font-size: 12px;
          margin-right: 8px;
          .count {
              font-style: normal;
              margin: 0 .1em;
          }
      }
  }

  .el-dropdown {
    &-link {
      background: #3a84ff;
      border-color: #3a84ff;
      color: #fff;
      height: 32px;
      padding: 0 15px;
      line-height: 32px;
    }
  }
  .filter-links {
      display: flex;
      align-items: center;
      margin-left: 16px;
      .link-item {
          padding: 6px 12px;
          margin: 0 8px;
          border-radius: 16px;
          cursor: pointer;

          &:hover {
              background: #E1ECFF;
          }

          &.active {
              background: #E1ECFF;
              color: #3A84FF;
          }
      }
  }
</style>