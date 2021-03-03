import QfQiniuUpload from './qf-qiniu-upload';

QfQiniuUpload.install = function(Vue) {
  Vue.component(QfQiniuUpload.name, QfQiniuUpload);
}

export default QfQiniuUpload;