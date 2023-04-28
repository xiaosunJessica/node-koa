<script setup lang='ts'>
const $emit = defineEmits(['change-checked', 'set-default'])
const props = defineProps<{
  list: any[],
}>()

const toolkit = [
  'select',
  'setdefault'
]
console.log(props.list, 'aaaaa', props.list.length)
function handleClickItem(layout: any) {
  if (layout.disabled || !toolkit.includes('select')) {
    return
  }
  $emit('change-checked', layout)
}
function handleSetDefault(layout: any) {
  if (!toolkit.includes('setdefault')) {
    return
  }
  $emit('set-default', layout)
}
function getPreviewImg(layout: any) {
  const previewImg = new URL(`../images/layout/preview-${layout.type}-s.png`, import.meta.url).href
  return previewImg

  // return require(`../images/${previewImg}`)
}
function handlePreview(layout: any) {
  window.open(`/preview-template/project/${layout.projectId}/${layout.id}?type=nav-template`, '_blank')
}
</script>

<template>
  <ul class="layout-thumb-list">
    <li
      v-for="layout in list"
      :key="layout.id"
      :class="['list-item', { 'is-empty': layout.type === 'empty', checked: layout.checked, disabled: layout.disabled }]"
      @click="handleClickItem(layout)"
    >
      <span
        v-if="layout.isDefault"
        class="default-tag checked"
      >默认</span>
      <span
        v-else-if="toolkit.includes('setdefault')"
        class="default-tag setting"
        @click.stop="handleSetDefault(layout)"
      >设为默认</span>
      <div class="checkbox">
        <el-icon class="icon-check-1 checked-icon"><Check /></el-icon>
      </div>
      <div
        class="layout-img"
        v-if="layout.type !== 'empty' && layout.type !== 'mobile-empty'"
      >
        <img :src="getPreviewImg(layout)" />
      </div>
      <div
        class="layout-label"
        v-if="layout.type !== 'empty' && layout.type !== 'mobile-empty' && layout.projectId"
    >
      <div
        class="layout-name"
        :title="layout.defaultName"
      >
        {{ layout.defaultName }}
      </div>
      <div
        class="layout-preview"
        @click.prevent.stop="handlePreview(layout)"
      >
        预览
      </div>
    </div>
    <div
      v-else
      class="layout-empty-name"
      :title="layout.defaultName"
    >
      {{ layout.defaultName }}
    </div>
  </li>
</ul>
</template>


<style lang='scss' scoped>
  .layout-thumb-list {
      display: flex;
      flex-wrap: wrap;

      .list-item {
          position: relative;
          flex: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 148px;
          height: 120px;
          background: #ffffff;
          border-radius: 2px;
          cursor: pointer;
          border: 1px solid #dcdee5;
          margin-right: 8px;
          margin-bottom: 8px;

          &:nth-of-type(4n) {
              margin-right: 0;
          }

          &:hover {
              border-color: #3a84ff;

              .layout-preview {
                  display: block;
              }
          }

          &.checked {
              border-color: #3a84ff;
              background: #e1ecff;
              .checkbox {
                  display: block;
              }

              &:hover {
                  .default-tag {
                      &.setting {
                          display: block;
                      }
                  }

                  .layout-preview {
                      display: none;
                  }
              }
          }

          &.disabled {
              border-color: #C4C6CC;
              background: #fff;
              cursor: not-allowed;
              .layout-name {
                  color: #979BA5;
              }
              .checkbox {
                  border-color: transparent transparent #C4C6CC transparent;
              }
          }

          .default-tag {
              position: absolute;
              right: 0;
              top: 0;
              height: 18px;
              line-height: 18px;
              border-radius: 2px;
              font-size: 12px;
              color: #fff;
              padding: 0 5px;
              z-index: 1;
              &.checked {
                  background: #FFB848;
              }
              &.setting {
                  display: none;
                  background: #699DF4;
                  cursor: pointer;
              }
          }
          .checkbox {
              display: none;
              position: absolute;
              right: -1px;
              bottom: -1px;
              border-style: solid;
              border-width: 0 0 30px 34px;
              border-color: transparent transparent #3A84FF transparent;
              .checked-icon {
                  position: absolute;
                  left: -20px;
                  top: 10px;
                  color: #fff;
                  font-size: 20px;
              }
          }

          .layout-img {
              margin: 6px 6px 0;
              width: 136px;
              height: 82px;
              img {
                  width: 100%;
                  height: 100%;
              }
          }

          .layout-empty-name {
              text-align: center;
              padding: 0 6px;
              font-size: 14px;
              color: #63656e;
          }

          .layout-label {
              width: 100%;
              padding: 0 6px;
              display: flex;
              justify-content: space-between;
              font-size: 14px;
          }
          .layout-name {
              width: 110px;
              color: #63656e;
          }

          .layout-preview {
              font-size: 12px;
              color: #3a84ff;
              cursor: pointer;
              display: none;
          }
      }
  }
</style>