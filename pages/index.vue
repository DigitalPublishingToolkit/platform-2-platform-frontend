<template>
    <div class="main_articles">
        <div id="left-column" class="main_articles_column main_articles_column--left" v-on:scroll="handleScroll">
            <div class="article--placeholder">
                <p>Source Article</p><p class="lockScroll" v-bind:class="lockedScroll ? 'active' : 'inactive'" @click="lockedScroll = !lockedScroll">Sync scroll <span></span></p>
            </div>
            <articleComp articleType="source" class="article--source" :articleTitle="sourceArticles.title"
                         :articleUrl="sourceArticles.url"
                         :articlePublisher="sourceArticles.publisher"
                         :articleAuthor="sourceArticles.author"
                         :articleTimestamp="sourceArticles.mod"
                         :articleTags="sourceArticles.tags"
                         :articleAbstract="sourceArticles.abstract"
                         :articleBody="sourceArticles.body"></articleComp>
        </div>
        <div id="right-column" class="main_articles_column main_articles_column--right" v-on:scroll="handleScroll">
            <div class="article--placeholder">
                <p>Matched Article</p>
            </div>
            <articleComp articleType="match" class="article--match--1":articleTitle="matchArticles.title"
                         :articleUrl="matchArticles.url"
                         :articlePublisher="matchArticles.publisher"
                         :articleAuthor="matchArticles.author"
                         :articleTimestamp="matchArticles.mod"
                         :articleTags="matchArticles.tags"
                         :articleAbstract="matchArticles.abstract"
                         :articleBody="matchArticles.body"></articleComp>
<!--            <articleComp class="article&#45;&#45;match&#45;&#45;2"></articleComp>-->
<!--            <articleComp class="article&#45;&#45;match&#45;&#45;2"></articleComp>-->
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import articleComp from "~/components/article-comp"
    import parameters from "~/components/parameters"

    export default {
        name: "index",
        layout: "home",
        data() {
            return {
                sourceArticles: {},
                matchArticles: {},
                lockedScroll: true,
                checkedParameters: []
            }
        },
        components: {
            articleComp,
            parameters
        },
        methods: {
            handleScroll: function(e) {
                if(this.lockedScroll) {
                    switch(e.currentTarget.classList[1]) {
                        case("main_articles_column--left"):
                            document.getElementById("right-column").scrollTop = e.target.scrollTop;
                            break;
                        case("main_articles_column--right"):
                            document.getElementById("left-column").scrollTop = e.target.scrollTop;
                            break;
                    }
                }
            }
        },
        async asyncData ({query, error}) {
            let sourceData = await axios.get("https://mhp.andrefincato.info/api/article/random");
            let matchData = await axios.get("https://mhp.andrefincato.info/api/article/random");
            return {
                sourceArticles: sourceData.data[0],
                matchArticles: matchData.data[0],
            };
        },
        // async fetch ({ store, params }) {
        //     await store.dispatch('articles/get_source');
        // },
        // computed: {
        //     sourceArticles() {
        //         return this.$store.state.sourceArticle
        //     }
        // },
        //
        // asyncData () {
        //     return axios.get("https://mhp.andrefincato.info/api/article/random")
        //         .then((res) => {
        //             console.log(res.data[0]);
        //             return {sourceArticles: res.data[0]};
        //         });
        //     return axios.get("https://mhp.andrefincato.info/api/article/random")
        //         .then((res) => {
        //             console.log(res.data[0]);
        //             return {matchArticles: res.data[0]};
        //         })
        // },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .main_articles {
        position: absolute;
        /*overflow: auto;*/
        top: $parameter-size;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 1);

        &_column {
            position: absolute;
            width: 50%;
            top: 0;
            bottom: 0;
            overflow: auto;
            display: block;
            &--left {
                left: 0;
            }
            &--right {
                right: 0;
            }
        }

        &::after {
            content: '';
            border-left: 1px solid rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
        }
    }

    .article--placeholder {
        font-size: $font-size-s;
        color: rgba(0, 0, 0, 0.6);
        padding: $spacing/2;
        position: fixed;
        width: 50%;
        background-color: rgba(255, 255, 255, 1);
        & p {
            display: inline-block;
            float: left;
        }
        & .lockScroll {
            float: right;
            &:hover {
                text-decoration-line: underline;
                text-decoration-style: dotted;
                cursor: pointer;
            }
            &.active {
                color: green;
                & span {
                    background-color: green;
                }
            }
            &.inactive {
                color: rgba(0, 0, 0, 0.6);
                & span {
                    background-color: rgba(0, 0, 0, 0.6);
                }
            }
            & span {
                width: 6px;
                height: 6px;
                border-radius: 3px;
                display:inline-block;
                margin-left: 1px;
                margin-bottom: 1px;
            }
        }
    }
</style>