const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userid: state => state.user.userid,
  userrights: state => state.user.userrights,
  rights_routes: state => state.rights.routes,
  language: state => state.app.language,
  routerKeepAlive: state => state.rights.routerKeepAlive,
  hiddenProperty: state => state.app.hiddenProperty,
  // 快递公司
  companyNameList(state) {
    state.companyNameList.forEach(item => {
      item['label'] = state.app.language === "zh-CN" ? item['cn'] : item['en']
    })
    return state.companyNameList
  },
  //快递公司可见
  companyNameListenable(state) {
    let rece = []
    state.companyNameList.forEach((item) => {
      if (item.enable && item.enable !== "") {
        item['label'] = state.app.language === "zh-CN" ? item['cn'] : item['en']
        rece.push(item)
      }
    })
    state.companyNameListenable = rece
    return state.companyNameListenable
  },
  //收件类型中英文
  typeList(state) {
    state.typeList = [{
        value: 2049,
        label: "收件",
        cn: "收件",
        en: "Receiving",
      },
      {
        value: 2051,
        label: "寄件",
        cn: "寄件",
        en: "Mail",
      },
    ]
    state.typeList.forEach(item => {
      item['label'] = state.app.language === "zh-CN" ? item['cn'] : item['en']
    })
    return state.typeList
  },
  showName: function (state) {
    return function (companyID) {
      for (let i = 0; i < state.companyNameList.length; i++) {
        const item = state.companyNameList[i];
        if (companyID === item['id']) {
          return state.app.language === 'zh-CN' ? item['cn'] : item['en']
        }
      }
      return companyID
    }
  },
  showLocation: function (state) {
    return function (branchID) {
      // console.log("位置信息", state.locationArr)
      for (let i = 0; i < state.locationArr.length; i++) {
        const item = state.locationArr[i];
        if (branchID === item['code']) {
          return state.app.language === 'zh-CN' ? item['cn'] : item['en']
        }
      }
      return branchID
    }
  },
  // 头部位置列表Show
  locationArrShow(state) {
    if (state.locationArr.length > 0) {
      let rece = [];
      state.locationArr.forEach((item) => {
        if (item.show && item.show === 1) {
          item['label'] = state.app.language === "zh-CN" ? item['cn'] : item['en']
          rece.push(item)
        }
      })
      state.locationArrShow = rece;
      return state.locationArrShow
    }
  },
  // 头部位置标题 for 循环  错
  // commandTitle(state) {
  //   let code = localStorage.getItem("commandTitle");
  //   console.log("code为什么不变化", code)
  //   if (!code) {
  //     state.location.commandTitle = state.app.language === "zh-CN" ? "请选择" : "please Select";
  //   } else {
  //     if (state.locationArrShow.length > 0) {
  //       for (let i = 0; i < state.locationArrShow.length; i++) {
  //         const item = state.locationArrShow[i];
  //         if (code === item['code']) {
  //           console.log("1", item)
  //           return state.location.commandTitle = state.app.language === "zh-CN" ? item['cn'] : item['en'];
  //         }
  //       }
  //     }
  //   }
  //   return state.location.commandTitle
  // },
  //原 forEach
  commandTitle(state) {
    let code = localStorage.getItem("commandTitle");
    if (!code) {
      state.location.commandTitle = state.app.language === "zh-CN" ? "请选择" : "please Select";
    } else {
      // state.location.commandTitle = "1"
      if (state.locationArrShow.length > 0) {
        state.locationArrShow.forEach((item) => {
          if (item['code'] === code) {
            state.location.commandTitle = state.app.language === "zh-CN" ? item['cn'] : item['en'];
          }
        })
      }
    }
    return state.location.commandTitle
  },

}
export default getters
