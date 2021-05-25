import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/index.js'

import Home from '@/components/home/home'
import Login from '@/components/home/login'
import AppNavw from "../components/common/AppNav"
import Main from '@/components/home/main'
import UserList from '@/components/UserPermission/usermanage'
import Rolelist from '@/components/UserPermission/rolelist'
import Orglist from '@/components/UserPermission/orglist'
import Permissionlist from '@/components/UserPermission/permissionlist'
import SystemConfig from '@/components/common/SystemConfig'
import Notify from '@/components/common/Notify'
import ErrorPage from '@/components/common/Error'
import LogList from '@/components/common/LogList'
import SystemIco from '@/components/tools/systemico'

import Datagroup from '@/components/datacollect/datagroup'
import Workmanship from '@/components/workmanship/workmanship'
import WorkOrder from '@/components/workmanship/workorder'
import ProcedureQuality from '@/components/workmanship/procedureQuality'

import Bom from '@/components/materialmanage/bommanage'
import MaterialCategory from '@/components/materialmanage/materialcategory'
import MaterialDefine from '@/components/materialmanage/materialdefine'

import EqpBase from '@/components/eqpmanage/eqpbase'
import EqpGroup from '@/components/eqpmanage/eqpgroup'
import EqpType from '@/components/eqpmanage/eqptype'
import EqpParam from '@/components/eqpmanage/eqparam'
import MaterChoose from '@/components/materialmanage/choosemater'
import ProcedureFile from '@/components/workmanship/procedureFile'
import ReportDesigner from '@/components/reports/manage/designer'
import ReportTable from '@/components/reports/instance/report'
import ChartDesigner from '@/components/reports/manage/chartDesigner'

import TestDrag from '@/components/ZTEST/jsplumb'

import TestFun from '@/components/test/test.vue'
import CommonDemoPage from '@/components/test/CommonDemoPage.vue'
import AddFunction from '@/components/common/AddFunction'
import Table from "../components/tables/Table"
import UserPersonMap from "../components/userpermission/UserPersonMap"
import treeMenus from "../components/tools/treeMenus"

Vue.use(Router)

const router= new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
      // name: 'home',
      // component: Main
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/test',
      name:'TestDrag',
      component:TestDrag
    },
    // {
    //   path: '*',
    //   redirect: '/login',
    // },
    {
      path:'/error',
      name:'Error',
      component:ErrorPage
    },
    {
      path:'/notify',
      name:'Notify',
      component:Notify
    },
    {
      path:'/workflow/mater/choose/:procecode',
      name:'MaterChoose',
      component:MaterChoose
    },
    {
      path:'/workflow/quality/choose/:procecode',
      name:'ProcedureQuality',
      component:ProcedureQuality
    },
    {
      path:'/workflow/files/choose/:procecode',
      name:'ProcedureFile',
      component:ProcedureFile
    },
    {
      path:'/main',
      name:'main',
      component:Main,
      children:[
        {
          path:'/home',
          name:'Home',
          component:Home,
          meta:{
            keepAlive:false
          }
        },
        {
          path:'/table',
          name:'Table',
          component:Table
        },
        {
          path:'/moduleTree',
          name:'treeMenus',
          component:treeMenus
        },
        {
          path:'/userPersonMap',
          name:'UserPersonMap',
          component:UserPersonMap
        },
        {
          path:'/userlist',
          name:'用户列表',
          component:UserList
        },
        {
          path: '/orglist',
          name: '用户管理',
          component: Orglist,
        },
        {
          path:'/roleslist',
          name:'角色管理',
          component:Rolelist,
          meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path:'/permissionlist',
          name:'权限管理',
          component:Permissionlist
        },
        {
          path:'/systemconfig',
          name:'系统配置',
          component:SystemConfig
        },
        {
          path:'/systemico',
          name:'系统图标库',
          component:SystemIco
        },
        {
          path:'/log',
          name:'日志查询',
          component:LogList
        },
        {
          path:'/datacollection',
          name:'数据收集组',
          component:Datagroup
        },
        {
          path:'/materials-category',
          name:'物料类别',
          component:MaterialCategory
        },
        {
          path:'/materials-define',
          name:'物料定义',
          component:MaterialDefine
        },
        {
          path:'/bom-manage',
          name:'BOM管理',
          component:Bom
        },
        {
          path:'/equipment-base',
          name:'设备信息',
          component:EqpBase
        },
        {
          path:'/equipment-group',
          name:'设备分组',
          component:EqpGroup
        },
        {
          path:'/equipment-type',
          name:'设备类别',
          component:EqpType
        },
        {
          path:'/equipment/param',
          name:'参数管理',
          component:EqpParam
        },
        {
          path:'/workmanship',
          name:'工艺流程',
          component:Workmanship
        },
        {
          path:'/workorder',
          name:'工单管理',
          component:WorkOrder
        },
        {
          path:'/report/designer',
          name:'报表设计',
          component:ReportDesigner
        },
        {
          path:'/report/table/:id',
          name:'报表中心',
          component:ReportTable,
          meta:{
            keepAlive:true
          }
        },
        {
          path:'/report/chart',
          name:'图表设计',
          component:ChartDesigner
        },
        {
          path:'/test/function',
          name:'测试测试',
          component:TestFun
        },
        {
          path:'/common/demo',
          name:'通用页面',
          component:CommonDemoPage
        },
        {
          path:'/add/function',
          name:'功能管理',
          component:AddFunction
        },
        {
          path:'/add/testfun',
          name:'通用页面2',
          component:TestFun
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (Store.state.token) {  // 通过vuex state获取当前的token是否存在
//           next();
//       }
//       else {
//           next({
//               path: '/login',
//               query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })



export default router;
