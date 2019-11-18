<template>
    <div class="main">
        <div id="modal" class="hide">
            <div class="modal--group" @click="closeModal()">
                <div class="modal--group_remove" @click="closeModal()">[close]</div>
            </div>
        </div>
        <parameters></parameters>
        <nuxt/>
    </div>
</template>

<script>
    import parameters from "~/components/parameters"

    export default {
        name: "home",
        components: {
            parameters
        },
        methods: {
            closeModal: function(){
                const modal = document.getElementById("modal");
                const modalGroup = document.getElementsByClassName("modal--group")[0];
                modalGroup.childNodes[1].remove();
                modal.classList.remove("show");
                modal.classList.add("hide");
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/style/global.scss";
    @import "../assets/style/variables.scss";

    .main, body {
        background-color: $charcoal;
    }

    #modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.85);
        &.hide {
            display: none;
        }
        &.show {
            display: flex;
        }
        & .modal--group {
            margin: auto;
            width: auto;
            &_remove {
                color: $white;
                margin-bottom: $spacing/4;
                font-size: $font-size-s;
                &:hover {
                    cursor: pointer;
                }
            }
            & img.fullscreen {
                height: 60vh;
                width: auto;
                max-width: 80vw;
            }
        }
    }
</style>