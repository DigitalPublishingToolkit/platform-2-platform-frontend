<template>
    <div class="parameters">
        <div class="top_divider"></div>

        <div class="parameters_column parameters_column--left">
            <p class="placeholder">Match Parameters</p>

            <form action="" class="parameters_form">
                <div class="parameters_form--option" v-bind:class="{active : paramList.title}">
                    <label for="title">Title</label>
                    <input type="checkbox" id="title" value="title" :checked="paramList.title" @click="toggle('title')">
                </div>

                <div class="parameters_form--option" v-bind:class="{active : paramList.author}">
                    <label for="author">Author</label>
                    <input type="checkbox" id="author" value="author" :checked="paramList.author" @click="toggle('author')">
                </div>

                <div class="parameters_form--option" v-bind:class="{active : paramList.tags}">
                    <label for="tags">Tags</label>
                    <input type="checkbox" id="tags" value="tags" :checked="paramList.tags" @click="toggle('tags')">
                </div>

                <div class="parameters_form--option" v-bind:class="{active : paramList.body}">
                    <label for="body">Body text</label>
                    <input type="checkbox" id="body" value="body" :checked="paramList.body" @click="toggle('body')">
                </div>
            </form>
            <div class="parameters_form--submit" @click="getMatchArticles()">Get Matches</div>
        </div>
        <div class="parameters_column parameters_column--right">
            <p class="placeholder">Score rating</p>

            <div class="score_rating">
                <span v-if="Number.isInteger(matchArticleOnView)">{{Number.parseFloat(storeMatchArticles()[matchArticleOnView].data.score*100).toFixed(2)}}%</span>
                <span v-else>0</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        name: "parameters",
        computed: {
            paramList() {
                return this.$store.state.articlesStore.listPar
            },
            matchArticleOnView() {
                return this.$store.state.articlesStore.matchArticleOnView
            },
        },
        data() {
            return {
                showParameters: true,
            }
        },
        methods: {
            getMatchArticles() {
                return this.$store.dispatch('articlesStore/get_match')
            },
            storeMatchArticles() {
                return this.$store.state.articlesStore.matchArticles
            },
            ...mapMutations({
                toggle: 'articlesStore/toggleThis'
            })
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .top_divider {
        height: 9px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .parameters {
        font-family: $font-stack;
        font-size: $font-size;
        line-height: $line-height;
        font-weight: $regular;
        /*text-transform: uppercase;*/
        /*letter-spacing: 0.1px;*/

        width: 100%;
        height: $parameter-size;

        position: fixed;

        top: 0;
        left: 0;

        color: rgba(0, 0, 0, 1);
        background-color: $fullRed;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        transition: top 0.33s ease;
        z-index: 99;

        & .parameters_column {
            width: 50%;
            display: inline-block;
            &--left {
                box-sizing: content-box;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
                float: left;
            }
            &--right {
                float: right;
                margin-left: -1px;
                & .score_rating {
                    height: 38px;
                    margin: 9px;
                    /* display: block; */
                    /* position: absolute; */
                    overflow: hidden;
                    color: rgba(255, 255, 255, 1);
                    font-weight: 300;
                    & span {
                        font-size: 46.5px;
                        /* line-height: 1em; */
                        /* vertical-align: text-top; */
                        margin-top: -11px;
                        padding-left: 18px;
                        display: block;
                    }
                }
            }
        }

        & .placeholder {
            font-size: $font-size-s;
            color: rgba(0, 0, 0, 0.4);
            padding: $spacing/2;
        }
        &_form {
            display: inline-block;
            padding: 0 $spacing $spacing $spacing;
            &--option {
                float: left;
                display: inline-block;
                color: white;
                margin: $spacing/2 $spacing/2 $spacing/2 $spacing/2;
                padding: $spacing/2;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                /*border: 1px solid rgba(255, 255, 255, 1);*/
                &.active {
                    background-color: $fullRed;
                    box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.4);
                }
                &:hover {
                    cursor: pointer;
                    background-color: $fullRed;
                    box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.4);
                    & * {
                        cursor: pointer;
                    }
                }
                & label {
                    margin-right: 2px;
                }
            }
            &--submit {
                font-family: $font-stack;
                font-size: $font-size;
                line-height: $line-height;
                font-weight: 500;

                background-color: rgba(255, 255, 255, 1);
                outline: none;
                border-top: none;
                border-bottom: none;
                border-left: none;
                border-right: none;

                display: inline-block;

                padding: $spacing/2;
                margin: $spacing/2 $spacing*1.5;

                border-radius: 4px;

                float: right;

                &:hover {
                    cursor: pointer;
                    color: rgba(255, 127, 127, 1);
                }
            }
        }
    }

    .show {
        top: 0;
    }

    .hide {
        top: -88px;
    }
</style>