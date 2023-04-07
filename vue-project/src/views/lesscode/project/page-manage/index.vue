<script setup lang='ts'>
  import { ref } from 'vue'
  import listCard from './children/list-card.vue';
  import usePageStore from '@/stores/modules/page';
  import useRouteStore from '@/stores/modules/route';
  import { useRoute, useRouter } from 'vue-router';
  import { getRouteFullPath } from '@/utils/route';
  const pageStore = usePageStore();
  const routeStore = useRouteStore();
  const route = useRoute();
  const router = useRouter();
  const renderList: any = ref([]);
  const routeMap: any = ref()
  const projectId: any = route.params.projectId;
  const getPageList = async () => {
    const res = await pageStore.getPageList({
      projectId
    })
    renderList.value = res || []
  }

  const getRouteMap =async () => {
    const res = await routeStore.query({projectId})
    const obj: any = {}
    res.forEach((route: any) => {
      const { id, pageId, layoutId } = route
      obj[pageId] = {
        id,
        pageId,
        layoutId,
        fullPath: id ? getRouteFullPath(route) : null
      }
    })
    routeMap.value = obj;
  }

  const handleEditPage = (page: any) => {
    router.push({
      name: 'new',
      params: {
        projectId,
        pageId: page.id
      }
    })
  }

  getPageList()
  getRouteMap()
</script>

<template>
  <section>
    <main class="pages pages-content">
      <div class="page-head">
        <el-button>新建</el-button>
        <el-button>预览应用</el-button>
        <el-button>源码下载</el-button>
        <el-button>我要发布</el-button>
      </div>
      <!--应用页面列表-->
      <div :class="['page-body', {'is-empty': !renderList.length}]">
        <component
          :is="listCard"
          :page-list="renderList"
          :route-map="routeMap"
          @edit="handleEditPage" />
      </div>
    </main>
  </section>
</template>

<style lang='scss' scoped>

</style>