import { defineStore } from 'pinia'
import http from '@/api'
const usePageStore = defineStore({
  id: "layout",
  state: (): {
    pageList: any;
    pageDetail: {
      [key: string]: any
    }
  } => {
    return {
      pageList: {},
      pageDetail: {},
    }
  },
  getters: {
    platform: state => state.pageDetail.pageType ? state.pageDetail.pageType : 'PC',
  },
  actions: {
    setPageDetail(page) {
      this.pageDetail = Object.freeze(page)
    },
    getPageList(params?: any) {
      return http.get('/page/getList', {params}).then((response: any) => {
        const data = response.data || []
        return data
      })
    },
    detail(params?: any) {
      return http.get(`/page/detail?pageId=${params.pageId}`).then(response => {
        const data = response.data || ''
        return data
      })
    },
  }
})

export default usePageStore