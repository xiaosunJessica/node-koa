<script setup lang='ts'>
  const props = defineProps<{
    pageList: any[],
    routeMap: any
  }>()

  const $emit = defineEmits(['edit'])

  const handleEditPage = (page: any) => {
    $emit('edit', page)
  }


</script>

<template>
  <div class="list-card">
    <div class="page-item" v-for="(page, index) in props.pageList || []" :key="index">
      <div class="item-bd">
        <div class="preview" @click="() => handleEditPage(page)">
          <div class="mask">
            <div class="operate-btns">
              <el-button class="edit-btn" theme="primary">编辑</el-button>
              <el-button class="preview-btn" @click.stop="">预览</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="item-ft">
        <div class="col">
          <div class="page-name">
            <div class="name">{{ page.pageName }}</div>
          </div>
          <div class="route">
            <svg class="label" width="22" height="14" viewBox="0 0 22 14">
                <rect x="0" width="22" height="14" rx="2" fill="#F0F1F5" />
                <text font-family="'PingFang SC','Microsoft Yahei'" fill="#979ba5" style="text-anchor: middle" font-size="8" x="11" y="10">路由</text>
            </svg>
            <div class="path">
                <span class="fullpath" v-if="props.routeMap && props.routeMap[page.id] && props.routeMap[page.id].id">
                    {{ props.routeMap[page.id].fullPath }}
                </span>
                <span class="unset" v-else>未配置</span>
            </div>
          </div>
          <div class="stat">{{ page.updateUser || page.createUser }}更新</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .list-card {
    display: grid;
    gap: 16px 12px;
    grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
    width: 100%;
    align-content: flex-start;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    .page-item {
        position: relative;
        height: 262px;
        margin: 0;
        padding: 6px;
        background: #fff;
        border-radius: 0px 6px 6px 6px;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.11);
        cursor: pointer;

        &:hover {
            box-shadow: 1px 2px 8px 2px rgba(0, 0 ,0 , 0.11);

            .desc {
                display: block;
            }
            .preview {
                .mask {
                    background: rgba(0, 0, 0, 0.1);
                    .operate-btns {
                        display: block;
                        opacity: 1;
                        z-index: 3;
                    }
                }
            }
        }
        .more-menu-trigger {
            .el-drag-more-dot {
                display: block;
                width: 32px;
                height: 32px;
                line-height: 34px;
                text-align: center;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                color: #979BA5;
                &:hover {
                    background: #F0F1F5;
                }
            }
        }

        .item-bd {
            flex: none;
            position: relative;
            height: 166px;
            background: #fff;
            border-radius: 4px 4px 0px 0px;
        }
        .item-ft {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 14px 10px 0 10px;
        }

        .nocode-type-tag {
            position: absolute;
            right: 6px;
            top: 6px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            border-radius: 2px;
            font-size: 12px;
            color: #fff;
            padding: 0 6px;
        }

        .preview {
            position: relative;
            height: 100%;
            overflow: hidden;
            border-radius: 4px 4px 0px 0px;

            .mask {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.02);
                display: flex;
                align-items: center;
                justify-content: center;
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

            /* &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.2);
            } */
        }
        .desc {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 28px 26px 28px 21px;

            .desc-text {
                font-size: 12px;
                color: #fff;
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
            }
        }
        .empty {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 700;
            color: #C4C6CC;
            height: 100%;
            background: #f0f1f5;
            border-radius: 4px 4px 0px 0px;
        }
        .page-name {
            display: flex;
            align-items: center;
            margin: -2px 0 0 0;

            .name {
                font-size: 12px;
                font-weight: 700;
                color: #63656E;
                width: 215px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-left: 7px;
            }

            .page-type {
                font-size: 16px;
                line-height: 18px;
                height: 20px;
                width: 20px;
                text-align: center;
                margin-left: -2px;
                color: #979ba5;
                border-radius: 2px;
                background: #f0f1f5;
            }
        }
        .stat {
            font-size: 12px;
            color: #979BA5;
            margin: 4px 0;
        }
        .route {
            display: flex;
            align-items: center;
            margin: 7px 0;
            .label {
                margin-top: 1px;
                margin-left: -2px;
            }
            .path {
                width: 212px;
                font-size: 12px;
                color: #63656E;
                margin-left: 5px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .unset {
                    color: #FF9C01;
                }
            }
        }
    }

    .empty {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .empty-page {
            display: flex;
            align-items: center;
        }
    }
  }
</style>