<template>
    <div class="article">
        <div class="article--data article--data_publisher">
            <div class="article--data--placeholder">
                <p>Publisher</p>
            </div>
            <div class="article--data--content article--data--content_publisher">
                {{articleData.publisher}}, <a class="linkToOrigin" v-bind:href="articleData.url" target="_blank">see article on website ↗</a>
            </div>
        </div>

        <div class="article--data article--data_title" ref="titleEle" v-bind:class="{requireY : paramList.title}" v-bind:style="{height: 'auto'}">
        <!--yesMatch : storeMatchArticles()[matchArticleOnView].isMatch-->
            <div class="article--data--placeholder">
                <p>Title</p>
                <svg class="console-carret" v-bind:class="{active : showConsole.title}" v-if="paramList.title && (articleType === 'match')" @click="showConsole.title = !showConsole.title" width="8" height="7" viewBox="0 -50 30 25">
                    <path d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path>
                </svg>
                <div v-if="showConsole.title" class="console">
                    This title overlaps [AMOUNT] with these words as closest match: [WORD 1], [WORD 2], [WORD 3]…
                </div>
            </div>
            <div class="article--data--content article--data--content_title">
                {{articleData.title}}
            </div>
        </div>

        <div class="article--data article--data_author" v-bind:class="{requireY : paramList.author}">
            <div class="article--data--placeholder">
                <p>Author</p>
                <svg class="console-carret" v-bind:class="{active : showConsole.author}" v-if="paramList.author && (articleType === 'match')" @click="showConsole.author = !showConsole.author" width="8" height="7" viewBox="0 -50 30 25">
                    <path d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path>
                </svg>
                <div v-if="showConsole.author" class="console">
                    The authors overlap by [AMOUNT] with this word as closest match: [WORD 1]
                </div>
            </div>
            <div class="article--data--content article--data--content_author">
                {{articleData.author}}
            </div>
        </div>

        <div class="article--data article--data_timestamp">
            <div class="article--data--placeholder">
                <p>Date</p>
            </div>
            <div v-if="articleData.mod.split('').length > 0" class="article--data--content article--data--content_timestamp">
                {{getMonthFromString(articleData.mod)}}
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Not found…
            </div>
        </div>

        <div class="article--data article--data_tags" v-bind:class="{requireY : paramList.tags}">
            <div class="article--data--placeholder">
                <p>Tags</p>
                <svg class="console-carret" v-bind:class="{active : showConsole.tags}" v-if="paramList.tags && (articleType === 'match')" @click="showConsole.tags = !showConsole.tags" width="8" height="7" viewBox="0 -50 30 25">
                    <path d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path>
                </svg>
                <div v-if="showConsole.tags" class="console">
                    This title overlaps [AMOUNT] with these words as closest match: [WORD 1], [WORD 2], [WORD 3]…
                </div>
            </div>
            <div v-if="articleData.tags.length > 0" class="article--data--content article--data--content_tags">
                <span class="article--data--content_tags_tag" v-for="tag in articleData.tags">{{tag}}</span>
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Not found…
            </div>
        </div>

        <div class="article--data article--data_abstract">
            <div class="article--data--placeholder">
                <p>Abstract</p>
            </div>
            <div v-if="articleData.abstract.split('').length > 0" class="article--data--content article--data--content_abstract">
                {{articleData.abstract}}
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Not found…
            </div>
        </div>

        <div class="article--data article--data_images">
            <div class="article--data--placeholder">
                <p>Images</p>
            </div>
            <div v-if="articleData.images.length > 0" class="article--data--content article--data--content_images">
                <img class="article--data--content_images_image" v-for="image in articleData.images" :src="'https://mhp.andrefincato.info/' + image">
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Not found…
            </div>
        </div>

        <div class="article--data article--data_body" v-bind:class="{requireY : paramList.body}">
            <div class="article--data--placeholder">
                <p>Body</p>
                <svg class="console-carret" v-bind:class="{active : showConsole.body}" v-if="paramList.body && (articleType === 'match')" @click="showConsole.body = !showConsole.body" width="8" height="7" viewBox="0 -50 30 25">
                    <path d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path>
                </svg>
                <div v-if="showConsole.body" class="console">
                    This title overlaps [AMOUNT] with these words as closest match: [WORD 1], [WORD 2], [WORD 3]…
                </div>
            </div>
            <div v-if="articleType === 'source'" class="article--data--content article--data--content_body">
                <p class="article--data--content_body_paragraph" v-for="item in sourceBodyTextArray()">
                    {{item}}
                </p>
            </div>
            <div v-else class="article--data--content article--data--content_body">
                <p class="article--data--content_body_paragraph" v-for="item in getRightMatchArticle(articleInd)">
                    {{item}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

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
                showConsole: {
                    title: false,
                    author: false,
                    tags: false,
                    body: false,
                }
            }
        },
        computed: {
            scrollLock() {
                return this.$store.state.articlesStore.scrollLock
            },
            paramList() {
                return this.$store.state.articlesStore.listPar
            },
            biggestHeights() {
                return this.$store.state.cellHeights.largestHeights
            },
            matchArticleOnView() {
                return this.$store.state.articlesStore.matchArticleOnView
            },
        },
        mounted() {
            // console.log(this.$refs.titleEle.clientHeight);
            // this.adjustH({key: 'title', amount: this.$refs.titleEle.clientHeight + 1});
        },
        methods: {
            checkIfMatch() {
                if(isNaN(matchArticleOnView)) {
                    return false
                }
            },
            storeMatchArticles() {
                return this.$store.state.articlesStore.matchArticles
            },
            getRightMatchArticle: function(index) {
                switch(index) {
                    case 0:
                        // console.log(this.matchBodyTextArray_1());
                        return this.matchBodyTextArray_1();
                        break;
                    case 1:
                        return this.matchBodyTextArray_2();
                        break;
                    case 2:
                        return this.matchBodyTextArray_3();
                        break;
                }
            },
            ...mapGetters({
               sourceBodyTextArray: 'articlesStore/sourceBodyAsArray',
                matchBodyTextArray_1: 'articlesStore/matchBodyAsArray_1',
                matchBodyTextArray_2: 'articlesStore/matchBodyAsArray_2',
                matchBodyTextArray_3: 'articlesStore/matchBodyAsArray_3'
            }),
            ...mapActions({
                adjustH: 'cellHeights/changeHeight'
            }),
            getMonthFromString: function(timeStampString){
                const time = timeStampString.split("-").join(",").split("T").join(",").split(".").join(",").split(",");
                // console.log(time);
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
                    /*display: inline-block;*/
                    /*float: right;*/
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
                &_tags {
                    margin-bottom: $spacing*1.5-6;
                    &_tag {
                        background-color: rgba(0, 0, 0, 0.1);
                        padding: 3px 5px;
                        margin-right: 8px;
                        text-transform: capitalize;
                        border-radius: 2px;
                        display: inline-block;
                        margin-bottom: 6px;
                    }
                }
                &_abstract {
                    line-height: 1.4em;
                }
                &_images {
                    &_image {
                        height: $spacing * 6;
                    }
                }
                &_body {
                    & p {
                        font-family: $font-stack-serif;
                        line-height: 1.4em;
                        margin: 0 0 $line-height 0;
                    }
                }
            }
        }
    }

    .requireY {
        background-color: rgba(255, 87, 67, 0.1);
        border-bottom: 1px solid rgba(255, 87, 67, 0.5);
        transition: background-color 0.2s linear;
        &:hover {
            border-bottom: 1px solid rgba(255, 87, 67, 1);
        }
        & .article--data--content_tags_tag {
            background-color: rgba(255, 87, 67, 0.6);
        }
        & .article--data--placeholder {
            color: $red;
        }
        &.yesMatch {
            background-color: rgba(67, 207, 27, 0.1);
            border-bottom: 1px solid rgba(67, 207, 27, 0.5);
            & .article--data--placeholder {
                color: $green;
                & svg {
                    fill: $green;
                }
            }
        }
    }
</style>