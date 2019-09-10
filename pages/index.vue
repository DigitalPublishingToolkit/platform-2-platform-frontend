<template>
    <div class="main_articles">
        <div class="main_articles_column main_articles_column--left">
            <articleComp class="article--source"></articleComp>
        </div>
        <div class="main_articles_column main_articles_column--right">
            <articleComp class="article--match--1"></articleComp>
            <!--            <article class="article--match--1"></article>-->
            <!--            <article class="article--match--1"></article>-->
        </div>
    </div>
</template>

<script>
    import articleComp from "~/components/article-comp"
    export default {
        name: "index",
        layout: "home",
        components: {
            articleComp
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .main_articles {
        position: absolute;
        overflow: hidden;
        top: $parameter-show;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #b9afaf;
        &_column {
            position: relative;
            width: 50%;
            float: left;
            display: block;
            &--right {
            }
        }
        &::after {
            content: '';
            border-left: 1px solid grey;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
        }
    }
</style>