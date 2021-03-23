import Vue from 'vue'
import App from './App.vue'

import { Button, Upload, Notification, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { QfQiniuUpload } from '../dist/qfUpload'

Vue.use(Button)
Vue.use(Upload)

console.log(QfQiniuUpload)
// Vue.use(QfQiniuUpload)

Vue.config.productionTip = false

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
  el: '#app',
  render: h => h(App)
})
