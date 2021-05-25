<template>
    <el-container>
          <el-header  style="height:122px;">
        
          </el-header>
          <el-row :gutter="0">
            <el-col :span="mianLeftSpan">
              <el-menu  :default-active="$route.path"  router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-menu-item index="1" @click="fnCollapse" class="collapse">
                      <i class="el-icon-d-arrow-left"  v-show="!isCollapse"></i>
                      <i class="el-icon-d-arrow-right" v-show="isCollapse"></i>
                    </el-menu-item>
                    <div :style="`height:${clientHeight}px;`">
                        <el-scrollbar style="height:100%;" > 
                          <el-menu-item  v-show="menu.childNode.length==0" v-for="menu in menuslist"
                                              :index="menu.route"
                                              :key="menu.id">
                                  <i class="el-icon-menu"></i> <span slot="title">{{menu.name}}</span>
                          </el-menu-item>
                           <el-submenu v-show="menu.childNode.length>0"  v-for="menu in menuslist" :index="menu.route" :key="'f'+menu.id">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span slot="title" v-show="!isCollapse">{{menu.name}}</span>
                                </template>
                                <el-menu-item  v-show="child.childNode.length==0" v-for="child in menu.childNode" :key="'d'+child.id" :index="child.route">
                                   <span slot="title"> <i class="el-icon-menu"></i>{{child.name}}</span>
                                </el-menu-item>
                                <el-submenu  v-show="child.childNode.length>0" v-for="child in menu.childNode" :key="'c'+child.id" :index="child.name">
                                   <span slot="title"> <i class="el-icon-menu"></i>{{child.name}}</span>
                                        <el-menu-item v-for="childsun in child.childNode" :key="childsun.id" :index="childsun.route">  <i class="el-icon-menu"></i>{{childsun.name}}</el-menu-item>
                                </el-submenu>
                           </el-submenu>
                        </el-scrollbar>  
                    </div>
              </el-menu>
            </el-col>
            <el-col :span="mianRightSpan" class="rightSpan">
                <!-- 此处放置el-tabs代码 
                <div class="template-tabs">-->
                  <el-tabs
                    v-model="activeIndex"
                    type="card"
                    closable
                    @tab-click="tabClick"
                    v-if="options.length"
                    @tab-remove="tabRemove">
            
                    <el-tab-pane
                      :key="item.name"
                      v-for="item in options" 
                      :label="item.name"
                      :name="item.route">
                    </el-tab-pane>
                    <div :style="`height:${clientHeight}px;`">
                      <el-scrollbar style="height:100%;">
                      <router-view/>
                    </el-scrollbar>
                    </div>
                  </el-tabs>
            </el-col>
          </el-row>
    </el-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      clientHeight:'',
      isCollapse: false,
      mianLeftSpan:4,
      mianRightSpan:20,
      menuslist:[
              { route: '/feedback',id:'12x',name: '角色权限',childNode:[
                                                                {route: '/userlist',id:'12aa2x', name: '用户列表',childNode:[]},
                                                                {route: '/salary11',id:'122fx', name: '角色管理',childNode:[]},
                                                                {route: '/roleslist',id:'11d2x', name: '权限',childNode:[]}
                                                                ]
              },
              { route: '#', id:'11221d2x',name: '系统管理',childNode:[
                                                      {route: '/test', id:'11e221d2x', name: '功能管理',childNode:[]},
                                                      {route: '/salary1', id:'112f21d2x', name: '路由管理',childNode:[]},
                                                      {route: '#', id:'11dd221d2x', name: '选项4',childNode:[
                                                                                    {route: '/attendence1', id:'1fs1221d2x', name: '子选项1'},
                                                                                    {route: '/attendence2', id:'1ef1221d2x', name: '子选项2'},
                                                                                    {route: '/attendence3', id:'1122ffff1d2x', name: '子选项3'}
                                                      ]},
                                                    ]
              }
   
      ]
    };
   },
  mounted() {
      this.$store.commit('add_tabs', {route: '/', name: '首页'});
     // 刷新时以当前路由做为tab加入tabs
      if (this.$route.path !== '/' && this.$route.path.indexOf('userInfo') == -1) {
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
        this.$store.commit('set_active_index', this.$route.path);
      } else {
        this.$store.commit('set_active_index', '/');
        this.$router.push('/');
      }
       this.clientHeight=`${document.documentElement.clientHeight-170}`;
   },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    fnCollapse(){
       if(this.isCollapse){
             this.mianLeftSpan=4;
             this.mianRightSpan=20;
             this.isCollapse=false;
        }else{
            this.mianLeftSpan=1;
            this.mianRightSpan=23;
            this.isCollapse=true; 
        }
    },
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndex;
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      if (this.activeIndex === '/userInfo') {
          path = this.activeIndex + '/' + this.$store.state.userInfo.name;
      }
      this.$router.push({path: path});
    },
    tabRemove (targetName) {
      // 首页不可删除
      if(targetName == '/') {
        return;
      }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit('set_active_index', this.options[this.options.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
   },
  computed: {
        options () {
          return this.$store.state.options;
        },
        activeIndex: {
          get () {
            return this.$store.state.activeIndex;
          },
          set (val) {
            this.$store.commit('set_active_index', val);
          }
        }
  },
  watch: {
        '$route'(to) {
          let flag = false;
          for (let option of this.options ) {
            if (option.name === to.name) {
              flag = true;
              this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
              break
            }
          }
          if (!flag) {
            this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
            this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
          }
        }
      }
    };
</script>

<style lang="less">
    .el-header,
    .el-footer {
      background-color: #0C4988;
      color: #333;
      text-align: center;
      line-height: 60px;
      height: 113px;
    }
    body {
      margin: 0px;
      padding: 0px;
     // overflow:hidden;
    }
    .collapse
    {
    text-align:center; 
    border-bottom:1px solid #FAF4FF;
    height: 30px;
    line-height: 30px;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .rightSpan{
      padding-left:10px; 
      padding-top:2px;
      overflow:hidden
    }
    /*菜单关闭*/
  .el-submenu>.el-submenu__title .el-submenu__icon-arrow{
   // display:none;
    margin-right: -5px;
    margin-top: -5px;
    font-size: 1;
    //padding-top: 0px;
    -webkit-transform: rotateZ(-90deg); 
    -ms-transform: rotate(-90deg);
    transform: rotateZ(0deg); 
  }
/*菜单展开*/
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
   //display:block;
  
  -webkit-transform: rotateZ(0deg); 
	-ms-transform: rotate(0deg);
  transform: rotateZ(0deg); 

}
.el-submenu .el-menu-item {
    height: 30px;
    line-height: 30px;
    padding: 0 45px;
    min-width: 200px;
}

.el-menu-item, .el-submenu__title {
    height: 31px;
    line-height: 31px;
    position: relative;
    -webkit-box-sizing: border-box;
    white-space: nowrap;
    list-style: none;
}
.el-tabs__item {
    padding: 0 20px;
    height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 30px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
}


</style>
