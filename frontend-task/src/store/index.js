import Vue from 'vue'
import Vuex from 'vuex'
import clockModule from './modules/clockModule'
import timetableModule from './modules/timetableModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clockModule,
    timetableModule
  }
})
