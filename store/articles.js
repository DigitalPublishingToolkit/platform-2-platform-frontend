import axios from 'axios'

export const actions = {
    async getIP ({ commit }) {
        const ip = await axios.get('http://icanhazip.com')
        commit('SET_IP', ip)
    }
}

export const mutations = {
    SET_IP (state, data) {
        state.articles = data
    }
}
