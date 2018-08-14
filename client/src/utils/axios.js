import axios from 'axios'
import { Message } from 'element-ui';

const request = {
	get: (url) => {
		return new Promise(function(resolve, reject){
			axios.get(url).then(res => {
				const { data } = res
				if (data.success) {
					resolve(data)
					return
				}
				Message.error(data.message)
				reject(data)
			})
		})
	},
	post: (url, data) => {
		return new Promise(function(resolve, reject){
			axios.post(url, data).then(res => {
				const { data } = res;
				if(data.success) {
					resolve(data);
					return 
				}
				Message.error(data.message)
				reject(data)
			})
		})
	}
}

export default request