module.exports = {
    // Headers of the page
    head: {
        title: 'Making it Public',
        meta: [
            { charset: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Making it Public comparison tool by Institute of Network cultures' }
        ],
        script: [
            { src: 'assets/scroll-plugin.Js', lang: 'javascript' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    // Styles
    css: [
        { src: 'assets/style/scroll-style.scss', lang: 'css' },
        { src: 'assets/style/global.scss', lang: 'scss' }
    ]
}