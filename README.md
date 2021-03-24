# qf-upload

> 基于element-ui上传组件的二次开发，增加了剪贴上传，以及七牛云上传（3.x版本）

## Install
```shell
npm install qf-upload -S
```

## 全局引入 main.js
``` javascript
import QfUpload from 'qf-upload'

Vue.use(QfUpload)
```

## 按需引入
``` javascript
import QfUpload from 'qf-upload'

const { QfQiniuUpload, QfUpload } = QfUpload
Vue.use(QfQiniuUpload)
Vue.use(QfUpload)
```

### 基础用法
```html
<template>
  <QfQiniuUpload
    :upNum.sync="upNum"
    @successCallback="qiniuFunction"
    :watermarkConfig="watermarkConfig"
    :fileList="fileList"
    :qiniuToken="qiniuToken"
    :qiniuView="qiniuView"
    @getBig="getBig"
  />
</template>
```

## API

### qi-qiniu-upload (七牛上传):

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
fileType  |  上传文件类型： jpg|pdf (只能限制jpg|pdf)  |  String  |  ''
maxSize  |  限制上传文件大小  |  Number  |  500
title  |  文件上传标题  |  String  |  文件上传'
fileList  |  文件列表  |  Array  |  []
dir  |  文件上传路径  |  String  |  'dev'
num  |  最大上传数量 (0|null 则不限制)  |  Number  |  9
upNum  |  判断是否在上传中...  |  Number  |  0
watermark  |  水印  |  Boolean  |  true
watermarkConfig  |  水印配置  |  Object  |  {title: '电商服务大平台', img: ''}
private  |  文件是否私有（1:私有，2：公开）  |  Number  |  1
qiniuToken  |  (请求)获取七牛token  |  Function  |  
qiniuView  |  (请求)七牛文件预览：针对私有文件地址  |  Function  |  成功返回download_url
previewFile  |  文件预览（默认地址：file.file_path） |  Function  |  参数（file文件对象）
successCallback  |  上传成功的回调函数 $emit('successCallback')  |  Function  |  

PS: previewFile(文件预览)：默认方法限定了返回参数，不满足需要的请自定义

### qi-upload:

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
fileType  |  上传文件类型： jpg|pdf (只能限制jpg|pdf)  |  String  |  ''
maxSize  |  限制上传文件大小  |  Number  |  500
title  |  文件上传标题  |  String  |  文件上传'
fileList  |  文件列表  |  Array  |  []
dir  |  文件上传路径  |  String  |  'dev'
num  |  最大上传数量 (0|null 则不限制)  |  Number  |  9
upNum  |  判断是否在上传中...  |  Number  |  0
watermark  |  水印  |  Boolean  |  true
watermarkConfig  |  水印配置  |  Object  |  {title: '电商服务大平台', img: ''}
private  |  文件是否私有（1:私有，2：公开）  |  Number  |  1 
uploadsFile  |  上传请求  |  Function  |  
previewFile  |  文件预览（默认地址：file.full_path） |  Function  |  参数（file文件对象）
successCallback  |  上传成功的回调函数 $emit('successCallback')  |  Function  | 
delUploadsFile  |  服务器文件删除回调 $emit('delUploadsFile', id)  |  Function  | 

PS: previewFile(文件预览)：默认方法限定了返回参数，不满足需要的请自定义

作者wx: jiang164851219