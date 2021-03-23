<template>
  <div class="upload-index">
    <div :class="[uploadFoces ? 'upload-fo' : '' , 'upload-box']" v-paste="handlePaste" tabindex="-1" @focus="upFoces" @blur="upBlur">
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
        :file-list="imgList"       
        drag
        multiple>
        <el-button size="mini" type="primary">{{title}}</el-button>
        <div slot="tip" class="annotation">PS: 单个文件不能大于{{ maxSize }}M</div>
      </el-upload>
    </div>

    <div style="display: none;">
      <img ref="qfUploadLogo" class="qf-upload-logo" :src="watermarkImg || '../../assets/qf_logo.png'">
    </div>
  </div>
</template>

<script>
import paste from '../../directive/el-paste' // paste directive

export default {
  name: 'QfQiniuUpload',
  directives: { paste },
  props: {
    orderId: {   // 订单的ID， 文件关联的订单
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '文件上传',
    },
    dir: {
      type: String,
      default: 'dev'
    },
    num: {
      type: Number,
      default: 9
    },
    uploadType: {
      /* 1 合同相关 10 公共文件 */
      type: String,
      default: '1'
    },
    uploadName: {
      /* 20 付款申请文件； 21 付款审核文件； 22 退款审核文件； 23 开票审核文件； 24 文件夹 */
      type: String,
      default: '24'
    },
    uploadStatus: {
      default: ''
    },
    upNum: {
      type: Number,
      default: 0
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
      upToken: '',
      maxSize: 500,
      imgList: [],
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFoces: false,
      showFileList: true,
    }
  },
  created () {
  },
  mounted() {
  },
  methods: {
    upNumAddSub(n){
      let num = this.upNum + n
      this.$emit('update:upNum', num)
    },
    handleRemove(file, fileList) {
      // this.fileList = fileList
      for(var i in this.imgList){
        if(file.id == this.imgList[i].id){
          this.imgList.splice(i,1)
        }
      }
      this.$refs.upload.abort(); //取消上传
    },
    beforeRemove(file, fileList) {
      if(file && file.status === 'success'){
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
        if(!isLtM) {
          reject()
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
      that.showFileList = true
      let file = '', key = '', name = '';
      let dirName = process.env.VUE_APP_TITLE === 'stage' ? `${this.dir}_dev` : this.dir
      if(type && type == 'paste'){
        file = params; // 对象，上传的文件
      }else{
        file = params.file; // 对象，上传的文件
      }
      name = file.name;
      if(this.uploadStatus){
        var name2 = name.split('.')
        if(this.uploadStatus == 1){
          name = '免费品牌交付表' + this.dateFormat(new Date(), 'date') + '.' + name2[name2.length - 1]
          file = new File([file], name)
        }else if(this.uploadStatus == 2) {
          name = '营业执照' + '.' + name2[name2.length - 1]
          file = new File([file], name)
        }
      }
      key = `${dirName}/${new Date().getTime()}_${name}`; // 文件资源名
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
      * params: object，用来放置自定义变量;
      * mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；
      * 限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      */
      let paramsObj = null
      if(this.uploadType == 10){
        paramsObj = {
          'x:type': '' + this.uploadType,
          'x:typeId': 1,
        }
      }else {
        paramsObj = {
          'x:type': '' + this.uploadType,
          'x:typeId': '' + this.orderId,
          'x:field': '' + this.uploadName,
          'x:val': '' + this.uploadStatus,
        }
      }
      let putExtra = {
        fname: name,
        params: paramsObj, 
        // mimeType: ["image/png", "image/jpeg", "image/gif"]
      };
      let observe = {
        next (res) {
          // console.log('已上传大小，单位为字节：' + res.total.loaded)
          // console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
          // console.log('当前上传进度，范围：0～100：' + res.total.percent);
          if(params.onProgress){
            params.onProgress({percent: res.total.percent})
          }
        },
        error (err) {
          that.upNumAddSub(-1)
          that.$notify.closeAll()
          that.$notify.error(`"${name}"上传失败`)
          that.imgList.forEach((element, i) => {
            if(element.uid == file.uid){
              that.imgList.splice(i, 1)
            }
          });
          // console.log('错误信息', err)
        },
        complete (res) {
          that.upNumAddSub(-1)
          //完成后的操作
          //上传成功以后会返回key 和 hash  key就是文件名了！
          // that.showFileList = false
          that.$notify.closeAll()
          that.$notify.success(`"${name}"上传成功`)
          that.imgList.forEach((element, i) => {
            if(element.uid == file.uid){
              that.imgList.splice(i, 1)
            }
          });
          
          that.$emit('getBig', res.uploads, that.uploadStatus)
        }
      };
      //开始上传  token 需要找后端获取(单独的方法)
      this.$notify({
        message: `"${name}"上传中...`,
        duration: 0
      });
      this.$emit('qiniuFn', (upToken) => {
        let observable = qiniu.upload(file, key, upToken, putExtra, config)
        let subscription = observable.subscribe(observe)
        // subscription.unsubscribe(); // 终止上传行为
      })
    },

    /* 图片压缩方法-canvas压缩 */
    compressUpload(image, file, multiple) {
      var logoImg = this.$refs.qfUploadLogo
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
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
    },
    // 焦点设置
    upFoces() {
      this.uploadFoces = true
    },
    upBlur() {
      this.uploadFoces = false
    },

    //时间格式化
    dateFormat(data, type) {
      if(data){
        data = typeof data === 'string' ? data.replace(/-/g, '/') : data
        var now = new Date(data);
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒

        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        if (hh < 10) {
          hh = "0" + hh;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        if (ss < 10) {
          ss = "0" + ss;
        }
        if (type == 'date') {
          return (year + "-" + month + "-" + day);
        } else if (type == 'month') {
          return (year + "-" + month);
        } else if (type == 'time') {
          return (hh + ':' + mm + ':' + ss)
        } else if (type == 'md') {
          return (month + '.' + day)
        } else {
          return (year + "-" + month + "-" + day + ' ' + hh + ':' + mm + ':' + ss);
        }
      }else{
        return ''
      }
    }
  }
}
</script>
