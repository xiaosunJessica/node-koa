<script setup lang='ts'>

  const selectPageId = '';
  const pageDetail: any = {};
  const projectDetail: any = {};
  const versionName = '';
  const classPageList: any = [];
  const handleBackPageList = () => {

  }

  const toggleSelect = () => {

  }

  const handlePageChange = () => {

  }
  const handleCopyPage = (option: any) => {

  }

  const handleCreate = (param1: any, param2: any) => {

  }
</script>

<template>
  <div class="page-select">
    <div class="page-name">
      <el-icon
        title="返回页面列表"
        @click="handleBackPageList"><Back /></el-icon>
      <span class="seperate-line">|</span>
    </div>
       <div
        id="editPageSwitchPage"
        class="select-page-box">
        <el-select
            ext-cls="select-page"
            ext-popover-cls="select-page-dropdown"
            ref="pageSelect"
            v-model="selectPageId"
            :clearable="false"
            :searchable="true"
            @toggle="toggleSelect"
            @change="handlePageChange">
            <div slot="trigger">
                <div
                    class="name-content"
                    :title="`${pageDetail.pageName}【${projectDetail.projectName}】`">
                    <div class="col-name">{{ pageDetail.pageName }}<span class="project-name">【{{ projectDetail.projectName }}】</span></div>
                    <div class="col-version">{{ versionName }}</div>
                </div>
                <i class="el-select-angle el-icon icon-angle-down" />
            </div>
            <el-option-group
                v-for="group in classPageList"
                :key="group.id"
                :name="group.name">
                <template slot="group-name">
                    <i
                        :class="['el-drag-icon', group.collapse ? 'el-drag-angle-down-fill' : 'el-drag-angle-up-fill']"
                        @click="group.collapse = !group.collapse"></i>
                    <i :class="['el-drag-icon', group.icon]"></i>
                    <span>{{ group.name }}</span>
                </template>
                <el-option
                    v-show="!group.collapse && group.children"
                    v-for="option in group.children"
                    :key="option.id"
                    :id="option.id"
                    :name="option.pageName">
                    <span>{{ option.pageName }}</span>
                    <i v-if="!option.nocodeType"
                        class="el-drag-icon el-drag-copy"
                        style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%)"
                        @click.stop="handleCopyPage(option)"
                        title="复制页面"></i>
                </el-option>
                <li style="padding: 0 28px" v-show="!group.children.length && !group.collapse">暂无页面</li>
            </el-option-group>
            <div slot="extension" class="extension">
                <div
                    class="page-row"
                    @click="handleCreate('PC', '')">
                    <i class="el-icon icon-plus-circle" /> 新建PC自定义页面
                </div>
                <div
                    class="page-row"
                    @click="handleCreate('PC', 'FORM')">
                    <i class="el-icon icon-plus-circle" /> 新建PC表单页面
                </div>
                <div
                    class="page-row"
                    @click="handleCreate('MOBILE', '')">
                    <i class="el-icon icon-plus-circle" /> 新建Mobile自定义页面
                </div>
            </div>
        </el-select>
    </div>
  </div>
</template>

<style lang='scss' scoped>
    .page-select {
        display: flex;
        align-items: center;
        .page-name {
            display: flex;
            align-items: center;
            height: 100%;
            .el-drag-icon {
                padding: 10px;
                cursor: pointer;
            }
            .el-drag-arrow-back {
                font-size: 13px;
                color: #3a84ff;
            }
            .template-logo svg {
                vertical-align: middle;
            }
            .seperate-line {
                width: 1px;
                color: #d8d8d8;
                margin: 0 2px 0 -2px;
            }

            .name-content {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin: 0 24px 0 10px;
                .project-name {
                    color: #979BA5;
                }

                .col-name {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .col-version {
                    background: #dcdee5;
                    border-radius: 9px;
                    height: 18px;
                    font-size: 12px;
                    line-height: 18px;
                    color: #63656e;
                    padding: 0 8px;
                    white-space: nowrap;
                }
            }

            .select-page-box {
                display: flex;
                flex: 1;
                align-items: center;
                height: 100%;
                margin: 0 4px;
                .select-page {
                    width: 350px;
                    margin-left: 5px;
                    border: none;
                    background-color: #f0f1f5;
                    &:hover {
                        background-color: #dedee5;
                    }
                    &.is-focus {
                        box-shadow: none;
                        background-color: #dedee5;
                    }
                }
            }
        }
    }

    .select-page-dropdown {
        .el-select-search-input {
            padding: 0 10px 0 30px;
        }
        .extension {
            cursor: pointer;
            .page-row:hover {
                color: #3A84FF;
            }
        }
    }
</style>