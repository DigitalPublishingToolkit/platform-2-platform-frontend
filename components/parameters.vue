<template>
    <div class="parameters">
        <div class="popup-wrapper" v-if="isMatch === true" @click="closePopUp()">
            <div class="popup">
                <p>Article is saved as a match.</p>
                <img :src=giphySrcGood>
            </div>
        </div>
        <div class="popup-wrapper" v-if="isMatch === false" @click="closePopUp()">
            <div class="popup">
                <p>Article is removed as a match.</p>
                <img :src=giphySrcBad>
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
                <div class="field-user-score-content" v-if="storeMatchArticles().length">
                    <div class="parameters_score--option" v-bind:class="{selected : 1 === scoreVal}" @click="score(1); updateScoreVal(1);">
                        1
                    </div>
                    <div class="parameters_score--option" v-bind:class="{selected : 2 === scoreVal}" @click="score(2); updateScoreVal(2);">
                        2
                    </div>
                    <div class="parameters_score--option" v-bind:class="{selected : 3 === scoreVal}" @click="score(3); updateScoreVal(3);">
                        3
                    </div>
                    <div class="parameters_score--option" v-bind:class="{selected : 4 === scoreVal}" @click="score(4); updateScoreVal(4);">
                        4
                    </div>
                    <div class="parameters_score--option" v-bind:class="{selected : 5 === scoreVal}" @click="score(5); updateScoreVal(5);">
                        5
                    </div>
                </div>
            </div>

            <div class="parameters_column--field field-matchmaking">
                <p class="placeholder">Match or no match</p>
                <!--                    !storeMatchArticles()[matchArticleOnView].isMatch-->
                <div v-if="storeMatchArticles().length">
                    <div class="parameters_button parameters_matchmaking--yes" @click="serveSetMatch()">Yes</div>
                    <span class="divider-slash">/</span>
                    <div class="parameters_button parameters_matchmaking--no" @click="unServeSetMatch()">No</div>
                </div>
                <div v-else>
                    <div class="parameters_button parameters_matchmaking--yes--inactive">Yes</div>
                    <span class="divider-slash">/</span>
                    <div class="parameters_button parameters_matchmaking--no--inactive">No</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import axios from "axios";
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
                scoreVal: '',
                giphySrcGood: '',
                giphySrcBad: ''
            }
        },
        methods: {
            serveSetMatch() {
                let choice = Math.ceil(Math.random() * 4);

                if(choice === 1) {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=good job&rating=G").then(response => {
                        this.giphySrcGood = response.data.data.images.downsized_large.url;
                    });
                } else if(choice === 2) {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=thumbs up&rating=G").then(response => {
                        this.giphySrcGood = response.data.data.images.downsized_large.url;
                    });
                } else if(choice === 3) {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=clapping&rating=G").then(response => {
                        this.giphySrcGood = response.data.data.images.downsized_large.url;
                    });
                } else {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=success&rating=G").then(response => {
                        this.giphySrcGood = response.data.data.images.downsized_large.url;
                    });
                }
                this.scoreVal = '';
                this.isMatch = true;
                this.setMatchArticle();
            },
            unServeSetMatch() {
                let choice = Math.ceil(Math.random() * 4);

                if(choice === 1) {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=head shake&rating=G").then(response => {
                        this.giphySrcBad = response.data.data.images.downsized_large.url;
                    });
                } else if(choice === 2) {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=thumbs down&rating=G").then(response => {
                        this.giphySrcBad = response.data.data.images.downsized_large.url;
                    });
                } else if(choice === 3) {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=boo&rating=G").then(response => {
                        this.giphySrcBad = response.data.data.images.downsized_large.url;
                    });
                } else {
                    axios.get("https://api.giphy.com/v1/gifs/random?api_key=C4SLlhItBBSnV5vIOeVkaUNlqXAEVynb&tag=tear&rating=G").then(response => {
                        this.giphySrcBad = response.data.data.images.downsized_large.url;
                    });
                }
                this.scoreVal = '';
                this.isMatch = false;
                this.unSetMatchArticle();
            },
            closePopUp() {
                this.isMatch = null;
                this.giphySrcBad = '';
                this.giphySrcGood = '';
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
                setTimeout(this.matchesLoaded, 2500);
            },
            updateScoreVal(val) {
                this.scoreVal = val;
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
        @media (max-width: 1200px) {
            height: 160px;
        }
            &_score--option {
            padding: 0;
            display: block;
            float: left;
            margin: 0 $spacing*0.25 $spacing*0.25 0;
            border-radius: 2px;
            font-size: 20px;
            line-height: 44px;
            width: 1.3em;
            text-align: center;
            border: 1px solid $charcoal;
            &:hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.1);
            }
            &.selected {
                color: $white;
                background-color: $red;
            }
        }
        & .parameters_column {
            width: 50%;
            display: flex;
            align-items: stretch;
            height: 100%;
            &--left {
                box-sizing: content-box;
                border-right: 1px solid rgba(0, 0, 0, 1);
                float: left;
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
                        & span {
                            font-size: $font-size-l;
                            line-height: 46px;
                            margin: 0 0 0 $spacing*1.5;
                            background-color: rgba(0,0,0,0.1);
                            padding: 2px;
                            border-radius: 2px;
                        }
                    }
                    & .field-user-score-content {
                        margin: 0 0 0 $spacing*1.5;
                    }
                }
            }
        }
        & .placeholder {
            font-size: $font-size-s;
            color: rgba(0, 0, 0, 0.4);
            margin: $spacing/2 $spacing/3 0 $spacing/3;
            padding: $spacing/2;
        }
        &_form {
            display: inline-block;
            float: left;
            padding: 0 0 $spacing/3 $spacing*1.5;
            &--option {
                float: left;
                display: inline-block;
                color: $black;
                margin: 0 $spacing*1.5 0 0;
                padding: 0;
                border-radius: 0;
                font-size: 20px;
                line-height: 46px;
                border-bottom: 2px solid rgba(49, 49, 49, 1);
                &:last-of-type {
                    margin: 0;
                }
                &.active {
                    border-bottom: 2px solid $red;
                    color: $red;
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
        background-color: transparent;
        outline: none;
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        display: inline-block;
        margin: 0 $spacing*1.5 $spacing $spacing*1.5;
        border-bottom: 2px solid rgba(49, 49, 49, 1);
        &:hover {
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.1);
        }
        &.parameters_matchmaking--no {
            margin-left: 0;
        }
        &.parameters_matchmaking--yes {
            margin-right: 0;
        }
    }
    .parameters_matchmaking--yes--inactive {
        color: rgba(0, 0, 0, 0.2);
        border-bottom: 2px solid rgba(0, 0, 0, 0.2);
        margin-right: 0;
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
        margin: 0 $spacing/2;
    }
    .active {
        color: $green;
        border-bottom: 2px solid $green;
    }
    .score_rating--noarticle {
        color: rgba(0, 0, 0, 0.2);
    }
    .popup-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
    }
    .popup {
        display: flex;
        padding: $spacing;
        font-size: 20px;
        line-height: 26px;
        left: 25%;
        width: 50%;
        height: auto;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        align-content: center;
        border: 1px solid rgba(49, 49, 49, 1);
        position: absolute;
        margin: auto;
        background-color: white;
        & > * {
            display: block;
        }
    }
</style>