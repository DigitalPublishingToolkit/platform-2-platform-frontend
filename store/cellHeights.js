const state = () => ({
    cellsBiggestHeights: {
        publisher : 0,
        title : 0,
        author : 0,
        date : 0,
        tags: 0,
        abstract: 0,
        body: 0,
    },
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
    adjustHeight(state, payload) {
        // console.log(payload.key);
        if(payload.arType === "source"){
            // console.log(payload.heightEl);
            state.cellsSourceHeights[payload.key] = payload.heightEl;
        } else if(payload.arType === "match") {
            // console.log(payload.heightEl);
            state.cellsMatchHeights[payload.key] = payload.heightEl;
        }

        state.cellsBiggestHeights.title = Math.max(state.cellsSourceHeights.title, state.cellsMatchHeights.title);
        // console.log(state.cellsBiggestHeights.title);

    }
}

export default {
    state,
    mutations,
    getters
}