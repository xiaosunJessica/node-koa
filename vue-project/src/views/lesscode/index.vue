<script setup lang='ts'>
import Content from './content/index.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const navItems = [
  {
    icon: 'bk-drag-icon bk-drag-document',
    text: '文档',
    action: () => {
      const routerUrl = router.resolve({
        path: '/help'
      })
      window.open(routerUrl.href, '_blank')
    }
  },
  {
    icon: 'bk-drag-icon bk-drag-comment-fill',
    text: '反馈',
    action: () => {
      window.open('https://github.com/TencentBlueKing/bk-lesscode/issues')
    }
  }
]
const appTabData = [
  { name: '产品介绍', url: '/', routerName: 'home' },
  { name: '帮助文档', url: '/help', routerName: 'intro' }
]

const routerNameData = ['/home', '/help']
</script>

<template>
  <lesscode-header></lesscode-header>
  <Content></Content>
</template>

<style lang="less" scoped>

</style>