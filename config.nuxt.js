module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'Making it Public',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Making it Public comparison tool by Institute of Network cultures' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Styles
    */
    css: [
        { src: 'assets/style/global.scss', lang: 'scss' }
    ]
    /*
    ** Customize the progress bar color
    *
    loading: { color: '#fff' },
    *
    ** Custom loading page
    *
    loadingIndicator: '~/components/loading.html',
    *
     ** Plugins
    plugins: [
        { src: '~/plugins/vue-clazy-load.js', ssr: false },
        { src: '~/plugins/vue-prismic.js', ssr: false }
    ],
    loading: '~/components/loading.vue',
    *
    ** Generate routes dynamically
    *
    ** Build configuration

    build: {
        extend (config, { isDev, isClient }) {
            /*
            ** Allow Rich Text Fields

            config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
            config.resolve.extensions = ['*', '.js', '.vue', '.json']
            /*
            ** Run ESLint on save

            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
    */
}