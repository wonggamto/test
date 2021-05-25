import { Loading } from 'element-ui';
import Vue from 'vue'
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '努力加载中...',
    background: 'rgba(0,0,0,0.5)',
    target: document.querySelector('.loading-area') // 设置加载动画区域
  })
}

function endLoading () {
  loading.close()
}

export  function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export  function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}


