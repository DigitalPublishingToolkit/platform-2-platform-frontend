<template>
    <div class="index">
        <nuxt-link to="/amateurcities" class="index_option">Amateur Cities <span>{{progressAmateurCities}}% done</span></nuxt-link>
        <nuxt-link to="/open" class="index_option">Open! <span>{{progressOpen}}% done</span></nuxt-link>
        <nuxt-link to="/openset" class="index_option">Open Set <span>{{progressOpenSet}}% done</span></nuxt-link>
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
        async fetch({store}) {
            await store.dispatch('articlesStore/get_process')
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
            }
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
            line-height: 100vh;
            font-size: 2em;
            background-color: $white;
            border: 1px solid $charcoal;
            box-sizing: border-box;

            &:visited {
                color: $charcoal;
            }

            &:hover {
                text-decoration: underline;
            }

            & span {
                position: absolute;
                display: block;
                font-size: 0.5em;
                margin-top: 3em;
                background-color: rgba($charcoal, 0.1);
                border-radius: 2px;
                color: rgba($charcoal, 0.5);
                padding: $spacing/3;
            }
        }
    }
</style>