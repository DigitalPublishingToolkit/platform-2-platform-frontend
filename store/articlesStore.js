import axios from 'axios'

const state = () => ({
    scrollLock: true,
    sourceArticle: {},
    matchArticleOnView: '',
    matchArticles: [],
    matchPool: [],
    preMatchedArticles: [],
    listPar: {
        title: true,
        author: true,
        tags: true,
        body: true
    },
    loadingMatches: false
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
    parametersList: (state) => {
        return state.list
    },
    vocabulary: (state) => {
        return state.matchArticles[state.matchArticleOnView].data.vocabulary
    }
}

const actions = {
    async get_source ({ commit }) {
        await axios.get('https://mhp.andrefincato.info/api/article/random').then((res) => {
            // console.log(res.data);
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
    async confirm_match ({ commit, state }) {
        await axios.post('https://mhp.andrefincato.info/api/send', {
            inputs_title: state.sourceArticle.title,
            inputs_publisher: state.sourceArticle.publisher,
            match_title: state.matchArticles[state.matchArticleOnView].data.title,
            match_publisher: state.matchArticles[state.matchArticleOnView].data.publisher,
            score: state.matchArticles[state.matchArticleOnView].data.score,
            timestamp: new Date().toISOString()
        }).then((res) => {
            console.log(res);
            commit('set_ConfirmMatch', res.data)
        })
    },
    deny_match({ commit, state }) {
        commit('set_denyMatch');
        commit('setOnview', state.matchArticleOnView);
    }
    // updateViewArticle({ commit }, n) {
    //     console.log(n);
    //     commit('set_onview', n)
    // }
}

const mutations = {
    set_loadMatch(state) {
        // console.log(state.loadingMatches);
        state.loadingMatches = true;
    },
    unSet_loadMatch(state) {
        // console.log(state.loadingMatches);
        state.loadingMatches = false;
    },
    set_ConfirmMatch (state, data) {
        // alert("The articles " + state.sourceArticle.title.toUpperCase() + " and " + state.matchArticles[state.matchArticleOnView].data.title.toUpperCase() + " are a good match.");
        state.matchArticles[state.matchArticleOnView].isMatch = true
    },
    set_sourceAr (state, data) {
        state.sourceArticle = data;
        if(data.matches.length > 0) {
            state.preMatchedArticles = data.matches;
        }
    },
    changeLockedScroll (state) {
        state.scrollLock = !state.scrollLock
    },
    set_matchAr (state, data) {
        // console.log(data)
        state.matchArticleOnView = 0;

        data.forEach(function(elem, i){
            if(i < 3) {
                let obj;
                if(i === 0) {
                    obj = {
                        onView : true,
                        isMatch : '',
                        data : data[i]
                    };
                    // console.log(data[i]);
                } else {
                    obj = {
                        onView : false,
                        isMatch : '',
                        data : data[i]
                    };
                }
                state.matchArticles.push(obj);
            } else {
                state.matchPool.push(data);
            }
        });
        // state.matchArticles[0].data = data[0];
        // state.matchArticles[1].data = data[1];
        // state.matchArticles[2].data = data[2];
    },
    set_denyMatch (state, data) {
        // alert("The articles " + state.sourceArticle.title.toUpperCase() + "and " + state.matchArticles[state.matchArticleOnView].data.title.toUpperCase() + " are not a good match.");
        state.matchArticles[state.matchArticleOnView].isMatch = false;
        state.matchArticles.splice(state.matchArticleOnView, 1);
        if(state.matchArticleOnView > 0) {
            state.matchArticleOnView -= 1;
        } else {
            state.matchArticleOnView = 0;
        }
        // if(state.matchArticles[0].isMatch === false && state.matchArticles[1].isMatch === false && state.matchArticles[2].isMatch === false) {
        //     console.log("NEW MATCHES NEEDED!");
        // }
    },
    toggleThis(state, param) {
        state.listPar[param] = !state.listPar[param]
    },
    setOnview (state, n) {
        state.matchArticleOnView = n;
        state.matchArticles.forEach(function(elem, index){
            if(index === n) {
                state.matchArticles[index].onView = true;
            } else {
                state.matchArticles[index].onView = false;
            }
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}