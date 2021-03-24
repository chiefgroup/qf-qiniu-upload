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

// 上传（新）
export function uploadsFile(data, fn1, onUploadProgress) {
  return request({
    url: '/api/upload',
    method: 'post',
    data,
    cancelToken: fn1, // 取消请求的方法
    onUploadProgress,  // 文件上传进度条显示方法
    timeout: 60000
  })
}

// 删除上传的文件
export function delUploadsFile(id) {
  return request({
    url: `/api/upload/${id}`,
    method: 'delete'
  })
}