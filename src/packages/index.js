import QfQiniuUpload from './qf-qiniu-upload/index.js'

const components = [
  QfQiniuUpload
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default {
  install,
  QfQiniuUpload
}