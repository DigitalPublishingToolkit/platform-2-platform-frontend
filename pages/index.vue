<template>
    <div class="main_articles">
        <div id="left-column" class="main_articles_column main_articles_column--left" v-on:scroll="handleScroll">
            <div class="article--placeholder">
                <p>Source Article</p><p class="lockScroll" v-bind:class="lockedScroll ? 'active' : 'inactive'" @click="lockedScroll = !lockedScroll">Sync scroll <span></span></p>
            </div>
            <articleComp articleType="source" articleInd="0" :articleData="storeSourceArticle" class="article--source" :scrollLock="lockedScroll"></articleComp>
        </div>
        <div id="right-column" class="main_articles_column main_articles_column--right" v-on:scroll="handleScroll" v-bind:class="{noArticle : (storeMatchArticles().length === 0)}">
            <div v-if="'title' in storeMatchArticles()[0].data" class="article--placeholder match-tabs">
                <div v-for="(match, index) in storeMatchArticles()" class="tab" :class="{active : (matchArticleOnView === index)}" v-bind:data="index" @click="updateView(index)">
                    <p>Matched Article {{index + 1}}</p>
                </div>
            </div>
            <articleComp v-if="'title' in storeMatchArticles()[0].data" v-for="(match, index) in storeMatchArticles()" articleType="match" :key="index" :articleInd="index" :articleData="match.data" class="article--match article--match--1" v-bind:class="{active : match.onView}"></articleComp>
            <div class="noArticle_placeholder" v-if="!('title' in storeMatchArticles()[0].data)">No matched articles…</div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import articleComp from "~/components/article-comp"
    import parameters from "~/components/parameters"

    export default {
        name: "index",
        layout: "home",
        async fetch({store}) {
            await store.dispatch('articlesStore/get_source')
        },
        computed: {
            storeSourceArticle() {
                return this.$store.state.articlesStore.sourceArticle
            },
            matchArticleOnView() {
                return this.$store.state.articlesStore.matchArticleOnView
            },
        },
        data() {
            return {
                lockedScroll: true,
                checkedParameters: [],
            }
        },
        components: {
            articleComp,
            parameters
        },
        methods: {
            ...mapMutations({
                updateView: 'articlesStore/setOnview'
            }),
            // updateViewDeep(n) {
            //
            // },
            // updateViewArticle() {
            //     // const targetId = event.currentTarget.data
            //     return this.$store.dispatch('articlesStore/updateViewArticle')
            // },
            getMatchArticles() {
                return this.$store.dispatch('articlesStore/get_match')
            },
            storeMatchArticles() {
                return this.$store.state.articlesStore.matchArticles
            },
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
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .divider_bar {
        position: absolute;
        height: 3px;
        background-color: rgba(49, 49, 49, 1);
    }

    .main_articles {
        position: absolute;
        /*overflow: auto;*/
        top: 3px;
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
                transition: background-color 0.2s ease;
                &.noArticle {
                    background-color: rgba(0, 0, 0, 0.1);
                }
            }
        }

        &::after {
            content: '';
            border-left: 1px solid $charcoal;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
        }
    }

    .article--match {
        display: none;
        &.active {
            display: block;
        }
    }

    .article--placeholder {
        font-size: $font-size-s;
        color: rgba(0, 0, 0, 0.6);
        padding: $spacing/2;
        position: fixed;
        width: 50%;
        background-color: rgba(255, 255, 255, 1);
        transition: background-color 0.2s ease;
        &.match-tabs {
            display: flex;
            flex-direction: row;
            align-content: stretch;
            align-items: stretch;
            padding: 0;
            & .tab {
                padding: $spacing/2;
                flex-grow: 1;
                background-color: $charcoal;
                color: $white;
                border-right: 1px solid rgba(255, 255, 255, 0.2);
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                &:last-of-type {
                    border-right: none;
                }
                &.active {
                    background-color: $white;
                    border-bottom: none;
                    color: $black;
                    cursor: default !important;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
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

    .noArticle .article--placeholder {
        background-color: transparent;
    }

    .noArticle_placeholder {
        position: absolute;
        width: 50%;
        height: 18px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        text-align: center;
        color: rgba(0,0,0,0.2);
    }
</style>