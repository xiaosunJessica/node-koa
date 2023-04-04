import { defineStore } from 'pinia'
import http from '@/api'
const useLayoutStore = defineStore({
  id: "layout",
  state: () => {
    return {
      pageLayout: {}
    }
  },
  actions: {
    getPlatformList() {
      return http.get('/layout/getPlatformList').then((response: any) => {
        const data = response.data || []
        return data
      })
    },
  }
})

export default useLayoutStore