import axios from 'axios'

const state = () => ({
    scrollLock: true,
    sourceArticle: {},
    matchArticleOnView: '',
    matchArticles: [
        {
            onView: true,
            data: {}
        },
        {
            onView: false,
            data: {}
        },
        {
            onView: false,
            data: {}
        }
    ],
    listPar: {
        title: false,
        author: false,
        tags: false,
        body: false
    }
})

const getters = {
    sourceBodyAsArray: (state) => {
        // console.log(state.sourceArticle.body.split('\n'));
        return state.sourceArticle.body.split('\n')
    },
    matchBodyAsArray_1: (state) => {
        return state.matchArticles[0].data.body.split('\n')
    },
    matchBodyAsArray_2: (state) => {
        return state.matchArticles[1].data.body.split('\n')
    },
    matchBodyAsArray_3: (state) => {
        return state.matchArticles[2].data.body.split('\n')
    },
    parametersList (state) {
        return state.list
    }
}

const actions = {
    async get_source ({ commit }) {
        await axios.get('https://mhp.andrefincato.info/api/article/random').then((res) => {
            commit('set_sourceAr', res.data)
        })
    },
    async get_match ({ commit, state }) {
        await axios.post('https://mhp.andrefincato.info/api/ask', {
            article_title: state.sourceArticle.title,
            article_publisher: state.sourceArticle.publisher,
            article_id: state.sourceArticle.id,
            tokens: {
                title: state.listPar.title,
                author: state.listPar.author,
                tags: state.listPar.tags,
                body: state.listPar.body
            }
    }).then((res) => {
        // console.log(res);
            commit('set_matchAr', res.data)
        })
    },
    // updateViewArticle({ commit }, n) {
    //     console.log(n);
    //     commit('set_onview', n)
    // }
}

const mutations = {
    set_sourceAr (state, data) {
        state.sourceArticle = data
    },
    changeLockedScroll (state) {
        state.scrollLock = !state.scrollLock
    },
    set_matchAr (state, data) {
        // console.log(data)
        state.matchArticleOnView = 0;
        state.matchArticles[0].data = data[0];
        state.matchArticles[1].data = data[1];
        state.matchArticles[2].data = data[2];
    },
    toggleThis(state, param) {
        state.listPar[param] = !state.listPar[param]
    },
    setOnview (state, n) {
        state.matchArticleOnView = n
        switch(n) {
            case 0:
                state.matchArticles[0].onView = true;
                state.matchArticles[1].onView = false;
                state.matchArticles[2].onView = false;
                break;
            case 1:
                state.matchArticles[0].onView = false;
                state.matchArticles[1].onView = true;
                state.matchArticles[2].onView = false;
                break;
            case 2:
                state.matchArticles[0].onView = false;
                state.matchArticles[1].onView = false;
                state.matchArticles[2].onView = true;
                break;
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}