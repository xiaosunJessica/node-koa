/**
 * 封装要求
 *    1. 统一url配置
 *    2. 统一api请求
 *    3. request请求拦截器（请求头）
 *    4. response响应拦截器（统一错误处理）
 *    5. 全局的loading和错误处理
 */

import axios from 'axios';
import { removeCookie, getCookie } from "../utils/cookie";

const configs = {
   baseURL: 'http://localhost:3000',
   timeout: 10000,
}


const _axios = axios.create({
  baseURL: configs.baseURL,
  timeout: configs.timeout
})
const bear = getCookie('token');
_axios.defaults.headers.common['Authorization'] = 'Bearer ' + bear;

// //添加请求拦截器
_axios.interceptors.request.use(config => {
	return config
}, error => {
  return Promise.reject(error)
})

// //添加响应拦截器
_axios.interceptors.response.use(res => {
	const success = res.data.success;
	if (!success) {
		if (res.data.status === 401) {
			removeCookie('token');
		}
	}
  return res.data;
}, error => {
	if (error.response) {
		switch (error.response.status) {
			case 401: {
				removeCookie('token');
				return;
			}
			default:
				return;
		}
	}
  return Promise.reject(error)
})


export default _axios