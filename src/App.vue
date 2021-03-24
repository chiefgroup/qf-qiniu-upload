<template>
  <div id="app">
    <!-- 七牛上传组件 -->
    <QfQiniuUpload
      :upNum.sync="upNum"
      @successCallback="qiniuFunction"
      :watermarkConfig="watermarkConfig"
      :fileList="fileList"
      :qiniuToken="qiniuToken"
      :qiniuView="qiniuView"
    />
    <QfUpload
      :upNum.sync="upNum"
      :fileList="imgList"
      dir="haitian/test"
      :uploadsFile="uploadsFile"
      @successCallback="qiniuFunction"
      @delUploadsFile="delFile"
    />
  </div>
</template>

<script>
// import QfQiniuUpload from './packages/qf-qiniu-upload'
// import QfUpload from './packages/qf-upload'
import { qiniuToken, qiniuView, uploadsFile } from './api/common'

export default {
  name: 'app',
  // components: { QfQiniuUpload, QfUpload },
  data() {
    return {
      qiniuToken: qiniuToken,
      qiniuView: qiniuView,
      uploadsFile: uploadsFile,
      fileList: [],
      imgList: [],
      upNum: 0, // 判断上传是否完成
      watermarkConfig: {
        title: '这是一段测试文字',
        img: require("../src/assets/logo2.png")
      }
    }
  },
  mounted() {
  },
  methods: {
    qiniuFunction(cb) {
      // 执行请求
      console.log('成功回调：', cb)
    },
    getBig(data, type) {
      // 处理回调数据
    },
    delFile(id) {
      console.log('删除文件回调', id)
    },
    previewFile(file) {
      console.log('预览2', file)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
