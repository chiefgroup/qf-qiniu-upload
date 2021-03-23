import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  maxContentLength: Infinity
})

service.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/apiTest' : '/apiTest'
// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['content-type'] = 'application/json'
    config.headers['Accept'] = 'application/json'
    const token = localStorage.getItem('Admin-Token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(response => {
  const res = response
  if (res.status === 200 || res.status === 201) {
    if(res.data.error_code){
      Message.error(res.data.error_msg)
      return Promise.reject(res.data)
    }
    return res
  } else {
    // 除200、201外 默认为错误处理
    Message.error( res.message || '未知异常')
    return Promise.reject(res)
  }
},
error => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message.error('请求超时！')
  } else if (error.response.status === 403) {
    Message.error('暂无权限')
  } else if (error.response.status === 404) {
    Message.error('系统错误,未找到当前请求!')
  } else if (error.response.status === 422) {
    let err, errTitle
    if (error.response.data.errors) {
      err = error.response.data.errors
      for (var key in err) {
        errTitle = err[key][0]
        break
      }
    } else {
      errTitle = error.response.data.message || '系统繁忙，请稍后重试'
    }
    Message.error(errTitle)
  } else if (error.response.status === 503) {
    Message.error('系统维护中，请稍后重试！')
  } else {
    Message.error(error.response.status + '：服务器错误，请稍后重试！')
  }
  return Promise.reject(error)
})

export default service
