<template>
    <div class="parameters" v-bind:class="showParameters ? 'show' : 'hide'">

        <p class="parameters_placeholder">Parameters for match criteria</p>

        <form action="" class="parameters_form">
            <div class="parameters_form--option">
                <label for="title">Title</label>
                <input type="checkbox" id="title" value="title" v-model="checkedParam">
            </div>

            <div class="parameters_form--option">
                <label for="author">Author</label>
                <input type="checkbox" id="author" value="author" v-model="checkedParam">
            </div>

            <div class="parameters_form--option">
                <label for="tags">Tags</label>
                <input type="checkbox" id="tags" value="tags" v-model="checkedParam">
            </div>

            <div class="parameters_form--option">
                <label for="body">Body text</label>
                <input type="checkbox" id="body" value="body" v-model="checkedParam">
            </div>

            <input class="parameters_form--submit" type="submit" value="Get Matches">
        </form>
    </div>
</template>

<script>
    export default {
        name: "parameters",
        data() {
            return {
                showParameters: true,
                checkedParam: []
            }
        },
        methods: {
            toggleClass: function() {
                this.showParameters = !this.showParameters;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .parameters {
        font-family: $font-stack;
        font-size: $font-size;
        line-height: $line-height;
        font-weight: $regular;
        /*text-transform: uppercase;*/
        /*letter-spacing: 0.1px;*/

        width: 100%;
        height: auto;

        position: fixed;

        top: 0;
        left: 0;

        color: rgba(0, 0, 0, 1);
        background-color: rgba(255, 255, 255, 1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        transition: top 0.33s ease;

        &_placeholder {
            font-size: $font-size;
            font-weight: $regular;
            display: inline-block;

            padding: $spacing;

            color: rgba(0, 0, 0, 0.6);

            float: left;
        }
        &_form {
            display: inline-block;
            &--option {
                float: left;
                display: inline-block;

                margin: $spacing $spacing/2;
            }
            &--submit {
                font-family: $font-stack;
                font-size: $font-size;
                line-height: $line-height;
                font-weight: $regular;

                background-color: transparent;
                outline: none;
                border-top: none;
                border-bottom: none;
                border-left: 1px solid rgba(0, 0, 0, 0.2);
                border-right: 1px solid rgba(0, 0, 0, 0.2);

                display: inline-block;

                padding: $spacing $spacing/2;
                margin: 0 $spacing/2;

                &:hover {
                    cursor: pointer;
                    color: rgba(255, 127, 127, 1);
                }
            }
        }
    }

    .show {
        top: 0;
    }

    .hide {
        top: -88px;
    }
</style>