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
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;

        &_option {
            color: white;
            text-decoration: none;
            flex-grow: 1;
            text-align: center;

            &:visited {
                color: white;
            }

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>