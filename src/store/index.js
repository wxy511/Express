/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-05 14:44:59
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import location from './modules/location'
import settings from './modules/settings'
import user from './modules/user'
import rights from './modules/rights'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    location,
    settings,
    user,
    rights
  },
  state,
  getters,
  actions,
  mutations
})

export default store
