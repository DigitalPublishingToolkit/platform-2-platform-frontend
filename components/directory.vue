<template>
    <div class="directory">
        <div class="directory_wrapper">
            <div class="directory_wrapper_article" v-for="article in fullArticleList">
                <div class="directory_wrapper_article--title">{{ article.title }}</div>
                <div class="directory_wrapper_article--title">{{ article.author }}</div>
                <div class="directory_wrapper_article--title">{{ article.timestamp }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "directory",
        data: {
            fullArticleList: [
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19" },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  },
                { title: "The Big Gatsby", author: "Roland Rietveld", timestamp: "08/09/19"  }
            ]
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/variables.scss";

    .directory {
        position: fixed;
        height: 100%;
        width: 20%;
        top: 0;
        left: 0;
        overflow: hidden;
        &_wrapper {
            &_article {
                font-size: $font-size-s;
                &--title {
                    font-weight: bold;
                }
            }
        }
    }
</style>