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
      @getBig="getBig"
    />
    <!-- <QfUpload :upNum.sync="upNum" @uploadsFile="uploadsFile" @delUploadsFile="delUploadsFile" /> -->
  </div>
</template>

<script>
// import QfQiniuUpload from './packages/qf-qiniu-upload'
// import QfUpload from './packages/qf-upload'
import { qiniuToken, qiniuView } from './api/common'

export default {
  name: 'app',
  // components: { QfQiniuUpload, QfUpload },
  data() {
    return {
      qiniuToken: qiniuToken,
      qiniuView: qiniuView,
      fileList: [],
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

.upload-index .el-upload .el-upload-dragger {
  width: auto;
  height: auto;
  border: none;
  text-align: left;
}

.upload-index :focus{
  outline: none;
}

.annotation{
  color: #999;
  font-size: 12px;
  line-height: 14px;
}

.upload-box{
  border: 1px solid #a9a9a9;
  border-radius: 6px;
  padding: 5px;
  text-align: left;
}
.upload-box > p {
  font-size: 12px;
  line-height: 14px;
  margin: 0;
  margin-bottom: 5px;
}

.qf-upload-logo{
  height: 0; 
  overflow: hidden;
}

.qf-upload-logo img{
  max-width: 93px;
  max-height: 36px;
}

.view-img{
  text-align: center;
}

.view-img img{
  max-width: 100%;
}

.upload-fo{
  border: 1px solid #409eff;
}
</style>
