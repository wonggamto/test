// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/axios'
import moment from 'moment'
//import {showFullScreenLoading,hideFullScreenLoading} from './common/loading'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index'
import qs from 'qs'
import VueLocalStorage from 'vue-localstorage'
import './assets/iconfont/font_whiteblack_common/iconfont.css'
import './assets/iconfont/font_color_flat/iconfont.css'
import './assets/iconfont/font_color_flat/iconfont.js'
import common from './common/common'
import constConfig from './common/constConfig'
import * as globalFilter from './common/globalFilter'
import configdict from './components/common/SystemDict.vue'
import layer from 'vue-layer'
import echarts from 'echarts'
import 'font-awesome/css/font-awesome.css'
import './common/commondirective'
Vue.prototype.$SYSCONST=constConfig
Vue.use(ElementUI,{ size: 'mini', zIndex: 3000 });
Vue.use(VueLocalStorage);
Vue.config.productionTip = false
Vue.prototype.$qs=qs
Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key])
})

Vue.use(common)
Vue.use(axios)
Vue.prototype.$moment=moment
Vue.component('config-dict',configdict)
Vue.prototype.$layer=layer(Vue,{msgtime:3});
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})


