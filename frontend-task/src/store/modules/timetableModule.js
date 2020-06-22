import timetableApi from '@/api/timetableApi'
import { Journey } from '@/classes/Journey'

const state = {
    journeys: [],
}

const getters = {}

const mutations = {
    setStateJourneys: (state, data) => {
        state.journeys = Journey.asItems(data, Journey)
    }
}

const actions = {
    getJourneys ({ commit }) {
        return timetableApi.getJourneys().then((response) => {
            commit('setStateJourneys', response.data)
        }).catch((err) => {
            throw err
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
