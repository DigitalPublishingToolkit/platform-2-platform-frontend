<template>
    <div class="main">
        <parameters></parameters>
        <nuxt/>
    </div>
</template>

<script>
    import parameters from "~/components/parameters"

    export default {
        name: "home",
        components: {
            parameters
        }
    }
</script>

<style lang="scss">
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .main, body {
        background-color: $charcoal;
    }
</style>