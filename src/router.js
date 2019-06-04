import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import info from './views/info.vue'
import infoShow from './views/info_show.vue'


import User from './views/user.vue'
import UserMain from './views/user_main.vue'
import UserInfo from './views/user_info.vue'
import UserQrcode from './views/user_qrcode.vue'
import UserReg from './views/user_reg.vue'



Vue.use(Router)



export default new Router({
  // mode: 'has',
  base: process.env.BASE_URL,
  linkActiveClass:'',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/map',
      name: 'map',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/map.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: info,
    },
    {
      path: 'infoShow',
      name: 'infoShow',
      component: infoShow
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      children: [  //这里就是二级路由的配置
        {
          path: '',
          name: 'UserMain',
          component: UserMain
        },
        {
          path: 'UserInfo',
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: 'UserQrcode',
          name: 'UserQrcode',
          component: UserQrcode
        },
        {
          path: 'UserReg',
          name: 'UserReg',
          component: UserReg
        }


        
      ]
    }
  ]
})
