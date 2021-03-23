import request from '../utils/request.js'

// 获取七牛token
export function qiniuToken(params){
  return request({
    url: '/api/qiniu/upload/token',
    method: 'get',
    params
  })
}

// 查看七牛文件
export function qiniuView(params){
  return request({
    url: '/api/qiniu/download/url',
    method: 'get',
    params
  })
}