<template>
    <div class="article">
        Hello!
        <div class="article__title"></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        layout: "home"
    }
</script>

<style lang="scss">
    @import "../assets/style/variables.scss";

    .article {
        font-size: $font-size-s;
        &__title {
            font-size: $font-size;
        }
    }
</style>