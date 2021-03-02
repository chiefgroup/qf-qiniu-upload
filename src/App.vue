<template>
  <div id="app">
    <!-- 七牛上传组件 -->
    <QfQiniuUpload :upNum.sync="upNum" @qiniuFn="qiniuFunction" @getBig="getBig" />
  </div>
</template>

<script>
import QfQiniuUpload from '../src/qf-qiniu-upload/qf-qiniu-upload'
export default {
  name: 'app',
  components: { QfQiniuUpload },
  data() {
    return {
      upNum: 0 // 判断上传是否完成
    }
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
