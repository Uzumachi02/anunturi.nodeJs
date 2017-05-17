module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/jquery-3.2.1.min.js', type: 'text/javascript' },
      { src: '/js/materialize.min.js', type: 'text/javascript' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css', '~assets/libs/materialize/css/materialize.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
     ** Run ESLINT on save

    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
     */
  }
  // plugins: [{src: '~plugins/vue-select', ssr: false}]
}
