/**
 * 封装要求
 *    1. 统一url配置
 *    2. 统一api请求
 *    3. request请求拦截器（请求头）
 *    4. response响应拦截器（统一错误处理）
 *    5. 全局的loading和错误处理
 */

import axios from 'axios'
import { Message } from 'element-ui';

const configs = {
   baseURL: 'http://localhost:3000',
   timeout: 10000,
}


const _axios = axios.create({
  baseURL: configs.baseURL,
  timeout: configs.timeout
})

// //添加请求拦截器
_axios.interceptors.request.use(config => config, error => {
  return Promise.reject(error)
})

// //添加响应拦截器
_axios.interceptors.response.use(res => {
	const success = res.data.success;
	if (!success) {
		Message.error(res.data.message)
	}
  return res
}, error => {
  return Promise.reject(error)
})


export default _axios