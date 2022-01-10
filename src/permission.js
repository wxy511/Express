/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-22 16:50:07
 */
import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// import getPageTitle from '@/utils/get-page-title'
import i18n from './languages'
// var Base64 = require('js-base64').Base64
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = i18n.t('Title') // getPageTitle(to.meta.title)
  // determine whether the user has logged in
  if (!store.state.user.userid && whiteList.indexOf(to.path) === -1){
    const res = await store.dispatch('user/getInfo')
    if(!res || res.error !== 0){
      next(`/login?redirect=${to.path}`)
      NProgress.done()   
      return   
    }
    else{
      const routertest = await store.dispatch('rights/generateRoutes', res.rights)
      router.addRoutes(routertest)   
      if (from.path === '/login') {
        next({
          ...to,
          name: 'Dashboard'
        })
      } else {
        next({
          ...to,
          replace: true
        })
      }
      return   
    }
  }

  next()
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
