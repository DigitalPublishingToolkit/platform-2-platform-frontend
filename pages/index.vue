<template>
    <div class="index" :class="{firefoxClass: firefox}">
        <nuxt-link to="/amateurcities" class="index_option"><div><p>Amateur Cities</p><p><span>{{progressAmateurCities}}% done</span></p></div></nuxt-link>
        <nuxt-link to="/open" class="index_option"><div><p>Open!</p><p><span>{{progressOpen}}% done</span></p></div></nuxt-link>
        <nuxt-link to="/openset" class="index_option"><div><p>Open Set</p><p><span>{{progressOpenSet}}% done</span></p></div></nuxt-link>
    </div>
</template>

<script>
    export default {
        name: "index",
        layout: "root",
        head: {
            meta: [
                {charset: 'UTF-8'},
            ]
        },
        data() {
            return {
                firefox: false
            }
        },
        async fetch({store}) {
            await store.dispatch('articlesStore/get_process')
        },
        mounted() {
            this.setMatchesNull();

            if(navigator.userAgent.indexOf("Firefox") != -1) {
                this.firefox = true;
            }
        },
        computed: {
            progressAmateurCities() {
                return this.calcProgress("amateur-cities");
            },
            progressOpen() {
                return this.calcProgress("online-open");
            },
            progressOpenSet() {
                return this.calcProgress("open-set-reader");
            }
        },
        methods: {
            calcProgress(publisherChoice) {
                let progressPercentage, progressFixed;
                this.$store.state.articlesStore.progress.forEach(function(pubs) {
                    if(pubs.publisher === publisherChoice) {
                        progressPercentage = (pubs.matched / pubs.total) * 100;
                        progressFixed = progressPercentage.toFixed(1);
                    }
                });

                return progressFixed;
            },
            setMatchesNull() {
                return this.$store.dispatch('articlesStore/nullMatches');
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .index {
        top: 3px;
        bottom: 0;
        width: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        overflow: hidden;
        &:before {
            content: 'Select the source you want to fetch articles from';
            position: absolute;
            font-size: 1em;
            width: auto;
            top: 0;
            padding: $spacing/2;
            color: white;
            margin: $spacing;
            background-color: $charcoal;
            border-radius: 2px;
            text-align: center;
        }
        &.firefoxClass:after {
            content: 'You are using Firefox, we recommend a different browser for the best experience…';
            position: absolute;
            font-size: 1em;
            width: auto;
            top: 3em;
            color: $red;
            margin: $spacing;
            border-radius: 2px;
            text-align: center;
        }
        &_option {
            font-family: $font-stack-serif;
            color: $charcoal;
            text-decoration: none;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 100vh;
            /*line-height: 100vh;*/
            font-size: 2em;
            background-color: $white;
            border: 1px solid $charcoal;
            box-sizing: border-box;

            &:visited {
                color: $charcoal;
            }

            &:hover {
                & p:first-of-type {
                    text-decoration: underline;
                }

            }

            & div {
                display: block;
                & p {
                    height: 1.5em;
                    line-height: 1.5em;
                    text-align: center;
                }
            }

            & span {
                display: inline-block;
                font-size: 0.5em;
                margin: 0 auto;
                background-color: rgba($charcoal, 0.1);
                border-radius: 2px;
                color: rgba($charcoal, 0.5);
                padding: $spacing/3;
                text-decoration: none;
            }
        }
    }
</style>