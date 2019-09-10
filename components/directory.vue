<template>
    <div class="directory">
        <div class="directory_wrapper">
            <div class="directory_wrapper_article" v-for="article in fullArticleList">
                <div class="directory_wrapper_article--title">{{ article.title }}</div>
                <div class="directory_wrapper_article--author">{{ article.author }}</div>
                <div class="directory_wrapper_article--timestamp">{{ article.timestamp }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "directory",
        data() {
            return {
                fullArticleList: [
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"},
                    {title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"}
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/variables.scss";

    .directory {
        font-family: $font-stack;
        position: fixed;
        height: 100%;
        width: 20%;
        top: $parameter-show;
        left: 0;
        overflow: auto;
        &_wrapper {
            &_article {
                font-size: $font-size-xs;
                font-weight: normal;
                &--title {
                    font-weight: bold;
                }
            }
        }
    }
</style>