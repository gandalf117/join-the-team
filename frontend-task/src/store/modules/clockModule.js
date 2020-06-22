import moment from 'moment'
import { MS_PER_MIN, START_TIME } from '@/config.js'

let interval = null

const state = {
  currentTime: START_TIME,
  minutes: 0,
  isClockRunning: false
}

const getters = {}

const mutations = {
  setStateCurrentTime: (state, min) => {
    state.currentTime = min
  },
  addMinutesToCurrentTime: (state, min) => {
    const time = moment(state.currentTime, 'HH:mm')
    state.currentTime = time.add(min, 'minutes').format('HH:mm')
  },
  setStateMinutes: (state, min) => {
    state.minutes = min
  },
  setStateIsClockRunning: (state, value) => {
    state.isClockRunning = value
  }
}

const actions = {
  startClock ({ commit, state }) {
    interval = setInterval(() => {
      commit('setStateMinutes', state.minutes + 1)
      commit('addMinutesToCurrentTime', 1)
    }, MS_PER_MIN)
    commit('setStateIsClockRunning', true)
  },
  pauseClock ({ commit, state }) {
    clearInterval(interval)
    commit('setStateIsClockRunning', false)
  },
  resetClock ({ commit, state }) {
    clearInterval(interval)
    commit('setStateMinutes', 0)
    commit('setStateCurrentTime', START_TIME)
    commit('setStateIsClockRunning', false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
