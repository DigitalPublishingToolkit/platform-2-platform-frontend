<template>
    <div class="index">
        <nuxt-link to="/amateurcities" class="index_option">Amateur Cities</nuxt-link>
        <nuxt-link to="/open" class="index_option">Open!</nuxt-link>
        <nuxt-link to="/openset" class="index_option">Open Set</nuxt-link>
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
            flex: 1;
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
        }
    }
</style>