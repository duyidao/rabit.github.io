import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'

const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 5000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  const { userinfo } = useUserStore()
  // 获取token
  const token = userinfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  ElMessage({ type: 'error', message: e.response.data.message })
  return Promise.reject(e)
})

export default http