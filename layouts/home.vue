<template>
    <div class="main">
        <parameters></parameters>
        <directory></directory>
        <div class="main_articles">
            <div class="main_articles_left-column">
                <article class="source-article"></article>
            </div>
            <div class="main_articles_right-column">
                <article class="matched-article-1"></article>
<!--            <article class="matched-article-2"></article>-->
<!--            <article class="matched-article-3"></article>-->
            </div>
        </div>
        <nuxt/>
    </div>
</template>

<script>
    import sidebar from "~/components/parameters"
    export default {
        name: "home",
        components: {
            parameters,
            directory,
            article
        }
    }
</script>

<style lang="scss" scoped>

</style>