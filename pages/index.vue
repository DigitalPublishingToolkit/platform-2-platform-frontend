<template>
    <div class="main_articles">
        <div id="left-column" class="main_articles_column main_articles_column--left" v-on:scroll="handleScroll">
            <div class="article--placeholder">
                <p>Source Article</p><p class="lockScroll" v-bind:class="lockedScroll ? 'active' : 'inactive'" @click="lockedScroll = !lockedScroll">Sync scroll <span></span></p>
            </div>
            <articleComp articleType="source" class="article--source"></articleComp>
        </div>
        <div id="right-column" class="main_articles_column main_articles_column--right" v-on:scroll="handleScroll">
            <div class="article--placeholder">
                <p>Matched Article</p>
            </div>
            <articleComp articleType="match" class="article--match--1"></articleComp>
            <!--            <article class="article--match--1"></article>-->
            <!--            <article class="article--match--1"></article>-->
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
                matchedArticles: [],
                lockedScroll: true
            }
        },
        components: {
            articleComp,
            parameters
        },
        computed: {

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
                // console.log(e.target.classList);
            }
        }
        // asyncData () {
        //     return axios.get("https://mhp.andrefincato.info/api/article/random")
        //         .then((res) => {
        //             this.sourceArticles = res.data;
        //         })
        // }
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