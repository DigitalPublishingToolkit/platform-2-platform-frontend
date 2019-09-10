<template>
    <div class="main">
        <sidebar></sidebar>
        <nuxt/>
    </div>
</template>

<script>
    import sidebar from "~/components/sidebar"
    export default {
        name: "home",
        components: {
            sidebar
        }
    }
</script>

<style scoped>

</style>