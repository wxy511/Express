import {
  getCName,
  getBranches
} from "@/api/user.js";
export default {
  async getcompanyNameList({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      let info = {
        eletype: 24,
      };
      getCName(info).then(function (response) {
        if (response.error === 0 && response.ele) {
          state.companyNameList = response.ele || [];
          resolve(response)
        } else {
          reject(error)
        }

      }).catch(function (error) {

        reject(error)
      })
    })
  },
  async getpickupLocation({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getBranches().then(function (response) {
        if (response.error === 0 && response.branch) {
          state.locationArr = response.branch || [];
          // state.location.locationArrShow = response.branch || [];
        }
        resolve(response)
      }).catch(function (error) {
        console.log(error)
        reject(error)
      })
    })
  }

}
