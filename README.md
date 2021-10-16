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

## API

### qf-qiniu-upload (七牛上传):

#### 基础用法
```html
<template>
  <QfQiniuUpload
    :upNum.sync="upNum"
    :watermarkConfig="watermarkConfig"
    :fileList="fileList"
    :qiniuToken="qiniuToken"
    :qiniuView="qiniuView"
    @successCallback="qiniuFunction"
  />
</template>
```

```
七牛上传流程（qf-upload：前端详情参数及方法请查看文档）
准备工作：引入 qiniu-js  sdk  3.0版本以上
1.选取文件（客户端）
2.发起请求获取七牛token 
>> 约定请求参数：用户判断文件是否为私有；示例：{ is_private: true }
>> 约定返回结构：（组件内部的获取方式已固定，这块数据必须如下返回）
  {
    "data": {
      "token": "", // token
      "dir": "", // 上传文件的地址（拼接文件路径）
      "domain": ""，// 上传文件的域名（拼接文件路径）
    }
  }
  // 文中的 qiniuObj = res.data.data （获取七牛token返回的数据结构，）
3. 调用七牛上传；
qiniu.upload(file, key, qiniuObj.token, putExtra, config)
file：文件对象
key：// `${qiniuObj.dir || 'qiniu'}${this.dir'}/${new Date().getTime()}_${name}` // 文件资源名 加上new Date().getTime()防止文件重名
token： qiniuObj.token
putExtra：{fname: “文件名”, customVars: ”object，用来放置自定义变量 {'x:xxx': ''}“} // customVars 暂时不支持
config：{
  useCdnDomain: true, 
  concurrentRequestLimit: 1, // 并发改为1防止分片上传失败，上传速度会受到影响
}
上传成功之后接口可能没有返回值，组件内部做了成功数据的组装，示例：
  uploads = {
    id: file.uid,
    name,
    key, 
    path: `http://${qiniuObj.domain}/${key}`,
    private, // 是否为私有文件 老版本参数（未移除，兼容旧版本数据）
    is_private, // 是否为私有 新版本参数
  }
  // 如果是非私有文件则直接会将文件路径path =>file_path
  // uploads.file_path = uploads.path

成功之后会调用 $emit('successCallback', uploads)，需要单独处理 uploads 可以调用 successCallback 方法

4. 文件查看（组件内部的文件列表点击钩子）
  组件提供了直接访问的方法：调用后端请求：参数为url
  示例：qiniuView({url: file.path}).then()

 组件方法不满足则自行封装previewFile方法，示例：
  >> 获取bucket域名（请求）【文件没有域名的时候需要这一步】
      返回bucket域名
  >> 获取可访问地址
      非私有文件：bucket域名 + key
      私有文件：bucket域名 + key 作为参数 调用 请求方法获取可访问的地址
```

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
isFileType  |  上传文件类型： image|pdf|txt|video|audio|xls|xlsx|zip|rar|ppt  |  String  |  ''
maxSize  |  限制上传文件大小  |  Number  |  500
title  |  文件上传标题  |  String  |  文件上传'
fileList  |  文件列表  |  Array  |  []
dir  |  文件上传路径  |  String  |  'dev'
num  |  最大上传数量 (0/null 则不限制)  |  Number  |  9
upNum  |  判断是否在上传中...  |  Number  |  0
watermark  |  水印  |  Boolean  |  true
watermarkConfig  |  水印配置  |  Object  |  {title: '电商服务大平台', img: ''} 需要水印时，水印图必填不然会报错
private  |  文件是否私有（1:私有，0：公开）  |  Number  |  1
qiniuToken  |  (请求)获取七牛token  |  Function  |  
qiniuView  |  (请求)七牛文件预览：针对私有文件地址  |  Function  |  成功返回download_url
previewFile  |  文件预览回调（默认地址：file.file_path） |  Function  |  参数（file文件对象）
successCallback  |  上传成功的回调函数 $emit('successCallback', upload)  |  Function  |  参数（成功后的文件upload对象）

>> PS: previewFile(文件预览)：默认方法限定了返回参数，不满足需要的请自定义
>> （1.2.0+）组件支持原el-upload所有的Attribute，七牛私有文件的情况下（private=1）定义了list-type为picture/picture-card，需要在回调内部去获取七牛可访问的地址增加url值

### qf-upload:

#### 基础用法
```html
<template>
  <QfUpload
    :upNum.sync="upNum"
    :fileList="imgList"
    dir="haitian/test"
    :uploadsFile="uploadsFile"
    @successCallback="qiniuFunction"
    @delUploadsFile="delFile"
  />
</template>
```

属性  |  说明  |  类型  |  默认值
:-------: | -------  |  :-------:  |  :-------:
isFileType  |  上传文件类型： image|pdf|txt|video|audio|xls|xlsx|zip|rar|ppt  |  String  |  ''
maxSize  |  限制上传文件大小  |  Number  |  500
title  |  文件上传标题  |  String  |  文件上传'
fileList  |  文件列表  |  Array  |  []
dir  |  文件上传路径  |  String  |  'dev'
num  |  最大上传数量 (0/null 则不限制)  |  Number  |  9
upNum  |  判断是否在上传中...  |  Number  |  0
watermark  |  水印  |  Boolean  |  true
watermarkConfig  |  水印配置  |  Object  |  {title: '电商服务大平台', img: ''} 需要水印时，水印图必填不然会报错
private  |  文件是否私有（1:私有，0：公开）  |  Number  |  1 
uploadsFile  |  上传请求  |  Function  |  
previewFile  |  文件预览（默认地址：file.full_path） |  Function  |  参数（file文件对象）
successCallback  |  上传成功的回调函数 $emit('successCallback')  |  Function  | 
delUploadsFile  |  服务器文件删除回调 $emit('delUploadsFile', id)  |  Function  | 

>> PS: previewFile(文件预览)：默认方法限定了返回参数，不满足需要的请自定义
>> （1.2.0+）组件支持原el-upload所有的Attribute，定义了list-type为picture/picture-card，需要返回值携带url值

作者wx: jiang164851219

> github地址: https://github.com/chiefgroup/qf-qiniu-upload