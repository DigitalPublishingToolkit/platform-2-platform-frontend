const state = () => ({
    cellsSourceHeights: {
        publisher : 0,
        title : 0,
        author : 0,
        date : 0,
        tags: 0,
        abstract: 0,
        body: 0,
    },
    cellsMatchHeights: {
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

const mutations = {
    adjustHeight(state, type, key, height) {
        console.log(height);
        // state[type][key] = height;
    }
}

export default {
    state,
    mutations,
    getters
}