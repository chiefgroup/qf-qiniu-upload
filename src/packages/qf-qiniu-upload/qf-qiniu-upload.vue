<template>
  <div class="upload-index">
    <div v-if="isImg" :class="[uploadFoces ? 'upload-fo' : '' , 'upload-box']" v-paste="handlePaste" tabindex="-1" @focus="upFoces" @blur="upBlur">
      <p>复制粘贴区域，鼠标点击此区域后可以使用ctrl+V的方式进行图片粘贴</p>
      <!-- :before-remove="beforeRemove" -->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="container"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadFiles"
        :on-remove="handleRemove"
        :limit="num"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-preview="handlePreview"
        drag
        multiple>
        <el-button size="mini" type="primary">{{ title }}</el-button>
        <div slot="tip" class="annotation">PS: 单个文件不能大于{{ maxSize }}M</div>
      </el-upload>
    </div>

     <el-upload
      v-else
      class="upload-demo"
      ref="upload"
      action="container"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadFiles"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :limit="num"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-preview="handlePreview"
      drag
      multiple>
      <el-button size="mini" type="primary">{{ title }}</el-button>
      <div slot="tip" class="annotation">PS: 只能上传pdf, 文件不能大于{{ maxSize }}M</div>
    </el-upload>

    <div class="qf-upload-logo">
      <img v-if="watermarkConfig.img" ref="qfUploadLogo" :src="watermarkConfig.img">
      <img v-else ref="qfUploadLogo" src="../../assets/qf_logo.png">
    </div>
  </div>
</template>

<script>
import { openLink } from '../../utils/index'
import paste from '../../directive/el-paste' // paste directive

export default {
  name: 'QfQiniuUpload',
  directives: { paste },
  props: {
    fileType: { type: String, default: '' }, // 上传文件类型： jpg|pdf (只能限制jpg|pdf)  
    maxSize: { type: Number, default: 500 }, // 限制上传文件大小 default:500
    title: { type: String, default: '文件上传' }, // 文件上传标题
    fileList: { type: Array, default: () => [] },
    dir: { type: String, default: '' }, // 上传文件地址
    private: { type: Number, default: 1 }, // 文件是否私有
    num: { type: Number, default: 9 }, // 最大上传数量 (0|null 则不限制)
    upNum: { type: Number, default: 0 }, // 判断是否在上传中...
    watermark: { type: Boolean, default: true }, // 水印
    watermarkConfig: { // 水印配置  { title: '', img:'' }
      type: Object, 
      default: () => ({
        title: '电商服务大平台',
        img: ''
      })
    },
    
    qiniuToken: Function, // 获取七牛token
    qiniuView: Function, // 七牛文件预览
  },
  computed: {
    isImg() { // 判断是否可上传图片文件
      if(!this.fileType || this.fileType.toLowerCase().indexOf('jpg') !== -1){
        return true
      }
      return false
    }
  },
  data() {
    return {
      uploadFoces: false
    }
  },
  methods: {
    upNumAddSub(n){
      let num = this.upNum + n
      this.$emit('update:upNum', num)
    },
    handleRemove(file) {
      for(var i in this.fileList){
        if(file.id == this.fileList[i].id){
          this.fileList.splice(i,1)
        }
      }
      this.$refs.upload.abort(); //取消上传
    },
    beforeRemove(file) {
      if(file && file.status === 'success'){
        return this.$confirm(`确定移除当前文件？`)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.num} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeAvatarUpload(file) {
      return new Promise((resolve, reject) => {
        let size = file.size / 1024 / 1024
        let isLtM = size < this.maxSize // 判定文件大小是否小于 this.maxSize
        if(!isLtM) {
          this.$message.warning(`文件大小不能超过${this.maxSize}M`)
          reject()
        }
        let isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
        let isPDF = file.type === 'application/pdf'
        let fileType = this.fileType.toLowerCase()
        if(fileType){
          if(fileType.indexOf('jpg') !== -1 && isJPG){
            /* ---------------- 图片文件压缩&水印处理 --------------- */
            let size = file.size / 1024 / 1024
            let isSize = 1 // 判断文件是否需要压缩
            if(size > 2 && size <= 5){
              isSize = 0.9
            }else if(size > 5 && size <= 10){
              isSize = 0.8
            }else if(size > 10){
              isSize = 0.7
            }
            if(isSize !== 1 || this.watermark){
              let image = new Image();
              image.src = URL.createObjectURL(file);
              image.onload = () => {
                // 调用方法获取blob格式，方法写在下边
                file = this.compressUpload(image, file, isSize);
                resolve(file)
              }
              image.onerror = () => {
                this.$message.error('获取图片资源失败，请重新上传！')
                reject()
              }
            }
            /* ---------------- 图片文件压缩&水印处理 END --------------- */
          }else if(fileType.indexOf('pdf') !== -1 && isPDF) {
            resolve(file)
          }
          this.$message.warning(`请上传“${this.fileType}”类型的文件`)
          reject()
        }else{
          resolve(file)
        }
      })
    },
    handleChange(file) {
      for(var i in this.fileList){
        if(this.fileList[i].uid == file.uid){
          return
        }
      }
      this.fileList.push(file)
    },
    uploadFiles(params, type) {
      let that = this
      let file = '';
      if(type && type == 'paste'){
        file = params;
      }else{
        file = params.file;
      }
      
      this.upNumAddSub(1)
      let name = file.name
      /*
      * config.useCdnDomain: 是否使用 cdn 加速域名，true or false，默认为 false。
      * config.disableStatisticsReport: 是否禁用日志报告，为布尔值，默认为false。
      * config.region: 选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
      * config.retryCount: 上传自动重试次数（整体重试次数）；默认3次（即上传失败后最多重试两次）；
      * config.concurrentRequestLimit: 分片上传的并发请求量，number，默认为3；
      * config.checkByMD5: 是否开启 MD5 校验，在断点续传时校验分片，默认为 false，不开启。
      */
      let config = {
        useCdnDomain: true, 
        concurrentRequestLimit: 1, // 并发改为1防止分片上传失败，上传速度会受到影响
        // region: qiniu.region.z0
      };

      /*
      * fname: string，文件原文件名.
      * customVars: object，用来放置自定义变量 {'x:xxx': ''};  3.x版本
      * mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；
      * 限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      */
      let paramsObj = null
      let putExtra = {
        fname: name,
        customVars: paramsObj,
        // mimeType: ["image/png", "image/jpeg", "image/gif"]
      };

      //开始上传
      let notifyName = this.$notify({
        message: `"${name}"上传中...`,
        duration: 0
      });

      // 获取七牛token
      this.qiniuToken({is_private: this.private}).then(res => {
        let qiniuObj = res.data.data
        if(qiniuObj) {
          let key = `${qiniuObj.dir || 'qiniu'}${this.dir ? '/' + this.dir : ''}/${new Date().getTime()}_${name}`; // 文件资源名

          let observable = qiniu.upload(file, key, qiniuObj.token, putExtra, config)
          observable.subscribe({
            next (res) {
              // console.log('已上传大小，单位为字节：' + res.total.loaded)
              // console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
              // console.log('当前上传进度，范围：0～100：' + res.total.percent);
              if(params.onProgress){
                params.onProgress({percent: res.total.percent})
              }
            },
            error (err) {
              that.uploadEnd(notifyName, file, false, type)
              that.$notify.error(`"${name}"上传失败`)
            },
            complete (res) {
              //完成后的操作
              //上传成功以后会返回key 和 hash  key就是文件名了！
              console.log('上传成功', file)
              let uploads = {
                id: file.uid,
                name,
                key,
                path: `http://${qiniuObj.domain}/${key}`,
                private: that.private
              }
              if(that.private !== 1){
                uploads.file_path = uploads.path
              }
              that.uploadEnd(notifyName, uploads, true, type)
              that.$notify.success(`"${name}"上传成功`)
              
              // 成功后是否需要回调
              that.$emit('successCallback', uploads)
            }
          })

          // let subscription = observable.subscribe()
          // subscription.unsubscribe(); // 终止上传行为
        }
      }).catch(() => {
        this.uploadEnd(notifyName, file, false, type)
      })
    },

    /* 图片压缩方法-canvas压缩 */
    compressUpload(image, file, multiple) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let { width, height } = image
      canvas.width = width
      canvas.height = height
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, width, height)

      // 水印 logoImg
      if(this.watermark){
        let logoImg = this.$refs.qfUploadLogo
        let watermarkText = this.watermarkConfig.title
        let imgW = logoImg.width
        let imgH = logoImg.height
        ctx.rotate(-20 * Math.PI / 180)
        ctx.translate(-width/2, -height/2);
        ctx.font = '18px Vedana'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'Middle'
        ctx.globalAlpha = 0.15
        //水印密度
        for (let i = 0; i < width / 110; i++) {  
          for (let j = 0; j < height / 35; j++) {
            if(i % 2 === j % 2){
              let w = i * 300;
              let h = j * 80
              ctx.drawImage(logoImg, w - 180, h - 30, imgW, imgH)
              ctx.fillText(watermarkText, w, h);
            }
          }
        }
      }
      
      // 进行最小压缩0.1
      let compressData = canvas.toDataURL('image/jpeg', multiple)
      // 压缩后调用方法 将base64转换为file对象
      let blobImg = this.dataURLtoFile(compressData, file.name, file.type)
      blobImg.uid = blobImg.uid || file.uid
      return blobImg
    },
    
    /** 
     * @method 将base64转换为file对象
     * @param {String} dataURL base64地址(必填，带base64头前缀的地址：data:image/jpeg;base64,/XXXXXXXXXX)
     * @param {String} fileName 文件名称(必填)
     * @param {String} fileType 图片类型 默认image/jpg
     * @return {Object} file对象
    */
    dataURLtoFile(dataURL, fileName, fileType) {
      var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, {type: fileType || 'image/jpg'});  //返回file对象
    },

    // 粘贴
    handlePaste(e) { 
      let _this = this
      let file = null
      if (e.clipboardData && e.clipboardData.items[0] && e.clipboardData.items[0].type && e.clipboardData.items[0].type.indexOf('image') > -1) { //这里就是判断是否有粘贴进来的文件且文件为图片格式
        file = e.clipboardData.items[0].getAsFile();
      }else {
        this.$message({
          type: 'warning',
          message: '上传的文件必须为图片且无法复制本地图片且无法同时复制多张图片'
        })
        return;
      }
      file.uid = new Date().getTime()
      let image = new Image(), resultBlob = '';
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        // 调用方法获取blob格式，方法写在下边
        resultBlob = _this.compressUpload(image, file, 1);
        _this.uploadFiles(resultBlob, 'paste')
      }
      image.onerror = () => {
        this.$message.error('图片上传错误，请稍后重试！')
      }
    },
    // 焦点设置
    upFoces() {
      this.uploadFoces = true
    },
    upBlur() {
      this.uploadFoces = false
    },

    // 点击文件的钩子
    handlePreview(file) {
      if(this.previewFile){
        this.previewFile(file)
      }else{
        if(file.file_path){
          openLink(file.file_path)
        }else{
          this.qiniuView({url: file.path}).then(res => {
            let data = res.data.data
            openLink(data.download_url)
          })
        }
      }
    },

    // 上传结束的处理
    uploadEnd(notifyName, file, isSuccess, type) {
      notifyName && notifyName.close()
      this.upNumAddSub(-1)
      if(isSuccess){
        if(type === 'paste'){
          this.fileList.push(file)
          return
        }
        this.fileList.forEach((element, i) => {
          if(element.uid == file.id){
            this.fileList.splice(i, 1, file)
          }
        })
      }else{
        this.fileList.forEach((element, i) => {
          if(element.uid == file.uid){
            this.fileList.splice(i, 1)
          }
        })
      }
    }
  }
}
</script>

<style>
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

.upload-fo{
  border: 1px solid #409eff;
}
</style>