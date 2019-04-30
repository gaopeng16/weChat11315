import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import mutations from "./mutations"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => wx.getStorageSync(key),
                setItem: (key, value) => wx.setStorageSync(key, value),
                removeItem: key => { }
            },
            reducer(val) {
                return {
                    // 只储存state中的sign，vipLevel
                    vipLevel: val.vipLevel,
                    sign: val.sign,
                    token: val.token
                }
            }
        })
    ]
})