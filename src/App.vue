<template>
  <div id="app">
    <!-- 七牛上传组件 -->
    <QfQiniuUpload :upNum.sync="upNum" @qiniuFn="qiniuFunction" @getBig="getBig" />
    <QfUpload :upNum.sync="upNum" @uploadsFile="uploadsFile" @delUploadsFile="delUploadsFile" />
  </div>
</template>

<script>
import QfQiniuUpload from '../src/packages/qf-qiniu-upload'
import QfUpload from '../src/packages/qf-upload'

export default {
  name: 'app',
  components: { QfQiniuUpload, QfUpload },
  data() {
    return {
      upNum: 0 // 判断上传是否完成
    }
  },
  mounted() {
  },
  methods: {
    qiniuFunction(cb) {
      // 执行请求
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

.upload-index .el-upload {
  width: 100%;
}

.upload-index .el-upload .el-upload-dragger {
  width: 100%;
  height: auto;
  border: none;
  text-align: left;
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
  width: 93px;
  height: 36px;
  opacity: 0.1;
}

.view-img{
  text-align: center;
}

.view-img img{
  max-width: 100%;
}
</style>
