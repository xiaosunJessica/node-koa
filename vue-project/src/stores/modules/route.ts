import { defineStore } from 'pinia'
import http from '@/api'
const useRouteStore = defineStore({
  id: "route",
  state: () => {
    return {
      pageLayout: {}
    }
  },
  actions: {
    query({ projectId, versionId }: { projectId?: string; versionId?: string;}) {
      return http.get(`/route/query/${projectId}?versionId=${versionId}`).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
  }
})

export default useRouteStore