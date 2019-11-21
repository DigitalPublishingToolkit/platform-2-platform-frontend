<template>
    <div class="parameters">
        <div class="popup-wrapper" v-if="isMatch === true" @click="isMatch = null">
            <div class="popup">
                Article is saved as a match.
            </div>
        </div>
        <div class="popup-wrapper" v-if="isMatch === false" @click="isMatch = null">
            <div class="popup">
                Article is removed as a match.
            </div>
        </div>
        <div class="parameters_column parameters_column--left">
            <div class="parameters_column--field field-checkboxes">
                <p class="placeholder">Select criteria for match</p>

                <form action="" class="parameters_form">
                    <div class="parameters_form--option" v-bind:class="{active : paramList.title}">
                        <label for="title">Title</label>
                        <input type="checkbox" id="title" value="title" :checked="paramList.title" @click="toggle('title')" disabled>
                    </div>

                    <div class="parameters_form--option" v-bind:class="{active : paramList.author, disabled : (storeSourceArticle.author.length <= 0)}">
                        <label for="author">Author</label>
                        <input v-if="storeSourceArticle.author.length <= 0" type="checkbox" id="author" value="author" :checked="paramList.author" disabled="true">
                        <input v-else type="checkbox" id="author" value="author" :checked="paramList.author" @click="toggle('author')" disabled>
                    </div>

                    <div class="parameters_form--option" v-bind:class="{active : paramList.tags, disabled : (storeSourceArticle.tags.length <= 0)}">
                        <label for="tags">Tags</label>
                        <input v-if="storeSourceArticle.tags.length <= 0" type="checkbox" id="tags" value="tags" :checked="paramList.tags" disabled="true">
                        <input v-else type="checkbox" id="tags" value="tags" :checked="paramList.tags" @click="toggle('tags')" disabled>
                    </div>

                    <div class="parameters_form--option" v-bind:class="{active : paramList.body}">
                        <label for="body">Body text</label>
                        <input type="checkbox" id="body" value="body" :checked="paramList.body" @click="toggle('body')" disabled>
                    </div>
                </form>
                <div v-if="(paramList.title || paramList.author || paramList.tags || paramList.body) && (!storeMatchArticles().length)" class="parameters_button parameters_form--submit" @click="getMatchArticles(); loadingMatches(); matchesLoadedTimeOut();">Get Matches</div>
                <div v-else class="parameters_button parameters_form--submit--noparams">Get Matches</div>
<!--                <div v-else-if="(paramList.title || paramList.author || paramList.tags || paramList.body) && (storeMatchArticles().length)" class="parameters_button parameters_form&#45;&#45;submit" @click="getMatchArticles()">Get new pool ↺</div>-->
<!--                <div v-else class="parameters_button parameters_form&#45;&#45;submit&#45;&#45;noparams">Get new pool ↺</div>-->
            </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="parameters_column parameters_column--right">
            <div class="parameters_column--field field-score">
                <p class="placeholder">Algorithm match score</p>
                <div class="score_rating">
                    <span v-if="Number.isInteger(matchArticleOnView)">{{Number.parseFloat(storeMatchArticles()[matchArticleOnView].data.rate * 100).toFixed(2)}}%</span>
                    <span class="score_rating--noarticle" v-else>-.--</span>
                </div>
            </div>

            <div class="parameters_column--field field-user-score">
                <p class="placeholder">Your rating</p>
                <form>
                    <div class="parameters_score--option">
                        <label>1</label>
                        <input v-if="storeMatchArticles().length" type="radio" value="1" name="user-rating" v-model="scoreVal" @click="score(1)">
                        <input v-else type="radio" value="1" disabled>
                    </div>
                    <div class="parameters_score--option">
                        <label>2</label>
                        <input v-if="storeMatchArticles().length" type="radio" value="2" name="user-rating" v-model="scoreVal" @click="score(2)">
                        <input v-else type="radio" value="2" disabled>
                    </div>
                    <div class="parameters_score--option">
                        <label>3</label>
                        <input v-if="storeMatchArticles().length" type="radio" value="3" name="user-rating" v-model="scoreVal" @click="score(3)">
                        <input v-else type="radio" value="3" disabled>
                    </div>
                    <div class="parameters_score--option">
                        <label>4</label>
                        <input v-if="storeMatchArticles().length" type="radio" value="4" name="user-rating" v-model="scoreVal" @click="score(4)">
                        <input v-else type="radio" value="4" disabled>
                    </div>
                    <div class="parameters_score--option">
                        <label>5</label>
                        <input v-if="storeMatchArticles().length" type="radio" value="5" name="user-rating" v-model="scoreVal" @click="score(5)">
                        <input v-else type="radio" value="5" disabled>
                    </div>
                </form>
            </div>

            <div class="parameters_column--field field-matchmaking">
                <p class="placeholder">Match or no match</p>
                <!--                    !storeMatchArticles()[matchArticleOnView].isMatch-->
                <div v-if="storeMatchArticles().length">
                    <div class="parameters_button parameters_matchmaking--yes" @click="serveSetMatch()">Yes, it is</div>
                    <span class="divider-slash">/</span>
                    <div class="parameters_button parameters_matchmaking--no" @click="unServeSetMatch()">No, it's not</div>
                </div>
                <div v-else>
                    <div class="parameters_button parameters_matchmaking--yes--inactive">Yes, it is</div>
                    <span class="divider-slash">/</span>
                    <div class="parameters_button parameters_matchmaking--no--inactive">No, it's not</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        name: "parameters",
        computed: {
            storeSourceArticle() {
                return this.$store.state.articlesStore.sourceArticle
            },
            scrollLock() {
                return this.$store.state.articlesStore.scrollLock
            },
            paramList() {
                return this.$store.state.articlesStore.listPar
            },
            matchArticleOnView() {
                return this.$store.state.articlesStore.matchArticleOnView
            }
        },
        data() {
            return {
                showParameters: true,
                isMatch: null,
                value: 5,
                scoreVal: ''
            }
        },
        methods: {
            serveSetMatch() {
                this.isMatch = true;
                this.setMatchArticle();
            },
            unServeSetMatch() {
                this.isMatch = false;
                this.unSetMatchArticle();
            },
            getMatchArticles() {
                return this.$store.dispatch('articlesStore/get_match');
            },
            storeMatchArticles() {
                return this.$store.state.articlesStore.matchArticles;
            },
            storePreMatchedArticles() {
                return this.$store.state.articlesStore.preMatchedArticles
            },
            setMatchArticle() {
                return this.$store.dispatch('articlesStore/confirm_match');
            },
            unSetMatchArticle() {
                return this.$store.dispatch('articlesStore/deny_match');
            },
            ...mapMutations({
                toggle: 'articlesStore/toggleThis',
                score: 'articlesStore/scoreThis',
                lockedScroll: 'articlesStore/changeLockedScroll',
                loadingMatches: 'articlesStore/set_loadMatch',
                matchesLoaded: 'articlesStore/unSet_loadMatch'
            }),
            matchesLoadedTimeOut(){
                setTimeout(this.matchesLoaded, 5000);
            }
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
        z-index: 99999;
        &_score--option {
            padding: 0;
            display: inline-block;
            margin: 0 $spacing*0.75 0 0;
            border-radius: 0;
            font-size: 20px;
            line-height: 46px;
            /*border-bottom: 2px solid rgba(49, 49, 49, 1);*/
            &:first-of-type {
                margin: 0 $spacing*0.75 0 $spacing*1.5;
            }
        }

        & .parameters_column {
            width: 50%;
            display: flex;
            align-items: stretch;
            /*background-color: rgba(0, 0, 0, 0.05);*/

            &--left {
                box-sizing: content-box;
                border-right: 1px solid rgba(0, 0, 0, 1);
                float: left;

                & .parameters_column--field {
                    &.field-checkboxes {
                        /*flex-grow: 2;*/
                        /*border-right: 1px solid rgba(0, 0, 0, 0.1);*/
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
                        /*font-weight: 300;*/

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
            float: left;
            padding: 0 0 $spacing $spacing*1.5;
            &--option {
                /*font-weight: 300;*/
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
                &.disabled {
                    opacity: 0.6;
                    &:hover {
                        cursor: default !important;
                        background-color: transparent;
                    }
                    & label {
                        &:hover {
                            cursor: default !important;
                            background-color: transparent;
                        }
                    }
                    & input {
                        &:hover {
                            cursor: default !important;
                            background-color: transparent;
                        }
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
        /*font-weight: 300;*/
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

    .parameters_matchmaking--yes--inactive {
        color: rgba(0, 0, 0, 0.2);
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        &:hover {
            background-color: transparent;
            cursor: default;
        }
    }

    .parameters_matchmaking--no--inactive {
        margin-left: 0;
        color: rgba(0, 0, 0, 0.2);
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        &:hover {
            background-color: transparent;
            cursor: default;
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

    .popup-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .popup {
        display: flex;
        padding: $spacing;
        font-size: 20px;
        line-height: 26px;
        top: 40%;
        left: 25%;
        width: 50%;
        height: 20%;
        text-align: center;
        align-items: center;
        justify-content: center;
        align-content: center;
        /*line-height: 100%;*/
        border: 1px solid rgba(49, 49, 49, 1);
        /*left: 1px;*/
        /*top: 1px;*/
        /*bottom: 1px;*/
        /*right: 1px;*/
        position: absolute;
        margin: auto;
        background-color: white;
    }

</style>