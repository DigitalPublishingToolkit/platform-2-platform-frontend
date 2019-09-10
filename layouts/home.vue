<template>
    <div class="main">
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
        }
    }
</script>

<style lang="scss" scoped>

</style>