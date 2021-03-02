export default {
  //复制粘贴指令
  inserted(el, binding, vnode) {
    el.addEventListener('paste', function(event){ //这里直接监听元素的粘贴事件
      binding.value(event)
    })
  }
}