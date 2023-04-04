<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import useUserStore from '@/stores/modules/useUserStore'
import { storeToRefs } from 'pinia';
const router = computed(() => {
  return useRouter()
})
const userInfo = storeToRefs(useUserStore());
const menus = [
  {
    to: '/lesscode/home',
    name: '产品介绍',
    authed: true
  },
  {
    to: '/lesscode/projects',
    name: '应用开发',
    authed: true
  },
  {
    to: '/lesscode/marketplace',
    name: '资源市场',
    authed: true
  },
  {
    to: '/lesscode/op',
    name: '运营数据',
    authed: true
  }
]
const isMenuActive = (route: any) => {
  const [topRoute] = router.value?.currentRoute?.value?.matched || [];
  return route.name === topRoute?.meta?.owner
}

const isRouteContains = (path: any, currentRoute: any) => {
  const paths = path.split(',')
  return currentRoute?.matched?.some((route: any) => paths.some((p: any) => route.path.startsWith(`/${p}`)))
}

const goLogin = () => {
  window.location.href = (userInfo?.user?.value?.loginRedirectUrl) + '&c_url=' + encodeURIComponent(window.location.href)
}

const toProjectList = () => {
  router.value.push({
    name: 'projects'
  })
}
</script>

<template>
   <header class="app-header">
    <div class="logo" @click="toProjectList">
        <img src="./" alt="logo">
        蓝鲸可视化开发平台
    </div>
    <nav class="top-nav">
      <ul class="menu">
        <router-link
            v-for="(menu, index) in menus"
            custom
            :to="menu.to"
            :key="index"
            v-slot="{ href, route, navigate, isActive }">
            <li :class="['menu-item', { active: isActive || isMenuActive(route) }]">
                <a :href="href" @click="navigate">{{ menu.name }}</a>
            </li>
        </router-link>
      </ul>
    </nav>
  </header>
</template>

<style lang='scss' scoped>
    .app-header {
        display: flex;
        position: fixed;
        height: 52px;
        width: 100%;
        min-width: 1280px;
        padding: 0 16px;
        top: 0;
        z-index: 1000;
        background: #182132;

        .logo {
            display: flex;
            align-items: center;
            cursor: pointer;
            color: #EAEBF0;
            font-size: 16px;
            text-decoration: none;
            white-space: nowrap;

            img {
                width: 32px;
                margin-right: 12px;
            }
        }

        .top-nav {
            margin-left: 58px;
            .menu {
                display: flex;
                height: 100%;

                .menu-item {
                    margin: 0 20px;

                    a {
                        display: flex;
                        align-items: center;
                        height: 100%;
                        font-size: 14px;
                        color: #96A2B9;
                        white-space: nowrap;

                        &:hover {
                            color: #d3d9e4;
                        }
                    }

                    &.active {
                        a {
                            color: #fff;
                        }
                    }
                }
            }
        }

        .top-info {
            display: flex;
            align-items: center;
            margin-left: auto;

            .info-item {
                cursor: pointer;
                margin-left: 16px;
            }

            .info-help {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 32px;
                width: 32px;
                color: #768197;
                font-size: 16px;
                position: relative;

                &:hover,
                &.active {
                    background: linear-gradient(270deg,rgba(37, 48, 71, 1) 0%,rgba(38, 50, 71, 1) 100%);
                    border-radius: 100%;
                    color: #D3D9E4;
                }
            }
            .info-user {
                display: flex;
                align-items: center;
                height: 32px;
                color: #96A2B9;
                margin-top: -1px;

                &:hover {
                    color: #D3D9E4;
                }

                .bk-drag-icon {
                    font-size: 12px;
                    margin-left: 4px;
                    margin-top: 2px;
                }
            }
        }

    }

    .header-top-info-popover-theme {
        .popover-link {
            display: block;
            padding: 8px 16px;
            font-size: 12px;
            color: #63656E;

            &:hover,
            &.active {
                color:#3A84FF;
                background: #F0F1F5;
            }
        }
    }
</style>
<style>
.tippy-tooltip.header-top-info-popover-theme {
  padding: 4px 0 !important;
  overflow: hidden;
  border-radius: 2px !important;
  background: #FFFFFF;
  border: 1px solid #DCDEE5;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
}
</style>