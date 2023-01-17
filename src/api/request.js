import axios from 'axios'
import { ElMessage } from 'element-plus'

// const apiEnvironment = "https://192.168.129.250:5001"
// const apiEnvironment = "http://192.168.215.22"
const apiEnvironment = 'http://192.168.209.22'
const service = axios.create({
    baseURL: apiEnvironment,
    timeout: 10000
})
//请求拦截器
service.interceptors.request.use((config) => {
    // TODO 判断登录逻辑以及是否有token 做登录使用
    return config
}, (error) => {
    ElMessage.error('未知异常')
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    if (response.data.code === 'success') {
        return Promise.resolve(response.data)
    } else {
        ElMessage.error(response.data.text)
        return Promise.reject(response)
    }
}, error => {
    ElMessage.error('未知异常')
    return Promise.reject(error)
})

// 封装POST接口
class Req {
    static async post(params) {
        const defaultParams = {
            au: 'ssamc',
            ap: 'api2018',
            ak: ''
        }
        const realParams = Object.assign(defaultParams, params)
        return service.post('/api/Do/DoAPI', realParams)
    }
}

export {
    Req as req
}