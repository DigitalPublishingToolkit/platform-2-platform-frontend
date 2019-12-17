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
    loadingMatches: false,
    findOverlapBool: true,
    indexNum: 1
})

const getters = {
    sourceBodyAsArray: (state) => {
        return state.sourceArticle.body.split('\n')
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
    async get_source_open ({ commit }) {
        await axios.get('https://mhp.andrefincato.info/api/articles/online-open').then((res) => {
            const randomNumber = Math.ceil(Math.random() * res.data.length);
            commit('set_sourceAr', res.data[randomNumber])
        })
    },
    async get_source_openset ({ commit }) {
        await axios.get('https://mhp.andrefincato.info/api/articles/open-set-reader').then((res) => {
            const randomNumber = Math.ceil(Math.random() * res.data.length);
            commit('set_sourceAr', res.data[randomNumber])
        })
    },
    async get_source_amateurcities ({ commit }) {
        await axios.get('https://mhp.andrefincato.info/api/articles/amateur-cities').then((res) => {
            const randomNumber = Math.ceil(Math.random() * res.data.length);
            commit('set_sourceAr', res.data[randomNumber])
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
            // console.log()
            commit('set_matchAr', res.data)
        })
    },
    async confirm_match ({ commit, state }) {
        await axios.post('https://mhp.andrefincato.info/api/send', {
            input_title: state.sourceArticle.title,
            input_publisher: state.sourceArticle.publisher,
            match_title: state.matchArticles[state.matchArticleOnView].data.title,
            match_publisher: state.matchArticles[state.matchArticleOnView].data.publisher,
            score: parseInt(state.matchArticles[state.matchArticleOnView].data.score),
            timestamp: new Date().toISOString()
        }).then((res) => {
            // console.log(res);
            commit('set_ConfirmMatch', res.data)
            commit('setOnview', state.matchArticleOnView);
            commit('check_MatchValue');
        })
    },
    deny_match({ commit, state }) {
        commit('set_denyMatch');
        commit('setOnview', state.matchArticleOnView);
        commit('check_MatchValue');
    }
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
    check_MatchValue(state) {
        state.matchArticles.forEach(function(elem, i){
            if(state.matchArticles[i].isMatch === '') {
                return;
            } else if (i === state.matchArticles.length - 1) {
                let newMatches = state.matchPool.splice(0, 3);
                newMatches[0].onView = true;

                newMatches.forEach(function(elem, i){
                    console.log(elem);
                    state.matchArticles.push(newMatches[i]);
                });
            }
        })
    },
    set_ConfirmMatch (state, data) {
        state.matchArticles[state.matchArticleOnView].isMatch = true;
        state.matchArticles[state.matchArticleOnView].onView = false;

        let confirmedMatch = state.matchArticles.splice(state.matchArticleOnView, 1);

        state.preMatchedArticles.push(confirmedMatch[0]);
        // console.log(state.preMatchedArticles);
        if(state.matchArticleOnView > 0) {
            state.matchArticleOnView -= 1;
        } else {
            state.matchArticleOnView = 0;
        }

        if(state.matchArticles.length <= 0) {
            state.findOverlapBool = true;
            let newMatches = state.matchPool.splice(0, 3);
            newMatches[0].onView = true;

            newMatches.forEach(function(elem, i){
                state.matchArticles.push(newMatches[i]);
            });
        }
    },
    set_sourceAr (state, data) {
        state.sourceArticle = data;
        if(data.matches.length > 0) {
            state.preMatchedArticles = data.matches;
        }
        if(data.author.length <= 0) {
            state.listPar.author = false;
        }
        if(data.tags.length <= 0) {
            state.listPar.tags = false;
        }
    },
    changeLockedScroll (state) {
        state.scrollLock = !state.scrollLock
    },
    set_matchAr (state, data) {
        state.matchArticleOnView = 0;

        data.forEach(function(elem, i){
            elem.body = elem.body.split('\n');
            elem.score[0] = 0;

            if(i < 3) {
                let obj;
                if(i === 0) {
                    obj = {
                        onView : true,
                        isMatch : '',
                        matchIndex: state.indexNum,
                        data : data[i]
                    };
                } else {
                    obj = {
                        onView : false,
                        isMatch : '',
                        matchIndex: state.indexNum,
                        data : data[i]
                    };
                }
                // console.log(data[i]);
                state.matchArticles.push(obj);
                state.indexNum++;
            } else {
                let obj = {
                    onView : false,
                    isMatch : '',
                    matchIndex: state.indexNum,
                    data : data[i]
                };

                state.matchPool.push(obj);
                state.indexNum++;
            }
        });
    },
    set_denyMatch (state, data) {
        state.matchArticles[state.matchArticleOnView].isMatch = false;
        state.matchArticles.splice(state.matchArticleOnView, 1);
        if(state.matchArticleOnView > 0) {
            state.matchArticleOnView -= 1;
        } else {
            state.matchArticleOnView = 0;
        }

        if(state.matchArticles.length <= 0) {
            state.findOverlapBool = true;
            let newMatches = state.matchPool.splice(0, 3);
            newMatches[0].onView = true;

            newMatches.forEach(function(elem, i){
                state.matchArticles.push(newMatches[i]);
            });
        }
    },
    toggleThis(state, param) {
        state.listPar[param] = !state.listPar[param]
    },
    scoreThis(state, score) {
        state.matchArticles[state.matchArticleOnView].data.score[0] = score;
    },
    overLapFalse(state) {
        state.findOverlapBool = false;
    },
    overLapTrue(state) {
        state.findOverlapBool = true;
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