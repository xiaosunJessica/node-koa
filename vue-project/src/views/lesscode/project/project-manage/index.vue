<script setup lang='ts'>
import { provide, reactive, ref } from 'vue';
import ListCard from './children/list-card.vue';
import ProjectForm from '../comps/project-form.vue';
import useProjectStore from '@/stores/modules/project';
import useLayoutStore from '@/stores/modules/layout';
const projectStore = useProjectStore();
const layoutStore = useLayoutStore();
const getUpdateInfoMessage = () => {
  return '123344'
}
provide('getUpdateInfoMessage', getUpdateInfoMessage)
const state = reactive<{
  projectList: any[],
  pageMap: Object,
  dialog: any,
  defaultLayoutList: any[],
  layoutFullList: any[]
}>({
  projectList: [],
  pageMap: {},
  dialog: {
    ['create']: {
      projectType: '',
      formData: {
        projectName: '',
        copyFrom: null,
      },
      visible: false
    }
  },
  defaultLayoutList: [],
  layoutFullList: []
})

const projectFormRef = ref<any>(null);

const getProjectList = async (val?: string) => {
  const data = await projectStore.query({
    filter: val
  })
  state.projectList = data.projectList
  state.pageMap = data.pageMap
}

const filterLinks = [
  { name: '全部应用', value: '' },
  { name: '我创建的', value: 'my' },
  { name: '我收藏的', value: 'favorite' }
]

const handleClickFilter = (val?: string) => {
  getProjectList(val)
}

const handleCreate = (type='newProject') => {
  state.dialog.create.projectType = type
  state.dialog.create.formData.projectName = ''
  state.dialog.create.formData.copyFrom = null
  state.dialog.create.visible = true
}

const handleCancel = (type = 'newProject') => {
  state.dialog[type].visible = false
}

const handleCreateConfirm = async () => {
  // const data = this.$refs.projectForm.formData || {}
  const data = projectFormRef.value.formData;
  await projectFormRef.value.formRef.validate();
  const layouts = state.layoutFullList.filter(layout => layout.checked || layout.type === 'mobile-empty').map(layout => {
    return {
      layoutId: layout.id,
      routePath: layout.defaultPath,
      isDefault: layout.isDefault,
      showName: layout.defaultName,
      layoutCode: layout.defaultCode,
      content: layout.defaultContent,
      layoutType: layout.layoutType
    }
  })
  data.layouts = layouts
  const res = await projectStore.create(data)
  state.dialog.create.visible = false
  console.log(res, 'resresres')
}

const getDefaultLayout = async () => {
  try {
    const layoutList = await layoutStore.getPlatformList();
    layoutList.forEach((item: any) => {
      const isEmptyType = ['empty', 'mobile-empty'].includes(item.type)
      item.isDefault = isEmptyType
      item.checked = isEmptyType
      item.disabled = isEmptyType
    })
    state.layoutFullList = layoutList
    state.defaultLayoutList = state.layoutFullList.filter(item => item.type !== 'mobile-empty')
  } catch (e) {
    console.error(e)
  }
}

getProjectList()
getDefaultLayout()

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
            @click=" handleCreate('newProject')">
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
     <div :class="['page-body', { 'is-empty': !state.projectList.length }]">
      <div class="page-body-inner">
          <component
            :is="ListCard"
            :project-list="state.projectList"
            :page-map="state.pageMap"
          />
        </div>
      </div>
    <!-- 创建应用弹窗 -->
    <el-dialog
      v-model="state.dialog.create.visible"
      title="新建应用"
      width="750"
      :auto-close="false"
      header-position="left"
    >
      <project-form
        ref="projectFormRef"
        :type="state.dialog.create.projectType"
        :form-data="state.dialog.create.formData"
        :default-layout-list="state.defaultLayoutList"
        />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel('create')">取消</el-button>
          <el-button type="primary" @click="handleCreateConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
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