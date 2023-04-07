import { defineStore } from 'pinia'
import http from '@/api'
const usePageStore = defineStore({
  id: "layout",
  state: () => {
    return {
      pageList: {}
    }
  },
  actions: {
    getPageList(params?: any) {
      console.log(params, 'params')
      return http.get('/page/getList', {params}).then((response: any) => {
        const data = response.data || []
        return data
      })
    },
  }
})

export default usePageStore