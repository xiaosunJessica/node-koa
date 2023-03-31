import { defineStore } from 'pinia';
import http from '@/api';
const userStore = defineStore({
  id: "userInfo",
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    /** 登录
     * @param   params  登录参数（用户名 & 密码）
     */
    async login(params: any) {

    },
    /** 登出 */

    /** 获取用户信息 */
    getUserInfo(params: any) {
      return http.get('/user/userinfo', params).then((response:any)=> {
        const userData = response.data || {}
        this.user = userData
        return userData
      })
    },
  },
})

export default userStore