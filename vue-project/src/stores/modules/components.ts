import { defineStore } from 'pinia'
import http from '@/api'
const useComponents = defineStore({
  id: "components",
  state: () => {
    return {
      curNameMap: {} as any,
      interactiveComponents: ['bk-dialog', 'bk-sideslider'],
      categoryList: []
    }
  },
  getters: {
    curNameMap: state => state.curNameMap,
    interactiveComponents: state => state.interactiveComponents
  },
  actions: {
    setCurNameMap(nameMap: any) {
      this.curNameMap = Object.assign({}, nameMap)
    },
    setCategoryList(categoryList: any) {
      this.categoryList = categoryList
    },
    list(params = {}) {
      return http.get('/component/list', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    useing(params = {}) {
      return http.get('/component/useing', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    detail(params = {}) {
      return http.get('/component/detail', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    versionDetail(params = {}) {
      return http.get('/component/version-detail', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    create(params = {}) {
      return http.post('/component/create', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    update(params = {}) {
      return http.post('/component/update', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    updateData(params = {}) {
      return http.post('component/updateData', params).then((response: { date: string }) => {
        const data = response.date || ''
        return data
      })
    },
    off(params = {}) {
      return http.post('/component/off', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    online(params: any) {
      return http.post('/component/online', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    upload() {
      return http.get('/component/upload').then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    categoryCount(params: any) {
      return http.get('/component/category-count', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    categoryList({ commit }: any, params = {}) {
      return http.get('/componentCategory/list', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        commit('setCategoryList', data)
        return data
      })
    },

    categoryCreate(params: any) {
      return http.post('/componentCategory/create', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    categoryUpdate(params: any) {
      return http.post('/componentCategory/update', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    categorySort(params: any) {
      return http.post('/componentCategory/sort', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    categoryDelete(params: any) {
      return http.delete('/componentCategory/delete', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },

    componentNameMap(context: any) {
      return http.get('/component/name-map').then((response: { data: string }) => {
        const data = response.data || {}
        context.commit('setCurNameMap', data)
        return data
      })
    },

    updatePageComp(params: any) {
      return http.put('/component/page-using-version', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },

    favoriteList({ commit }: any, params = {}) {
      return http.get('/componentFavourite/list', { params }).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    favoriteAdd({ commit }: any, { data, config }: any) {
      return http.post('/componentFavourite/add', data, config).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    favoriteDelete({ commit }: any, { data, config }: any) {
      return http.post('/componentFavourite/delete', data, config).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },

    scope({ commit }: any, { data, config }: any) {
      return http.post('/component/scope', data, config).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    }
  }
  // actions: {
  //   getPlatformList() {
  //     return http.get('/layout/getPlatformList').then((response: any) => {
  //       const data = response.data || []
  //       return data
  //     })
  //   },
  // }
})

export default useComponents