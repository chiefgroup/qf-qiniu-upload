import QfQiniuUpload from './qf-qiniu-upload/index.js'
import QfUpload from './qf-upload/index.js'

const components = [
  QfQiniuUpload,
  QfUpload
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  QfQiniuUpload,
  QfUpload
}