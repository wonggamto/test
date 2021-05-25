import Vue from 'vue'
import router from '@/router'
import axios from 'axios'
import {showFullScreenLoading,hideFullScreenLoading} from './loading.js'
import store from '@/store/index'
import constConfig from './constConfig.js'

axios.defaults.baseURL=constConfig.SYSTEMAPI;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.isLoading !== false) { // 如果配置了isLoading: false，则不显示loading
      //showFullScreenLoading() //暂时去掉全局load
    }
      if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = `bearer ${store.state.token}`;
      }
      return config;
  },
  err => {
    //hideFullScreenLoading() //暂时去掉全局load
      return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
    //  hideFullScreenLoading() // 响应成功关闭loading //暂时去掉全局load
      if(response&&response.data&&!response.data.result)
      {
          switch (response.data.statusCode) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                store.commit('login_out');
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
                break;
          }
          return response;
      }
      else{
        return response;
      }
     
  },
  error => {
      if (error.response) {
         console.log('axios.interceptors.error.response',error.response);
      }
     // hideFullScreenLoading() //暂时去掉全局load
      return Promise.reject(error)   // 返回接口返回的错误信息
});

//对axios的实例重新封装成一个plugin ,方便 Vue.use()
export default {
    install:function(Vue, Option){
        Object.defineProperty(Vue.prototype, "$http", { value: axios });
    }
}