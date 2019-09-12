<template>
    <div class="article">
        <div class="article--data article--data_publisher">
            <div class="article--data--placeholder">
                <p>Publisher</p>
            </div>
            <div class="article--data--content article--data--content_publisher">
                {{articlePublisher}} <a class="linkToOrigin" v-bind:href="articleUrl" target="_blank">go to article ↗</a>
            </div>
        </div>

        <div class="article--data article--data_title" v-bind:class="{requireY : paramList.title}">
            <div class="article--data--placeholder">
                <p>Title</p>
            </div>
            <div class="article--data--content article--data--content_title">
                {{articleTitle}}
            </div>
        </div>

        <div class="article--data article--data_author" v-bind:class="{requireY : paramList.author}">
            <div class="article--data--placeholder">
                <p>Author</p>
            </div>
            <div class="article--data--content article--data--content_author">
                {{articleAuthor}}
            </div>
        </div>

        <div class="article--data article--data_timestamp">
            <div class="article--data--placeholder">
                <p>Date</p>
            </div>
            <div v-if="articleTimestamp.split('').length > 0" class="article--data--content article--data--content_timestamp">
                {{getMonthFromString(articleTimestamp)}}
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Not found…
            </div>
        </div>

        <div class="article--data article--data_tags" v-bind:class="{requireY : paramList.tags}">
            <div class="article--data--placeholder">
                <p>Tags</p>
            </div>
            <div v-if="articleTags[0].split('').length > 0" class="article--data--content article--data--content_tags">
                <span class="article--data--content_tags_tag" v-for="tag in articleTags">{{tag}}</span>
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Not found…
            </div>
        </div>

        <div class="article--data article--data_abstract">
            <div class="article--data--placeholder">
                <p>Abstract</p>
            </div>
            <div v-if="articleAbstract > 0" class="article--data--content article--data--content_abstract">
                {{articleAbstract}}
            </div>
            <div v-else class="article--data--content article--data--content_none">
                Not found…
            </div>
        </div>

        <div class="article--data article--data_body" v-bind:class="{requireY : paramList.body}">
            <div class="article--data--placeholder">
                <p>Body</p>
                <svg width="8" height="7" viewBox="0 -50 30 25">
                    <path d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path>
                </svg>
            </div>
            <div class="article--data--content article--data--content_body">
                {{articleBody}}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        name: "article-comp",
        props: [
            "articleType",
            "articleUrl",
            "articleTitle",
            "articlePublisher",
            "articleAuthor",
            "articleTimestamp",
            "articleTags",
            "articleAbstract",
            "articleBody"
        ],
        computed: {
            paramList() {
                return this.$store.state.parametersStore.listPar
            },
            sourceHeights() {
                return this.$store.state.cellHeights.cellsSourceHeights
            },
            matchHeights() {
                return this.$store.state.cellHeights.cellsMatchHeights
            }
        },
        mounted() {
            console.log(document.getElementsByClassName("article--data_publisher")[0].clientHeight);
            this.adjustH(this.articleType, "publisher", document.getElementsByClassName("article--data_publisher")[0].clientHeight);
        },
        methods: {
            ...mapMutations({
                adjustH: 'cellHeights/adjustHeight'
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

            &--placeholder {
                font-size: $font-size-s;
                color: rgba(0, 0, 0, 0.4);
                padding: $spacing/2;
                & p {
                    display: inline-block;
                }
                & svg {
                    display: inline-block;
                    fill: rgba(0, 0, 0, 0.3);
                    margin-left: 1px;
                }
            }
            &--content {
                font-size: $font-size;
                color: rgba(0, 0, 0, 1);
                margin: $spacing/2 $spacing*1.5 $spacing*1.5 $spacing*1.5;

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
                }
                &_body {
                    & p {
                        margin: 0 0 $line-height 0;
                    }
                }
            }
        }
    }

    .requireY {
        background-color: rgba(255, 127, 127, 0.1);
        border-bottom: 1px solid rgba(255, 127, 127, 0.5);
        transition: background-color 0.2s linear;
    }
</style>