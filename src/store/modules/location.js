const state = {
  commandTitle: "",
}
const getters = {

}
const mutations = {
  SET_TITLE: (state, value) => {
    state.commandTitle = value;
    localStorage.setItem("commandTitle", value)
  }
}
const actions = {
  setTitle({
    commit
  }, value) {
    commit('SET_TITLE', value)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
