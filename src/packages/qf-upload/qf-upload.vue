<template>
  <div class="upload-index">
    <div v-if="isImg" :class="[uploadFoces ? 'upload-fo' : '' , 'upload-box']" v-paste="handlePaste" tabindex="-1" @focus="upFoces" @blur="upBlur">
      <p>复制粘贴区域，鼠标点击此区域后可以使用ctrl+V的方式进行图片粘贴</p>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="container"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadFiles"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        :limit="num"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :file-list="imgList"
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
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadFiles"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :limit="num"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :file-list="imgList"
      drag
      multiple>
      <el-button size="mini" type="primary">{{title}}</el-button>
      <div slot="tip" class="annotation">PS: 只能上传pdf, 文件不能大于{{ maxSize }}M</div>
    </el-upload>

    <el-dialog append-to-body :visible.sync="dialogVisible">
      <div class="view-img">
        <img :src="dialogImageUrl" alt="">
      </div>
    </el-dialog>

    <div style="display: none;">
      <img ref="qfUploadLogo" class="qf-upload-logo" :src="watermarkImg || '../../assets/qf_logo.png'">
    </div>
  </div>
</template>

<script>
import axios from "axios";
const CancelToken = axios.CancelToken;

// import { uploadsFile } from '@/api/user'
import paste from '../../directive/el-paste'

export default {
  name: 'QfUpload',
  directives: { paste },
  props: {
    isImg: { type: Boolean, default: true }, // 是否可上传图片文件
    title: { type: String, default: '点击/拖拽到此上传' },
    imgList: {
      type: Array,
      default: []
    },
    dir: {   // 上传文件的位置
      type: String,
      default: 'dev'
    },
    num: {   //  最大文件数
      type: Number,
      default: 9
    },
    delserver: {   // 判断是否能删除服务器的文件
      type: Boolean,
      default: true
    },
    uploadName: {  // 文件分类
      //  20 付款申请文件； 21 付款审核文件； 22 退款审核文件； 23 开票审核文件; 24 文件夹
      type: String,
      default: ''
    },
    uploadStatus: {   // 文件对应的状态
      default: ''
    },
    private: {   // 文件是否私有  default 是
      type: Number,
      default: 1
    },
    watermark: {  // 水印
      type: Boolean,
      default: true
    },
    watermarkImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      maxSize: 20,
      fileList: [],
      cancelList: [], // 请求列表
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFoces: false,
    }
  },
  created () {
  },
  mounted() {
    this.cancelList = []
  },
  methods: {
    upNumAddSub(n){
      let num = this.upNum + n
      this.$emit('update:upNum', num)
    },
    handlePictureCardPreview(file) {
      if(file.full_path){
        if(this.isImg){
          this.dialogImageUrl = file.full_path;
          this.dialogVisible = true;
        }else{
          this.openBlank(file.full_path)
        }
      }
    },
    handleRemove(file, fileList) {
      // this.fileList = fileList
      for(var i in this.imgList){
        if(file.id == this.imgList[i].id){
          this.imgList.splice(i,1)
        }
      }
      this.$refs.upload.abort(); //取消上传
      for(var i in this.cancelList){
        if(this.cancelList[i].uid == file.uid && typeof this.cancelList[i].cancel === `function`){
          this.cancelList[i].cancel()
          this.cancelList.splice(i,1)
        }
      }
      // 删除服务器文件操作
      if(this.delserver && file.id){
        this.$emit('delUploadsFile', file.id)
      }
    },
    beforeRemove(file, fileList) {
      if (file && file.status==="success") {
        return this.$confirm(`确定移除当前文件？`)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.num} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeAvatarUpload(file) {
      let _this = this
      return new Promise((resolve, reject) => {
        let size = file.size / 1024 / 1024
        let isLtM = size < this.maxSize // 判定文件大小是否小于 this.maxSize
        let isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png');
        let isPDF = file.type === 'application/pdf'
        if(!isLtM) {
          this.$message.warning(`文件大小不能超过${this.maxSize}M`)
          reject()
        }
        if(this.isImg){
          if(this.dir == 'contract'){
            if(!isJPG && !isPDF) {
              this.$message.warning('请上传图片或者PDF类型的合同文件')
              reject()
            }
          }
          let isSize = 1 // 判断文件是否需要压缩
          if(size > 2 && size <= 5){
            isSize = 0.9
          }else if(size > 5 && size <= 10){
            isSize = 0.8
          }else if(size > 10){
            isSize = 0.7
          }
          if(isJPG && isSize){
            let image = new Image(), resultBlob = '';
            image.src = URL.createObjectURL(file);
            image.onload = () => {
              // 调用方法获取blob格式，方法写在下边
              resultBlob = _this.compressUpload(image, file, isSize);
              resolve(resultBlob)
            }
            image.onerror = () => {
              reject()
            }
          }else{
            resolve(file)
          }
        }else{
          if(!isPDF) {
            this.$message.warning('请PDF类型的合同文件')
            reject()
          }
          resolve(file)
        }
      })
    },
    handleChange(file, fileList) {
      for(var i in this.imgList){
        if(this.imgList[i].uid == file.uid){
          return
        }
      }
      this.imgList.push(file)
    },
    uploadFiles(params, type) {
      let that = this
      this.upNumAddSub(1)
      let name = '', _file = '', uid = '', renameFile = null;
      if(type && type == 'paste'){
        name = params.name || 'image.png'
        _file = params
        uid = params.lastModified || new Date().getTime()
      }else{
        name = params.file.name
        _file = params.file
        uid = params.file.uid
      }
      if(this.dir == 'business_license'){
        let name2 = name.split('.')
        name = '营业执照'
        renameFile = new File([_file], '营业执照.' + name2[1]);
      }
      // 通过 FormData 对象上传文件
      const formData = new FormData()
      if(renameFile){
        formData.append('file[]', renameFile)
      }else{
        formData.append('file[]', _file)
      }
      formData.append('private', this.private)
      let dirName = process.env.VUE_APP_TITLE === 'stage' ? `${this.dir}_dev` : this.dir
      formData.append('dir', dirName)

      if(this.uploadName){
        formData.append('field', this.uploadName)
        formData.append('val', this.uploadStatus)
      }

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
      let ny = this.$notify({
        message: `${name}上传中...`,
        type: 'info',
        duration: 0
      })
      this.$emit('uploadsFile', {
        formData,
        cancelToken,
        success: function(res) {
          if(res.data.error_code){
            that.$notify.error(`${name}上传失败`)
          }else{
            that.imgList.push(...res.data.data)
          }
          for(var i in that.cancelList){
            if(that.cancelList[i].uid == uid){
              that.cancelList.splice(i,1)
            }
          }
          for(var j in that.imgList){
            if(that.imgList[j].uid == uid){
              that.imgList.splice(j,1)
            }
          }
          ny.close()
          that.upNumAddSub(-1)
        },
        error: function(err) {
          for(var j in that.imgList){
            if(that.imgList[j].uid == uid){
              that.imgList.splice(j,1)
            }
          }
          var iList = that.imgList.slice()
          that.imgList.splice(0)
          that.imgList.push(...iList)
          ny.close()
          that.upNumAddSub(-1)
        }
      })
    },

    /* 图片压缩方法-canvas压缩 */
    compressUpload(image, file, multiple) {
      var logoImg = this.$refs.qfUploadLogo
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let initSize = image.src.length
      let { width, height } = image
      canvas.width = width
      canvas.height = height
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, width, height)
      
      // 水印 logoImg
      if(this.watermark){
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
              ctx.drawImage(logoImg, w - 180, h - 30, 93, 36)
              ctx.fillText('电商服务大平台', w, h);
            }
          }
        }
      }
      
      // 进行最小压缩0.1
      let compressData = canvas.toDataURL('image/jpeg', multiple)

      // 压缩后调用方法进行base64转Blob，方法写在下边
      let blobImg = this.dataURLtoFile(compressData, file.name, file.type)
     
      return blobImg
    },
    
    /* base64转Blob对象 */
    dataURItoBlob(data) {
      let byteString;
      if(data.split(',')[0].indexOf('base64') >= 0) {
          byteString = atob(data.split(',')[1])
      }else {
          byteString = unescape(data.split(',')[1])
      }
      let mimeString = data
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];
      let ia = new Uint8Array(byteString.length)
      for( let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], {type: mimeString})
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
      if(this.imgList.length >= this.num){
        this.$message.warning(`只能上传 ${this.num} 个文件`)
        return
      }
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
    }
  }
}
</script>
