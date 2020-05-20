<template>
    <div class="article">
        <div class="article--data article--data_publisher">
            <div class="article--data--placeholder">
                <p>Publisher</p>
            </div>
            <div class="article--data--content article--data--content_publisher">
                <strong>{{articleData.publisher}}</strong>, {{getMonthFromString(articleData.mod)}}, <a class="linkToOrigin" v-bind:href="articleData.url" target="_blank">source ↗</a>
            </div>
        </div>

        <div class="article--data article--data_title" ref="titleEle" v-bind:class="{requireY : paramList.title}" v-bind:style="{height: 'auto'}">
            <div class="article--data--placeholder">
                <p>Title</p>
            </div>
            <div class="article--data--content article--data--content_title">
                {{articleData.title}}
            </div>
        </div>

        <div class="article--data article--data_author" v-bind:class="{requireY : paramList.author}">
            <div class="article--data--placeholder">
                <p v-if="articleData.author.length > 1">Authors</p>
                <p v-else>Author</p>
            </div>
            <div v-if="articleData.author.length > 0" class="article--data--content article--data--content_authors">
                <span class="article--data--content_authors_author" v-for="author in articleData.author">{{author}}</span>
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Couldn't find author to scrape…
            </div>
        </div>

        <div class="article--data article--data_tags" v-bind:class="{requireY : paramList.tags}">
            <div class="article--data--placeholder">
                <p>Tags</p>
            </div>
            <div v-if="articleData.tags.length > 0" class="article--data--content article--data--content_tags">
                <span class="article--data--content_tags_tag" v-for="tag in articleData.tags">{{tag}}</span>
            </div>
            <div v-else class="article--data--content article--data--content_none">
                None found to scrape…
            </div>
        </div>

        <div class="article--data article--data_abstract">
            <div class="article--data--placeholder">
                <p>Abstract</p>
            </div>
            <div v-if="(articleData.abstract.split('').length > 0) && !(articleData.abstract === 'empty')" class="article--data--content article--data--content_abstract">
                {{articleData.abstract}}
            </div>
            <div v-else class="article--data--content article--data--content_none">
                No abstract found to scrape…
            </div>
        </div>

        <div class="article--data article--data_body" v-bind:class="{requireY : paramList.body}">
            <div class="article--data--placeholder">
                <p>Body</p>
            </div>
            <div v-if="articleType === 'source'" class="article--data--content article--data--content_body">
                <p class="article--data--content_body_paragraph" v-for="item in sourceBodyTextArray()">
                    {{item}}
                </p>
            </div>
            <div v-else class="article--data--content article--data--content_body">
                <p class="article--data--content_body_paragraph" v-for="item in articleData.body">
                    {{item}}
                </p>
            </div>
        </div>

        <div v-if="articleType != 'source'" class="article--data article--data_match_list">
            <div class="article--data--placeholder">
                <p>Matching vocabulary</p>
            </div>
            <div class="article--data--content article--data--content_match_list">
                <span class="article--data--content_match_list_word" v-for="word in articleData.vocabulary">{{word}}</span>
            </div>
        </div>

        <div v-if="articleData.refs.length > 0" class="article--data article--data_footnotes">
            <div class="article--data--placeholder">
                <p>Footnotes</p>
            </div>
            <ol class="article--data--content article--data--content_footnotes">
                <li class="article--data--content_footnotes_footnote" v-for="footnote in articleData.refs">{{footnote.split(/\d\. /g)[1]}}</li>
            </ol>
        </div>

        <div v-if="articleData.links.length > 0" class="article--data article--data_references">
            <div class="article--data--placeholder">
                <p>References</p>
            </div>
            <ul class="article--data--content article--data--content_references">
                <li class="article--data--content_references_reference" v-for="reference in articleData.links"><a :href="reference">{{reference.split("://")[1]}}</a></li>
            </ul>
        </div>

        <div v-if="articleData.images.length > 0" class="article--data article--data_images">
            <div class="article--data--placeholder">
                <p>Images</p>
            </div>
            <div class="article--data--content article--data--content_images">
                <img @click="showImageFullscreen($event)" class="article--data--content_images_image" v-for="image in articleData.images" :src="'' + baseUrl + '/' + image">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import serverBaseUrl from '../config.dp'

    export default {
        name: "article-comp",
        props: [
            "articleType",
            "articleInd",
            "articleData",
            "isMatch"
        ],
        data() {
            return {
                baseUrl: serverBaseUrl.serverBaseUrl
            }
        },
        computed: {
            scrollLock() {
                return this.$store.state.articlesStore.scrollLock
            },
            paramList() {
                return this.$store.state.articlesStore.listPar
            },
            matchArticleOnView() {
                return this.$store.state.articlesStore.matchArticleOnView
            },
        },
        methods: {
            ...mapGetters({
                sourceBodyTextArray: 'articlesStore/sourceBodyAsArray',
            }),
            getMonthFromString: function(timeStampString){
                const time = timeStampString.split("-").join(",").split("T").join(",").split(".").join(",").split(",");
                const year = time[0];
                const monthNum = time[1];
                const day = time[2];

                const months = {
                    '01':'Jan',
                    '02':'Feb',
                    '03':'Mar',
                    '04':'Apr',
                    '05':'May',
                    '06':'Jun',
                    '07':'Jul',
                    '08':'Aug',
                    '09':'Sep',
                    '10':'Oct',
                    '11':'Nov',
                    '12':'Dec'
                };

                return day + " " + months[monthNum] + " " + year;
            },
            showImageFullscreen: function(event){
                const modal = document.getElementById("modal");
                const modalGroup = document.getElementsByClassName("modal--group")[0];
                let img = event.target.cloneNode(true);
                img.classList.add("fullscreen");
                modal.classList.add("show");
                modal.classList.remove("hide");
                modalGroup.append(img);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .article {
        margin-top: 33px;
        &--data {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            transition: background-color 0.2s, height 1s;
            &:last-of-type {
                border-bottom: none;
            }
            &:hover {
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            }
            &--placeholder {
                font-size: $font-size-s;
                color: rgba(0, 0, 0, 0.4);
                margin: 0 $spacing/3;
                padding: $spacing/2;
                & p {
                    display: inline-block;
                }
                & svg {
                    display: inline-block;
                    fill: rgba(255, 87, 67, 0.6);
                    margin-left: 1px;
                    transform: rotate(0deg);
                    transition: transform 0.2s linear;
                    &:hover {
                        cursor: pointer;
                        margin-left: 2px;
                    }
                    &.active {
                        fill: rgba(255, 87, 67, 1);
                        transform: rotate(0deg);
                    }
                }
                & .console {
                    margin-left: $spacing;
                    margin-top: $spacing/2;
                    margin-right: $spacing;
                    color: rgba(0, 0, 0, 0.4);
                }
            }
            &--content {
                font-size: $font-size;
                color: rgba(0, 0, 0, 1);
                margin: $spacing/2 $spacing*1.5 $spacing*1.5 $spacing*1.5;
                padding: 0 $spacing/3;
                & .linkToOrigin {
                    color: rgba(0, 0, 0, 0.4);
                    text-decoration-line: none;
                    &:hover {
                        color: rgba(0, 0, 0, 1);
                        text-decoration-line: underline;
                        text-decoration-style: dotted;
                    }
                }
                &_none {
                    color: rgba(0, 0, 0, 0.2);
                }
                &_title {
                    font-size: $font-size-l;
                    font-weight: 500;
                    font-family: $font-stack-serif;
                }
                &_authors {
                    &_author {
                        &:after {
                            content: ', ';
                        }
                        &:last-of-type {
                            &:after {
                                content: ''
                            }
                        }
                    }
                }
                &_tags, &_match_list {
                    margin-bottom: $spacing*1.5-6;
                    &_tag, &_word {
                        background-color: rgba(0, 0, 0, 0.1);
                        padding: 3px 5px;
                        margin-right: 8px;
                        text-transform: capitalize;
                        border-radius: 2px;
                        display: inline-block;
                        margin-bottom: 6px;
                        &.similar {
                            background-color: rgba(255, 87, 67, 0.4);;
                        }
                    }
                }
                &_abstract {
                    line-height: 1.4em;
                }
                &_footnotes {
                    padding: 0 0 0 18px;
                    word-break: break-word;
                    &_footnote {

                    }
                }
                &_references {
                    list-style: none;
                    padding: 0;
                    word-break: break-word;
                    & a {
                        color: $charcoal;
                        text-decoration-line: none;
                        position: relative;
                        &:hover {
                            color: $black;
                        }
                    }
                }
                &_images {
                    &_image {
                        height: $spacing * 6;
                        margin-right: $spacing/2;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
                &_body {
                    & p {
                        font-family: $font-stack-serif;
                        line-height: 1.4em;
                        margin: 0 0 $line-height 0;

                        & .highlight {
                            background-color: yellow;
                            border-radius: 2px;
                        }
                    }
                }
            }
        }
    }
    .requireY {
        background-color: rgba(255, 87, 67, 0.05);
        border-bottom: 1px solid rgba(255, 87, 67, 0.5);
        transition: background-color 0.2s linear;
        &:last-of-type {
            border-bottom: none;
        }
        &:hover {
            border-bottom: 1px solid rgba(255, 87, 67, 1);
        }
        & .article--data--placeholder {
            color: $red;
        }
    }
    .article--matched .requireY {
        background-color: $white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s linear;
        &:last-of-type {
            border-bottom: none;
        }
        &:hover {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        & .article--data--placeholder {
            color: rgba(0, 0, 0, 0.4);
        }
    }
    .yesMatch .requireY {
        background-color: $white;
        border-bottom: 1px solid rgba(67, 207, 27, 0.5);
        & .article--data--placeholder {
            color: $green;
            & svg {
                fill: $green;
            }
        }
    }
</style>