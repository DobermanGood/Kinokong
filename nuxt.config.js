module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Kinokong фильмы онлайн',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'kinokong - all movies in one site!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.7.4/tiny-slider.css' }
    ],
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.7.4/min/tiny-slider.js' },
    ]
  },

  css: [
    '~/assets/css/materialize.min.css',
    '~/assets/css/font-awesome.min.css',
    '~/assets/css/style.css',
    'swiper/dist/css/swiper.css',
    'video.js/dist/video-js.css'
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#ffeb3b' },
  // loading: 'components/pageLoader.vue',
  /*
  ** Build configuration
  */
  build: {

    vendor: [
      '~/assets/js/jquery-3.3.1.min.js',
      '~/assets/js/materialize.min.js',
      '~/assets/js/init.js',
      'axios',
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  modules: [
   '@nuxtjs/toast',
   '@nuxtjs/axios',
   '@nuxtjs/auth'
  ],

  toast: {
      position: 'top-right',
      duration: 2000,
  },

  // plugins: ['~plugins/vue-2-breadcrumbs'],
  plugins: [
    {src: '~plugins/api.js'},
    {src: '~plugins/vue-awesome-swiper', ssr: false},
    { src: '~plugins/nuxt-video-player-plugin.js', ssr: false }
  ],

  axios: {
    baseURL: 'http://localhost:8000'
  },

  auth: {
    redirect: {
      logout: '/',
      login: '/auth/login',
      // callback: '/auth/login',
      home: '/profile'
    },

    strategies: {
      laravel: {
        _scheme: "local",
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
            propertyName: "access_token",
            home: "/profile"
          },
          logout: false,
          user: {
            url: "/api/v1/user"
          }
        }
      },
    }
  },

  cache: true
}
