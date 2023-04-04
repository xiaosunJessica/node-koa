<script setup lang='ts'>
import pagePreviewThumb from '../../comps/page-preview-thumb.vue';
import { defineProps, inject } from 'vue';
const props = defineProps<{
projectList: any[],
pageMap: any
}>()

const getUpdateInfoMessage: any =inject('getUpdateInfoMessage')

</script>

<template>
  <div class="list-card">
    <template v-if="props.projectList.length">
      <div
        :class="['project-item', {favorite: project.favorite}]"
        v-for="project in props.projectList"
        :key="project.id">
        <div class="item-bd">
          <template v-if="props.pageMap[project.id] && pageMap[project.id].length > 0">
            <div class="preview">
              <page-preview-thumb alt="应用缩略预览" :project-id="project.id" :img-src="project.templateImg"></page-preview-thumb>
            </div>
          </template>
          <div class="operate-btns">
            <el-button class="edit-btn" theme="primary">开发应用</el-button>
            <el-button class="preview-btn">预览</el-button>
            <el-button class="preview-btn">部署</el-button>
          </div>
        </div>
        <div class="item-ft">
          <div class="col">
            <h3 class="name">{{ project.projectName }}</h3>
            <div class="stat">{{ getUpdateInfoMessage(project) }}</div>
          </div>
          <div class="col">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon><MoreFilled /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>下载源码</el-dropdown-item>
                  <el-dropdown-item>页面管理</el-dropdown-item>
                  <el-dropdown-item>重命名</el-dropdown-item>
                  <el-dropdown-item disabled>复制</el-dropdown-item>
                  <el-dropdown-item divided>导出</el-dropdown-item>
                  <el-dropdown-item divided>设为模板</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </template>
    <div class="empty" v-else>
      empty
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .list-card {
    display: grid;
    gap: 26px 12px;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
    width: 100%;
    align-content: flex-start;
    margin-top: 10px;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    .project-item {
      position: relative;
      height: 240px;
      margin: 0;
      padding: 6px;
      background: #fff;
      border-radius: 0px 6px 6px 6px;
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.11);
      cursor: pointer;
      &::before {
              content: "";
              position: absolute;
              top: -10px;
              left: 0;
              width: 156px;
              height: 10px;
              border-radius: 6px 0px 0px 0px;
              background: linear-gradient(-160deg, transparent 9px, #dcdee5 0)
      }
      &:hover {
          box-shadow: 1px 2px 8px 2px rgba(0, 0 ,0 , 0.11);

          .desc {
              display: block;
          }
          .favorite-btn {
              opacity: 1;
          }
          .default-tag {
              display: none;
          }
          .preview {
              &::before {
                  background: rgba(0, 0, 0, 0.1);
              }
          }
          .operate-btns {
              opacity: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
          }
          .empty {
              &::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(0, 0, 0, 0.1);
              }
          }
      }
      .item-bd {
        flex: none;
        position: relative;
        height: 166px;
        background: #fff;
        border-radius: 4px 4px 0px 0px;
        overflow: hidden;
      }

      .item-ft {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 10px 0 10px;
        .name {
          margin: 0;
          font-size: 12px;
          font-weight: 700;
          color: #63656E;
          // @mixin ellipsis 240px, block;
      }
      .stat {
          font-size: 12px;
          color: #979BA5;
          padding: 4px 0;
      }
      }

      .operate-btns {
            display: none;
            .edit-btn {
                width: 86px;
            }
            .preview-btn {
                width: 86px;
                margin-left: 10px;
            }
        }
    }
  }
</style>