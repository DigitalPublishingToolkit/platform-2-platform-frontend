<template>
    <div class="main_articles">
        <div id="left-column" class="main_articles_column main_articles_column--left" v-on:scroll="scrollBarNow(); handleScroll($event); showTitlePlaceholder($event);">
            <div class="articles_column--left--scrollbar article--scrollbar" :class="{together: scrollLock}">
                <div class="article--scrollbar_thumb articles_column--left--scrollbar_thumb" @click="lockedScroll()"></div>
            </div>

            <div v-if="storePreMatchedArticles().length" class="article--placeholder match-tabs">
                <div class="tab tab_source" @click="showSourceNow()" :class="{active: showSource}">
                    <p class="source">Source article</p>
                    <p class="title">Source article: {{storeSourceArticle.title}}</p>
                </div>
                <div v-for="(match, index) in storePreMatchedArticles()" class="tab" v-bind:data="index" @click="showPreMatch(index)" :class="{active : showMatchedArticle(index)}">
                    <p>Match {{index + 1}}</p>
                </div>
            </div>
            <div v-else class="article--placeholder">
                <p class="source">Source article</p>
                <p class="title">Source article: {{storeSourceArticle.title}}</p>
            </div>

            <articleComp articleType="source" articleInd="0" :articleData="storeSourceArticle" class="article--source" :class="{active: showSource}"></articleComp>
            <articleCompPreMatch v-if="storePreMatchedArticles().length" v-for="(match, index) in storePreMatchedArticles()" articleType="matched" :key="index" :articleInd="index" :articleData="match" class="article--matched" v-bind:class="{active : showMatchedArticle(index)}"></articleCompPreMatch>

        </div>
        <div id="right-column" class="main_articles_column main_articles_column--right" v-on:scroll="scrollBarNow(); handleScroll($event);" v-bind:class="{noArticle : (storeMatchArticles().length === 0)}">
            <div class="articles_column--right--scrollbar article--scrollbar" :class="{together: scrollLock}">
                <div class="article--scrollbar_thumb articles_column--right--scrollbar_thumb" @click="lockedScroll()"></div>
            </div>

            <div v-if="storeMatchArticles().length" class="article--placeholder match-tabs">
                <div v-for="(match, index) in storeMatchArticles()" class="tab" :class="{active : (matchArticleOnView === index), yesMatch : match.isMatch}" v-bind:data="index" @click="updateView(index); highlightTagsTitle();">
                    <div><p>Match suggestion {{match.matchIndex}}: {{match.data.title}}</p></div><div class="gradient"></div>
                </div>
            </div>
            <articleComp v-if="storeMatchArticles().length" v-for="(match, index) in storeMatchArticles()" articleType="match" :key="index" :articleInd="index" :articleData="match.data" :isMatch="match.isMatch" class="article--match article--match--1" v-bind:class="{active : match.onView, yesMatch : match.isMatch}"></articleComp>

            <div class="noArticle_placeholder" v-if="!storeMatchArticles().length && !loadMatch()">Select criteria and get articles…</div>

            <div class="loading_placeholder" v-if="loadMatch()">
                <div class="loadingContainer">
                    <div class="loader box-rotation"></div>
                </div>
                <p>Criteria send, retrieving matches from server…</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {mapGetters} from 'vuex'
    import articleComp from "~/components/article-comp"
    import parameters from "~/components/parameters"
    import articleCompPreMatch from "~/components/article-comp-prematch"

    export default {
        name: "open",
        layout: "home",
        head: {meta: [{charset: 'UTF-8'}]},
        async fetch({store}) {
            await store.dispatch('articlesStore/get_source_open')
        },
        computed: {
            scrollLock() {
                return this.$store.state.articlesStore.scrollLock
            },
            storeSourceArticle() {
                return this.$store.state.articlesStore.sourceArticle
            },
            matchArticleOnView() {
                return this.$store.state.articlesStore.matchArticleOnView
            },
        },
        data() {
            return {
                checkedParameters: [],
                showSource: true,
                showPreMatchedArticle: [],
                showPreMatchIndex: 0
            }
        },
        mounted() {
            this.setScrollBarSource();
        },
        components: {
            articleComp,
            parameters,
            articleCompPreMatch
        },
        methods: {
            ...mapGetters({
                sourceBodyTextArray: 'articlesStore/sourceBodyAsArray',
                vocabulary: 'articlesStore/vocabulary'
            }),
            ...mapMutations({
                updateView: 'articlesStore/setOnview',
                lockedScroll: 'articlesStore/changeLockedScroll',
                toggleOverLap: 'articlesStore/overLapFalse'
            }),
            showTitlePlaceholder(e) {
                const titleField = document.querySelector('#left-column .article--data_title');
                const sourcePlaceholder = document.querySelector('#left-column .article--placeholder p.source');
                const titlePlaceholder = document.querySelector('#left-column .article--placeholder p.title');
                if(titleField.getBoundingClientRect().height + titleField.getBoundingClientRect().top <= 34) {
                    sourcePlaceholder.style.opacity = '0';
                    sourcePlaceholder.style.display = 'none';
                    titlePlaceholder.style.opacity = '1';
                    titlePlaceholder.style.display = 'inline-block';
                } else {
                    titlePlaceholder.style.opacity = '0';
                    titlePlaceholder.style.display = 'none';
                    sourcePlaceholder.style.opacity = '1';
                    sourcePlaceholder.style.display = 'inline-block';
                }
            },
            showSourceNow() {
                this.showSource = true;
            },
            showPreMatch(ind) {
                this.showPreMatchIndex = ind;
                this.showSource = false;
            },
            showMatchedArticle(ind) {
                return (this.showPreMatchIndex === ind) && !this.showSource
            },
            loadMatch() {
                return this.$store.state.articlesStore.loadingMatches
            },
            findOverlap() {
                return this.$store.state.articlesStore.findOverlapBool
            },
            getMatchArticles() {
                return this.$store.dispatch('articlesStore/get_match')
            },
            storeMatchArticles() {
                return this.$store.state.articlesStore.matchArticles
            },
            storePreMatchedArticles() {
                return this.$store.state.articlesStore.preMatchedArticles
            },
            highlightTagsTitle() {
                let allSimilar = document.querySelectorAll('.similar');

                allSimilar.forEach(function(similarNode, ind) {
                    similarNode.classList.remove('similar');
                });
                const sourceArticle = document.querySelector("#left-column .article--source");
                const sourceTags = sourceArticle.querySelectorAll('.article--data--content_tags_tag');
                const activeMatchArticle = document.querySelector(".article--match.active");
                const activeMatchTags = activeMatchArticle.querySelectorAll('.article--data--content_tags_tag');
                sourceTags.forEach(function(sourceTagNode, sourceInd) {
                    activeMatchTags.forEach(function(matchTagNode, matchInd) {
                        if(sourceTagNode.innerHTML.trim().toLowerCase() === matchTagNode.innerHTML.trim().toLowerCase()) {
                            sourceTagNode.classList.add('similar');
                            matchTagNode.classList.add('similar');
                        }
                    });
                });
                let allCurrentSpans = document.querySelectorAll('span[matchindex]');
                for(let spanInd = 0; spanInd < allCurrentSpans.length; spanInd++) {
                    if(allCurrentSpans[spanInd].getAttribute('matchindex') === (''+this.matchArticleOnView+'')) {
                        allCurrentSpans[spanInd].classList.add('highlight');
                    }
                }
            },
            handleScroll: function(e) {
                if(this.scrollLock) {
                    switch(e.currentTarget.classList[1]) {
                        case("main_articles_column--left"):
                            document.getElementById("right-column").scrollTop = e.target.scrollTop;
                            this.scrollBarNow(e.currentTarget.classList[1]);
                            this.scrollBarNow("main_articles_column--right");
                            break;
                        case("main_articles_column--right"):
                            document.getElementById("left-column").scrollTop = e.target.scrollTop;
                            this.scrollBarNow(e.currentTarget.classList[1]);
                            this.scrollBarNow("main_articles_column--left");
                            break;
                    }
                } else {
                    this.scrollBarNow(e.currentTarget.classList[1]);
                }
            },
            setScrollBarSource: function() {
                var contentHeight = document.getElementsByClassName("article article--source")[0].clientHeight;
                var viewportHeight = document.getElementById("left-column").clientHeight;
                document.getElementsByClassName("articles_column--left--scrollbar_thumb")[0].style.height = viewportHeight * (viewportHeight / contentHeight) + "px";
            },
            scrollBarNow: function(scrollTargetClass) {
                var contentHeight;
                var viewportHeight;
                var contentScroll;
                switch(scrollTargetClass) {
                    case("main_articles_column--left"):
                        contentHeight = document.getElementsByClassName("article article--source")[0].clientHeight;
                        viewportHeight = document.getElementById("left-column").clientHeight;
                        contentScroll = document.getElementById("left-column").scrollTop;
                        document.getElementsByClassName("articles_column--left--scrollbar_thumb")[0].style.top = Math.ceil(contentScroll * (viewportHeight / contentHeight)) + "px";
                        break;
                    case("main_articles_column--right"):
                        if(this.storeMatchArticles().length > 0) {
                            contentHeight = document.getElementsByClassName("article--match active")[0].clientHeight;
                            viewportHeight = document.getElementById("right-column").clientHeight;
                            contentScroll = document.getElementById("right-column").scrollTop;
                            document.getElementsByClassName("articles_column--right--scrollbar_thumb")[0].style.top = Math.ceil(contentScroll * (viewportHeight / contentHeight)) + "px";
                        }
                        break;
                }

            },
            findPlainText: function(element, substring, callback) {
                for (let childi = element.childNodes.length; childi-->0;) {
                    let child= element.childNodes[childi];
                    if (child.nodeType===1) {
                        if (child.tagName.toLowerCase()!=='a')
                            this.findPlainText(child, substring, callback);
                    } else if (child.nodeType===3) {
                        let index = child.data.length;
                        while (true) {
                            index = child.data.lastIndexOf(substring, index);
                            if (index === -1)
                                break;
                            callback.call(window, child, index)
                        }
                    }
                }
            }
        },
        ready: function(){
            window.addEventListener('resize', function(){
                this.setScrollBarSource();
                if(this.storeMatchArticles().length > 0) {
                    let contentHeight = document.getElementsByClassName("article--match active")[0].clientHeight;
                    let viewportHeight = document.getElementById("right-column").clientHeight;
                    document.getElementsByClassName("articles_column--right--scrollbar_thumb")[0].style.height = viewportHeight * (viewportHeight / contentHeight) + "px";
                }
            });
        },
        updated: function() {
            this.$nextTick(function () {
                if(this.storeMatchArticles().length > 0) {
                    let contentHeight = document.getElementsByClassName("article--match active")[0].clientHeight;
                    let viewportHeight = document.getElementById("right-column").clientHeight;
                    document.getElementsByClassName("articles_column--right--scrollbar_thumb")[0].style.height = viewportHeight * (viewportHeight / contentHeight) + "px";
                    this.highlightTagsTitle();
                    if(this.findOverlap) {
                        let findOverlap = false;
                        let matchArticles = document.querySelectorAll(".article--match");
                        const sourceArticle = document.querySelector(".article.article--source");
                        const sourceArticleBody = sourceArticle.querySelector(".article--data--content.article--data--content_body");
                        const sourceArticleTitle = sourceArticle.querySelector(".article--data--content.article--data--content_title");
                        const sourceArticleTitleArr = sourceArticleTitle.innerHTML.split(' ');
                        let sourceArticleTitleArrNew = [];
                        sourceArticleTitleArr.forEach(function(item, index) {
                            if(item.length > 2) sourceArticleTitleArrNew.push(item);
                        });
                        for(let i = 0; i < this.storeMatchArticles().length; i++) {
                            let article = this.storeMatchArticles()[i].data;
                            let activeMatchArticleBody = matchArticles[i].querySelector(".article--data--content.article--data--content_body");
                            let activeMatchArticleTitle = matchArticles[i].querySelector(".article--data--content.article--data--content_title");
                            let activeMatchArticleTitleArr = activeMatchArticleTitle.innerHTML.split(' ');
                            let activeMatchArticleTitleArrNew = [];
                            activeMatchArticleTitleArr.forEach(function(item, index) {
                                if(item.length > 2) activeMatchArticleTitleArrNew.push(item);
                            });
                            if(sourceArticleTitleArrNew.length > 1) {
                                for(let sourceTitleInd = 0; sourceTitleInd < sourceArticleTitleArrNew.length; sourceTitleInd++) {
                                    let substring = sourceArticleTitleArrNew[sourceTitleInd];
                                    this.findPlainText(activeMatchArticleTitle, substring, function(node, index) {
                                        node.splitText(index + substring.length);
                                        const spanHighlight = document.createElement('span');
                                        spanHighlight.setAttribute('matchIndex', i);
                                        spanHighlight.appendChild(node.splitText(index));
                                        node.parentNode.insertBefore(spanHighlight, node.nextSibling);
                                    });
                                }
                            }
                            if(activeMatchArticleTitleArrNew.length > 1) {
                                for(let matchTitleInd = 0; matchTitleInd < activeMatchArticleTitleArrNew.length; matchTitleInd++) {
                                    let substring = activeMatchArticleTitleArrNew[matchTitleInd];
                                    this.findPlainText(sourceArticleTitle, substring, function(node, index) {
                                        node.splitText(index + substring.length);
                                        const spanHighlight = document.createElement('span');
                                        spanHighlight.setAttribute('matchIndex', i);
                                        spanHighlight.appendChild(node.splitText(index));
                                        node.parentNode.insertBefore(spanHighlight, node.nextSibling);
                                    });
                                }
                            }
                            if(i > 0) {
                                findOverlap = true;
                            }
                        }
                        if(findOverlap) {
                            this.findOverlap = false;
                            this.toggleOverLap();
                            findOverlap = false;
                            this.highlightTagsTitle();
                        }
                    }
                }
            });
        },
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";
    .divider_bar {
        position: absolute;
        height: 3px;
        background-color: rgba(49, 49, 49, 1);
    }
    .main_articles {
        position: absolute;
        top: 3px;
        left: 0;
        right: 0;
        bottom: $parameter-size;
        @media (max-width: 1200px) {
            bottom: 160px;
        }
        background-color: rgba(255, 255, 255, 1);
        &_column {
            position: absolute;
            width: 50%;
            top: 0;
            bottom: 0;
            overflow: auto;
            display: block;
            &--left {
                left: 0;
            }
            &--right {
                right: 0;
                transition: background-color 0.2s ease;
            }
        }
        &::after {
            content: '';
            border-left: 1px solid $charcoal;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            z-index: 999;
        }
    }
    .article--source {
        display: none;
        &.active {
            display: block;
            animation: fadeIn 1s;
        }
    }
    .article--matched {
        display: none;
        &.active {
            display: block;
            animation: fadeIn 1s;
        }
    }
    .article--match {
        display: none;
        &.active {
            display: block;
            animation: fadeIn 1s;
        }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .article--placeholder {
        font-size: $font-size-s;
        color: rgba(0, 0, 0, 0.6);
        margin: 0 $spacing/3;
        padding: $spacing/2;
        position: fixed;
        width: 50%;
        background-color: rgba(255, 255, 255, 1);
        transition: background-color 0.2s ease;
        &.match-tabs {
            display: flex;
            flex-direction: row;
            align-content: stretch;
            align-items: stretch;
            padding: 0;
            margin: 0;
            z-index: 99;
            & .tab {
                position: relative;
                padding: $spacing/2 ($spacing/2 + 6);
                flex: 1;
                background-color: $charcoal;
                color: $white;
                border-right: 1px solid rgba(255, 255, 255, 0.2);
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                overflow:hidden;
                transition: flex 0.125s linear;
                & div {
                    overflow:hidden;
                }
                & .gradient {
                    position: absolute;
                    right: $spacing/2;
                    top: 0;
                    width: 12.5%;
                    height: 100%;
                    background: linear-gradient(90deg, rgba($charcoal,0) 0%, rgba($charcoal,1) 100%);
                }
                & p {
                    display: block;
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 100%;
                }
                &:last-of-type {
                    border-right: none;
                }
                &.active {
                    background-color: $white;
                    border-bottom: none;
                    color: $black;
                    cursor: default !important;
                    flex: 5;
                    & p {
                        display: inline-block;
                        &:nth-of-type(2) {
                            display: none;
                            opacity: 0;
                            transition: opacity 0.2s linear;
                        }
                    }
                    & .gradient {
                        position: absolute;
                        right: $spacing/2;
                        top: 0;
                        width: 12.5%;
                        height: 100%;
                        background: linear-gradient(90deg, rgba($white,0) 0%, rgba($white,1) 100%);
                    }
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
        & p {
            display: inline-block;
            float: left;
            opacity: 1;
            transition: opacity 0.2s linear;
            &:nth-of-type(2) {
                display: none;
                opacity: 0;
                transition: opacity 0.2s linear;
            }
        }
        & .lockScroll {
            float: right;
            &:hover {
                text-decoration-line: underline;
                text-decoration-style: dotted;
                cursor: pointer;
            }
            &.active {
                color: green;
                & span {
                    background-color: green;
                }
            }
            &.inactive {
                color: rgba(0, 0, 0, 0.6);
                & span {
                    background-color: rgba(0, 0, 0, 0.6);
                }
            }
            & span {
                width: 6px;
                height: 6px;
                border-radius: 3px;
                display:inline-block;
                margin-left: 1px;
                margin-bottom: 1px;
            }
        }
    }

    .noArticle .article--placeholder {
        background-color: transparent;
    }
    .noArticle_placeholder {
        position: absolute;
        width: 50%;
        height: 18px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        text-align: center;
        color: rgba(0,0,0,0.2);
    }
    .articles_column--left--scrollbar {
        right: 50vw;
        margin-right: 2px;
        &.together {
            margin-right: 0;
        }
        & .article--scrollbar_thumb {
            right: 0;
        }
    }
    .articles_column--right--scrollbar {
        left: 50.05vw;
        margin-left: 2px;
        &.together {
            margin-left: 0;
        }
        & .article--scrollbar_thumb {
            left: 0;
        }
    }
    .article--scrollbar{
        position: fixed;
        top: 5px;
        bottom: 112px;
        width: 4px;
        z-index: 999;
        overflow: hidden;
        &_thumb {
            background-color: $charcoal;
            position: absolute;
            width: 3px;
            &:hover {
                width: 4px;
                cursor: pointer;
            }
        }
    }
    .loading_placeholder {
        position: absolute;
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        & .loadingContainer {
            width: 100%;
            display: block;
            clear: both;
            text-align: center;
        }
        & p {
            font-size: $font-size-s;
            display: block;
            width: 100%;
            top: 10%;
            text-align: center;
            position: absolute;
            opacity: 0.5;
        }
    }
    .loader,.loader:before,.loader:after{
        box-sizing: border-box;
        flex-grow: 0;
        flex-shrink: 0;
    }
    @keyframes rect-rotate {
        0% {
            transform: rotate(0);
        }
        50%, 100% {
            transform: rotate(90deg);
        }
    }
    @keyframes fill-rect {
        0%, 50% {
            height: 0px;
        }
        100% {
            height: inherit;
        }
    }
    .loader.box-rotation {
        transform-origin: center center;
        color: $charcoal;
        width: $spacing*4;
        height: $spacing*4;
        position: relative;
        border: 1px solid;
        display: block;
        animation: rect-rotate 1s linear infinite;
        margin: auto;
    }
    .loader.box-rotation::after {
        content: "";
        height: 0px;
        width: 100%;
        height:100%;
        display: block;
        background: $charcoal;
        opacity: 1;
        animation: fill-rect 1s linear infinite;
    }
</style>