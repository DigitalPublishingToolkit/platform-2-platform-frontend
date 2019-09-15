const state = () => ({
    largestHeights: {
        publisher : 0,
        title : 0,
        author : 0,
        date : 0,
        tags: 0,
        abstract: 0,
        body: 0,
    }
});

const getters = {

}

const actions = {
    changeHeight ({commit, state}, payload) {
        const biggestAmount = Math.max(state.largestHeights[payload.key], payload.amount);
        // console.log(biggestAmount);
        commit('adjustHeight', {
            typeKey: payload.key,
            amount: biggestAmount
        })
    }
}

const mutations = {
    adjustHeight(state, payload) {
        state.largestHeights[payload.typeKey] = payload.amount;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}