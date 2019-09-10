<template>
    <div class="parameters" v-bind:class="showParameters ? 'show' : 'hide'" v-on:click="toggleClass()">

        <p class="parameters_placeholder">Select the parameters on which the matches will be made.</p>

        <form action="" class="parameters_form">
            <div class="parameters_form--option">
                <input type="checkbox" name="articleParam1" value="title"> Title
            </div>

            <div class="parameters_form--option">
                <input type="checkbox" name="articleParam2" value="author"> Author
            </div>

            <div class="parameters_form--option">
                <input type="checkbox" name="articleParam3" value="tags"> Tags
            </div>

            <div class="parameters_form--option">
                <input type="checkbox" name="articleParam4" value="body"> Body text
            </div>

            <input type="submit" value="Get Matches">
        </form>
    </div>
</template>

<script>
    export default {
        name: "parameters",
        data() {
            return {
                showParameters: true
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
    @import "../assets/style/variables.scss";

    .parameters {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #7F828B;
        transition: top 0.33s ease;
        &_placeholder {
            font-size: $font-size-s;
        }
        &_form {
            &--option {
                float: left;
                display: inline-block;
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