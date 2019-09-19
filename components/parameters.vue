<template>
    <div class="parameters">

        <div class="parameters_column parameters_column--left">
            <div class="parameters_column--field field-checkboxes">
                <p class="placeholder">Select criteria for match</p>

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
            </div>
            <div class="parameters_column--field field-getmatch">
                <p class="placeholder">Get new matches</p>
                <div v-if="(paramList.title || paramList.author || paramList.tags || paramList.body) && (!storeMatchArticles()[0].data.hasOwnProperty('title'))" class="parameters_button parameters_form--submit" @click="getMatchArticles()">Get Matches</div>
                <div v-else-if="!storeMatchArticles()[0].data.hasOwnProperty('title')" class="parameters_button parameters_form--submit--noparams">Get Matches</div>
                <div v-else-if="(paramList.title || paramList.author || paramList.tags || paramList.body) && (storeMatchArticles()[0].data.hasOwnProperty('title'))" class="parameters_button parameters_form--submit" @click="getMatchArticles()">Get new pool ↺</div>
                <div v-else class="parameters_button parameters_form--submit--noparams">Get new pool ↺</div>
            </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="parameters_column parameters_column--right">
            <div class="parameters_column--field field-score">
                <p class="placeholder">Score rating</p>
                <div class="score_rating">
                    <span v-if="Number.isInteger(matchArticleOnView)">{{Number.parseFloat(storeMatchArticles()[matchArticleOnView].data.score*100).toFixed(2)}}%</span>
                    <span class="score_rating--noarticle" v-else>-.--</span>
                </div>
            </div>

            <div class="parameters_column--field field-scrollsync">
                <p class="placeholder">Synced scrolling</p>
                <div class="parameters_button active" v-if="scrollLock" @click="lockedScroll">Toggle synced scroll off</div>
                <div class="parameters_button inactive" v-else @click="lockedScroll">Toggle synced scroll on</div>
            </div>

            <div class="parameters_column--field field-matchmaking">
                <p class="placeholder">Match or no match</p>
<!--                    !storeMatchArticles()[matchArticleOnView].isMatch-->
                    <div class="parameters_button parameters_matchmaking--yes" @click="setMatchArticle()">Yes, it is</div>
                    <span class="divider-slash">/</span>
                    <div class="parameters_button parameters_matchmaking--no" @click="unSetMatchArticle()">No, it's not</div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        name: "parameters",
        computed: {
            scrollLock() {
                return this.$store.state.articlesStore.scrollLock
            },
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
            setMatchArticle() {
                return this.$store.dispatch('articlesStore/confirm_match')
            },
            unSetMatchArticle() {
                return this.$store.dispatch('articlesStore/deny_match')
            },
            ...mapMutations({
                toggle: 'articlesStore/toggleThis',
                lockedScroll: 'articlesStore/changeLockedScroll'
            })
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .parameters {
        font-family: $font-stack-sans;
        font-size: $font-size;
        line-height: $line-height;
        font-weight: $regular;
        width: 100%;
        height: $parameter-size;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: $white;
        border-top: 1px solid $charcoal;
        z-index: 99;

        & .parameters_column {
            width: 50%;
            display: flex;
            align-items: stretch;
            background-color: rgba(0, 0, 0, 0.05);

            &--left {
                box-sizing: content-box;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
                float: left;

                & .parameters_column--field {
                    &.field-checkboxes {
                        flex-grow: 2;
                        border-right: 1px solid rgba(0, 0, 0, 0.1);
                    }
                    &.field-getmatch {
                        flex-grow: 1;
                    }
                }
            }

            &--right {
                float: right;
                margin-left: -1px;

                & .parameters_column--field {
                    flex-grow: 1;
                    border-right: 1px solid rgba(0, 0, 0, 0.1);

                    &:last-of-type {
                        border-right: none;
                    }

                    & .score_rating {
                        font-weight: 300;

                        & span {
                            font-size: $font-size-l;
                            line-height: 46px;
                            margin: 0 0 0 $spacing*1.5;
                            background-color: rgba(0,0,0,0.1);
                            padding: 2px;
                            border-radius: 2px;
                        }
                    }
                }
            }
        }

        & .placeholder {
            font-size: $font-size-s;
            color: rgba(0, 0, 0, 0.4);
            padding: $spacing $spacing/2 $spacing/2 $spacing/2;
        }
        &_form {
            display: inline-block;
            padding: 0 0 $spacing $spacing*1.5;
            &--option {
                font-weight: 300;
                float: left;
                display: inline-block;
                color: $black;
                margin: 0 $spacing*1.5 0 0;
                padding: 0;
                /*background-color: rgba(255, 255, 255, 0.2);*/
                border-radius: 0;
                font-size: 20px;
                line-height: 46px;
                border-bottom: 2px solid rgba(49, 49, 49, 1);
                &.active {
                    border-bottom: 2px solid $red;
                    color: $red;
                    /*box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.4);*/
                }
                &:hover {
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.1);
                    & * {
                        cursor: pointer;
                    }
                }
                & label {
                    margin-right: 2px;
                }
            }
        }
    }

    .parameters_button {
        color: $black;
        font-family: $font-stack-sans;
        font-size: 20px;
        line-height: 46px;
        font-weight: 300;
        background-color: transparent;
        outline: none;
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        display: inline-block;
        margin: 0 0 $spacing $spacing*1.5;
        border-bottom: 2px solid rgba(49, 49, 49, 1);
        &:hover {
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.1);
        }
        &.parameters_matchmaking--no {
            margin-left: 0;
        }
    }

    .parameters_form--submit--noparams {
        color: rgba(0, 0, 0, 0.2);
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        &:hover {
            background-color: transparent;
            cursor: default;
        }
    }

    .show {
        top: 0;
    }

    .hide {
        top: -88px;
    }

    .parameters_column--field {
        flex: 1 0;
    }

    .divider-slash {
        width: 9px;
        margin: 0 18px;
    }

    .active {
        color: $green;
        border-bottom: 2px solid $green;
    }

    .score_rating--noarticle {
        color: rgba(0, 0, 0, 0.2);
    }

    .parameters_matchmaking--matchconfirm {
        font-family: $font-stack-sans;
        font-size: 20px;
        line-height: 46px;
        font-weight: 300;
        background-color: transparent;
        outline: none;
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        display: inline-block;
        margin: 0 0 $spacing $spacing*1.5;
        border-bottom: 2px solid rgba(49, 49, 49, 1);

        color: rgba(0, 0, 0, 0.2);
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    }

</style>