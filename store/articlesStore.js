import axios from 'axios'

const state = () => ({
    sourceArticle: {}
})

const actions = {
    async get_source ({ commit }) {
        await axios.get('https://mhp.andrefincato.info/api/article/random').then((res) => {
            commit('set_sourceAr', res.data)
        })
    },
    async get_match ({ commit }) {
        await axios.get('https://mhp.andrefincato.info/api/article/random').then((res) => {
            commit('set')
        })
    }
}

const mutations = {
    set_sourceAr (state, data) {
        state.sourceArticle = data
    }
}

export default {
    state,
    actions,
    mutations
}