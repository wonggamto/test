import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
      sideStatus:0,
      options: [],
      activeIndex: '/user',
      userInfo: {},
      token:'',
      systemInfo:{}
  },
  mutations: {
    set_side_status(state,statusValue){
      this.state.sideStatus=statusValue;
    },
    //设置token
    set_token(state,tokendata){
        this.state.token=tokendata;
    },//退出登录
    login_out(state)
    {
      this.state.token='';
    },
    // 添加tabs
    add_tabs (state, data) {

          let isExit=this.state.options.find(x=>{
            return x.route==data.route
          })
          if(!isExit){
            this.state.options.push(data);
          }
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index;
    },
    // 设置详情信息
    save_detail_info (state, info) {
      this.state.userInfo = info;
    }
  }
});

export default store;