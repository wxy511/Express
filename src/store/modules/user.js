import {
  py_login,
  py_getuser,
  py_logout 
} from '@/api/user'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    userrights: '',
    pwdaes: '',
    visitcode: [],
    userid: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERRIGHTS: (state, userrights) => {
    state.userrights = userrights
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  }
}

const actions = {
  login({
    commit
  }, userInfo) {
    const {
      username,
      pwdaes,
    } = userInfo
    return new Promise((resolve, reject) => {
      py_login({
        username: username.trim(),
        pwdaes: pwdaes,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      py_getuser({}).then(response => {
        if (response && response.error === 0) {
          commit('SET_USERID', response.userid || 0)
          commit('SET_USERRIGHTS', response.rights || '111111111')
          commit('SET_NAME', response.username || '')
        }
        resolve(response || {})
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  async logout({
    commit
  }) {
    await py_logout({})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
