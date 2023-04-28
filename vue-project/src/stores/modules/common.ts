import { defineStore } from 'pinia'
import useComponents from './components'
// import http from '@/api'
const useCommon = defineStore({
  id: "common",
  state: () => {
    return {
      components: useComponents()
    }
  },
})

export default useCommon