/**
 * 封装要求
 *    1. 统一url配置
 *    2. 统一api请求
 *    3. request请求拦截器（请求头）
 *    4. response响应拦截器（统一错误处理）
 *    5. 全局的loading和错误处理
 */

import axios from 'axios'

const configs = {
   baseURL: '/',
   timeout: 10000,
}


const request = axios.create({
  baseURL: configs.baseURL,
  timeout: configs.timeout
})

// //添加请求拦截器
axios.interceptors.request.use(config => config, error => {
  return Promise.reject(error)
})

// //添加响应拦截器
axios.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})

// const request = {
// 	get: (url) => {
// 		return new Promise(function(resolve, reject){
// 			axios.get(url).then(res => {
// 				const { data } = res
// 				if (data.success) {
// 					resolve(data)
// 					return
// 				}
// 				Message.error(data.message)
// 			}).catch(e => {
//         reject(e)
//       })
// 		})
// 	},
// 	post: (url, data) => {
// 		return new Promise(function(resolve, reject){
// 			axios.post(url, data).then(res => {
// 				const { data } = res;
// 				if(data.success) {
// 					resolve(data);
// 					return 
// 				}
// 				Message.error(data.message)
// 			}).catch(e => {
//         reject(e)
//       })
// 		})
// 	}
// }

export default request