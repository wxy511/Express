import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '/',
    meta: {
      title: ''
    },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        rights: {
          V: '1',
          U: '1',
          VPic: '1',
          UPrint: '1'
        }
      },
    }, ]
  }
]
export const asyncRoutes = [
  //历史记录
  {
    path: '/Record',
    component: Layout,
    redirect: '/receRecord',
    name: 'Record',
    meta: {
      title: 'Record',
      icon: 'visitplace',
    },
    children: [{
      path: 'receRecord',
      component: () => import('@/views/record/receRecord/index.vue'),
      name: 'receRecord',
      meta: {
        title: 'receRecord',
        icon: 'visitor-record',
        rights: {
          V: '1',
          VPic: '1',
          Ex: '1'
        },
        keepAlive: true
      }
    }, {
      path: 'mailRecord',
      component: () => import('@/views/record/mailRecord/index.vue'),
      name: 'mailRecord',
      meta: {
        title: 'mailRecord',
        icon: 'visitor-record',
        rights: {
          V: '1',
          VPic: '1',
          Ex: '1'
        },
        keepAlive: true
      }
    }],
  },
  //系统配置
  {
    path: '/system',
    component: Layout,
    name: 'system',
    redirect: '/system/ExpressType',
    meta: {
      title: 'systemConfig',
      icon: 'visitplace',
    },
    children: [{
        path: 'ExpressType',
        component: () => import('@/views/expressType/index'),
        name: 'ExpressType',
        meta: {
          title: 'ExpressType',
          icon: 'visitplace',
          keepAlive: true
        },

      },
      {
        path: 'LocationConf',
        component: () => import('@/views/locationConf/index'),
        name: 'LocationConf',
        meta: {
          title: 'LocationConf',
          icon: 'visitor-record',
          keepAlive: true
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
