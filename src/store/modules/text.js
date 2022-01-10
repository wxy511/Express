const state = {
  commandTitle: "",
  locationArrShow: [],
}
const getters = {
  commandTitle(state) {

    let info = JSON.parse(localStorage.getItem("commandTitle"))
    if (!info) {
      state.commandTitle = "请选择"
    } else {
      info.label = state.app.language === "zh-CN" ? info.cn : info.en
      state.commandTitle = info.label
    }
    return state.commandTitle
  },
  locationArrShow(state) {
    if (state.locationArrShow.length !== 0) {
      let rece = []
      state.locationArrShow.forEach((item) => {
        if (item.show && item.show === 1) {
          item['label'] = state.app.language === "zh-CN" ? item['cn'] : item['en']
          rece.push(item)
        }
      })
      state.locationArrShow = rece
      return state.locationArrShow
    }
  }
}
const mutations = {
  SET_TITLE: (state, item) => {
    item.label = state.app.language === "zh-CN" ? item.cn : item.en;
    state.commandTitle = item.label;
    let obj = {
      "code": item.code,
      "label": item.label,
      "cn": item.cn,
      "en": item.en
    }
    localStorage.setItem("commandTitle", JSON.stringify(obj))
  }
}
const actions = {
  setTitle({
    commit
  }, item) {
    commit('SET_TITLE', item)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
