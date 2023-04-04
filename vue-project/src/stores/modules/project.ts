import { defineStore } from 'pinia'
import http from '@/api'
const useProjectStore = defineStore({
  id: "project",
  state: () => {
    return {
      project: {},
      currentProject: {}
    }
  },
  // mutations: {
  //   setCurrentProject(state, project) {
  //     state.currentProject = Object.freeze(project)
  //   },
  //   updateCurrentProject(state, project) {
  //     state.currentProject = Object.freeze({ ...state.currentProject, ...project })
  //   }
  // },
  getters: {
    currentProject: state => state.currentProject,
    projectDetail: state => state.currentProject
  },
  actions: {
    create(params?: any) {
      return http.post('/project/create', params).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    // import({ commit }, { data, config }) {
    //   return http.post('/project/import', data, config).then(response => {
    //     const data = response.data || ''
    //     return data
    //   })
    // },
    query(params?: any) {
      return http.get('/project/query', {params}).then((response: { data: string }) => {
        const data = response.data || ''
        return data
      })
    },
    // my({ commit }, { config }) {
    //   return http.get('/project/my', config).then(response => {
    //     const data = response.data || ''
    //     return data
    //   })
    // },
    // update({ commit }, { data, config }) {
    //   return http.put('/project/update', data, config).then(response => {
    //     const data = response.data || ''
    //     return data
    //   })
    // },
    // delete({ commit }, { config }) {
    //   return http.delete('/project/delete', config).then(response => {
    //     const data = response.data || ''
    //     return data
    //   })
    // },
    // favorite({ commit }, { data, config }) {
    //   return http.post('/project/favorite', data, config).then(response => {
    //     const data = response.data || ''
    //     return data
    //   })
    // },
    // checkname({ commit }, { data, config }) {
    //   return http.post('/project/checkname', data, config).then(response => {
    //     return response
    //   })
    // },
    // detail({ commit }, { projectId }) {
    //   return http.get(`/project/detail?projectId=${projectId}`).then(response => {
    //     const data = response.data || ''
    //     return data
    //   })
    // }
  }
})

export default useProjectStore