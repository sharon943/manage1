import Vue from 'vue'
import Router from 'vue-router'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import index from '@/components/index'
import shopManage from '@/components/shopManage'
import memberManage from '@/components/memberManage'
import marketTool from '@/components/marketTool'
import monthReport from '@/components/monthReport'
import Login from '@/components/login'
import newf from '@/components/new'
import more from '@/components/more'

import Vueresource from "vue-resource"


Vue.use(Router)
Vue.use(Vueresource)
Vue.use(IScrollView, IScroll)
Vue.use(shopManage)
Vue.use(memberManage)
Vue.use(monthReport)
Vue.use(marketTool)
Vue.use(newf)
Vue.use(Login)
Vue.use(more)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:'/shopManage',
      name:'shopManage',
      component:shopManage
    },
    {
      path:'/memberManage',
      name:'memberManage',
      component:memberManage
    },
    {
      path:'/marketTool',
      name:'marketTool',
      component:marketTool
    },
    {
      path:'/monthReport',
      name:'monthReport',
      component:monthReport
    },
    {
      path:'/new',
      name:'new',
      component:newf
    },
    {
      path:'/more',
      name:'more',
      component:more
    },

  ]
})
