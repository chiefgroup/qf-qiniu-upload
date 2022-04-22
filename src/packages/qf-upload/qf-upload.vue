<template>
  <div class="upload-index">
    <div v-if="isImg" :class="[uploadFoces ? 'upload-fo' : '' , 'upload-box']" v-paste="handlePaste" tabindex="-1" @focus="upFoces" @blur="upBlur">
      <p>复制粘贴区域，鼠标点击此区域后可以使用ctrl+V的方式进行图片粘贴</p>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="container"
        v-bind="$attrs"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadFiles"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        :limit="num"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :file-list="fileList"
        drag
        multiple>
        <el-button size="mini" type="primary">{{title}}</el-button>
        <div slot="tip" class="annotation">PS: 单个文件不能大于{{ maxSize }}M</div>
      </el-upload>
    </div>
    <el-upload
      v-else
      class="upload-demo"
      ref="upload"
      action="container"
      v-bind="$attrs"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadFiles"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :limit="num"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :file-list="fileList"
      drag
      multiple>
      <el-button size="mini" type="primary">{{title}}</el-button>
      <div slot="tip" class="annotation">PS: 只能上传pdf, 文件不能大于{{ maxSize }}M</div>
    </el-upload>

    <div class="qf-upload-logo">
      <img v-if="watermarkConfig.img" ref="qfUploadLogo" :src="watermarkConfig.img">
    </div>

    <!-- 图片预览 -->
    <div class="qifu-view" v-if="showViewer">
      <span class="qifu-view-close" @click="closeViewer">&#215;</span>
      <img :src="srcUrl">
    </div>
  </div>
</template>

<script>
import { openLink } from '../../utils/index'
import axios from "axios";
const CancelToken = axios.CancelToken;
import paste from '../../directive/el-paste'

export default {
  name: 'QfUpload',
  directives: { paste },
  props: {
    // 文件类型限制 image|pdf|txt|video|audio|xls|xlsx|zip|rar|ppt
    isFileType: { type: String, default: '' },
    maxSize: { type: Number, default: 20 }, // 限制上传文件大小 default:500
    title: { type: String, default: '点击/拖拽到此上传' }, // 文件上传标题
    fileList: { type: Array, default: () => [] },
    dir: { type: String, default: 'dev' }, // 上传文件地址
    num: { type: Number, default: 9 }, // 最大上传数量 (0|null 则不限制)
    upNum: { type: Number, default: 0 }, // 判断是否在上传中...
    rename: { type: String, default: '' }, // 判断是否需要给上传的文件重命名
    private: { type: Number, default: 1 }, // 文件是否私有  default 是
    watermark: { type: Boolean, default: true }, // 水印
    watermarkConfig: { // 水印配置  { title: '', img:'' }
      type: Object, 
      default: () => ({
        title: '电商服务大平台',
        img: ''
      })
    },
    uploadsFile: Function, // 上传请求
    previewFile: Function, // 预览方法
  },
  computed: {
    isImg() {
      if(this.isFileType && this.isFileType.indexOf('image') === -1){
        return false
      }
      return true
    }
  },
  data() {
    return {
      cancelList: [], // 请求列表
      uploadFoces: false,
      showViewer: false,
      srcUrl: ''
    }
  },
  mounted() {
    this.cancelList = []
    // conosle.log(ElImageViewer)
  },
  methods: {
    upNumAddSub(n){
      // 程序跑太快了的bug: 导致upNum没有即使更新
      setTimeout(() => {
        let newNum = this.upNum + n
        this.$emit('update:upNum', newNum)
      }, 100)
    },
    closeViewer () {
      this.showViewer = false
    },
    handlePictureCardPreview(file) {
      if(this.previewFile){
        this.previewFile(file)
      }else{
        let name = file.name
        let fileType = name.substr(name.lastIndexOf(".") + 1)
        if('jpg|jpeg|png'.indexOf(fileType) !== -1){
          this.srcUrl = file.full_path
          this.showViewer = true
        }else{
          openLink(file.full_path)
        }
      }
    },
    handleRemove(file) {
      if(file.id){ // 已经上传成功的文件
        for(var i in this.fileList){
          if(file.id == this.fileList[i].id){
            this.fileList.splice(i,1)
          }
        }
        if(this.delserver){ // 是否删除服务器文件
          this.$emit('delUploadsFile', file.id)
        }
      }else if(file.uid){ // 未上传成功的调用去掉方法
        this.uploadEnd(null, file.uid)
        for(var i in this.cancelList){
          if(this.cancelList[i].uid == file.uid && typeof this.cancelList[i].cancel === `function`){
            this.cancelList[i].cancel()
            this.cancelList.splice(i,1)
          }
        }
        this.$refs.upload.abort(file); //取消上传
      }
    },
    beforeRemove(file) {
      if (file && file.status==="success") {
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
        /** 文件类型判断
        * image(jpg/jpeg/png) => image/*  => /^image\//.test()
        */
        let fileType = file.type
        let fileName = file.name.substring(file.name.lastIndexOf('.'))
        let isFileObj = {
          image: /^image\//.test(fileType),
          pdf: fileType === 'application/pdf',
          txt: /^text\//.test(fileType),
          video: /^video\//.test(fileType),
          audio: /^video\//.test(fileType),
          xls: fileType === 'application/vnd.ms-excel',
          xlsx: fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          zip: /^application\/.*zip/.test(fileType),
          rar: fileName === '.rar',
          ppt: fileName === '.ppt' || fileName === '.pptx',
        }
        if(this.isFileType){
          let isFileType = this.isFileType.split('|') // image|pdf|txt
          let isFileBool = false
          for(var v of isFileType){
            if(isFileObj[v]){
              isFileBool = true
              break
            }
          }
          if(!isFileBool){
            this.$message.warning(`只能上传${isFileType}类型的文件！`)
            return reject()
          }
        }
        if(isFileObj.image){
          let isSize = 1 // 判断文件是否需要压缩
          if(size > 2 && size <= 5){
            isSize = 0.9
          }else if(size > 5 && size <= 10){
            isSize = 0.8
          }else if(size > 10){
            isSize = 0.7
          }
          if(isSize < 1 || this.watermark){
            let image = new Image(), resultBlob = '';
            image.src = URL.createObjectURL(file);
            image.onload = () => {
              // 调用方法获取blob格式，方法写在下边
              resultBlob = this.compressUpload(image, file, isSize);
              resolve(resultBlob)
            }
            image.onerror = () => {
              reject()
            }
          }else{
            resolve(file)
          }
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
      let name = '', _file = '';
      if(type && type == 'paste'){
        name = params.name || 'image.png'
        _file = params
      }else{
        name = params.file.name
        _file = params.file
      }
      this.upNumAddSub(1)
      // 需要给file重命名的话
      if(this.rename){
        let nameType = name.substr(name.lastIndexOf(".") + 1)
        _file = new File([_file], this.rename + nameType)
      }
      let uid = _file.uid
      // 通过 FormData 对象上传文件
      const formData = new FormData()
      formData.append('file[]', _file)
      formData.append('private', this.private)
      formData.append('dir', this.dir)

      // 创建一个变量如cancel用于存储这个请求的取消方法
      let cancelToken = new CancelToken(function executor(c) {
        that.cancelList.push({
          uid: uid,
          cancel: c
        })
      })

      // 上传文件进度条
      let onUploadProgress = progressEvent => {
        let percent = (progressEvent.loaded / progressEvent.total * 100) | 0 //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
        params.onProgress({ percent:percent })
      }
      let ny = null
      setTimeout(() => {
        ny = this.$notify({
          message: `"${name}"上传中...`,
          duration: 0
        });
      }, 100)
      this.uploadsFile(formData, cancelToken).then(res => {
        let data = res.data.data
        if(data instanceof Array){
          this.fileList.push(...data)
        }else{
          this.fileList.push(data)
        }
        this.uploadEnd(ny, uid)
      }).catch(() => {
        this.uploadEnd(ny, uid)
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
        let watermarkText = this.watermarkConfig.title;
        let watermarkImg = this.watermarkConfig.img;
        let logoImg, imgW, imgH;
        if(watermarkImg){
          logoImg = this.$refs.qfUploadLogo
          imgW = logoImg.width
          imgH = logoImg.height
        }
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
              if(watermarkImg){
                ctx.drawImage(logoImg, w - 180, h - 30, imgW, imgH)
              }
              ctx.fillText(watermarkText, w, h);
            }
          }
        }
      }
      
      // 进行最小压缩0.1
      let compressData = canvas.toDataURL('image/jpeg', multiple)

      // 压缩后调用方法进行base64转Blob，方法写在下边
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
      return new File([u8arr], fileName, {type:fileType || 'image/jpg'});  //返回file对象
    },
    // 粘贴
    handlePaste(e) {
      let _this = this
      if(this.fileList.length >= this.num){
        this.$message.warning(`只能上传 ${this.num} 个文件`)
        return
      }
      let file = null
      if (e.clipboardData && e.clipboardData.items[0] && e.clipboardData.items[0].type && e.clipboardData.items[0].type.indexOf('image') > -1) { //这里就是判断是否有粘贴进来的文件且文件为图片格式
        file = e.clipboardData.items[0].getAsFile();
      }else {
        this.$message.warning('上传的文件必须为图片且无法复制本地图片且无法同时复制多张图片')
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

      // _this.uploadFiles(file, 'paste')
    },

    // 焦点设置
    upFoces() {
      this.uploadFoces = true
    },
    upBlur() {
      this.uploadFoces = false
    },

    // 上传结束的处理
    uploadEnd(notifyName, uid) {
      if(notifyName){
        notifyName.close()
        this.upNumAddSub(-1)
      }
      for(var i in this.fileList){
        if(this.fileList[i].uid == uid){
          this.fileList.splice(i, 1)
          break
        }
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

.qifu-view{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background: rgba(0, 0, 0, .5);
}

.qifu-view img{
  max-width: 100%;
  max-height: 100%; 
}

.qifu-view-close{
  cursor: pointer;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  font-size: 30px;
  color: #fff;
  background: #606266;
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 3;
}
</style>