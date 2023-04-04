<script setup lang='ts'>
import preivewErrImg from '@/images/preview-error.png'
import { defineProps, computed, ref, onMounted } from 'vue';
const props = defineProps<{
  projectId: Number,
  pageId?: Number,
  imgSrc: String,
}>();

let isEmpty= false;
const imgRef = ref()

const imgSrc = computed(() => {
  if (props.projectId) {
    return `api/project/previewimg?id=${props.projectId}`
  }
  return `api/page/previewimg?id=${props.pageId}`
})

onMounted(() => {
  imgRef.value.onload = function() {
    console.log(imgRef.value.complete, 'imgRef.valueimgRef.valueimgRef.value')
    isEmpty = imgRef.value.complete && imgRef.value.width === 1 && imgRef.value.height === 1
  }
  imgRef.value.onerror = function() {
    // imgRef.value.src = preivewErrImg
    // imgRef.value.onerror = null
  }
  imgRef.value.src = props.imgSrc || imgSrc.value

})
</script>

<template>
  <div class="preview-thumb">
    <img ref="imgRef" loading="lazy" v-bind="$attrs" v-if="!isEmpty">
    <slot v-else><div class="empty-preview-img">页面为空</div></slot>
  </div>
</template>

<style lang='scss' scoped>
  .preview-thumb {
      height: 100%;
      img {
          width: 100%;
          object-fit: contain;
      }
  }
  .empty-preview-img {
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
</style>