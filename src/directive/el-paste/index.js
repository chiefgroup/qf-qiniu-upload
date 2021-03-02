import paste from './paste'

const install = function(Vue) {
  Vue.directive('paste', paste)
}

if (window.Vue) {
  window.paste = paste
  Vue.use(install); // eslint-disable-line
}

paste.install = install
export default paste
