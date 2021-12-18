import path from 'path'

const resolve = (dir) => path.join(__dirname, dir)

export default {
  rootDir: process.cwd(),
  buildDir: process.cwd() + '/.nuxt/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'movie-vueapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vant/lib/index.css',
    '~/assets/global.less',
  ],

  styleResources: {
    less: [
      '~/assets/variable.less'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~plugins/lib-flexible",
      ssr: false 
    },
    "~plugins/services",
    // '@/plugins/axios',
    '~plugins/components',
    {
      src: "~plugins/upload",
      ssr: false 
    },
    '~plugins/swiper',
    '~plugins/isLogin',
    '~plugins/number',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-vuex-localstorage',
    "@nuxtjs/proxy"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix: '/',
    withCredentials: true,
    timeout: 30000,
    baseURL: process.env.baseUrl,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        "postcss-pxtorem": {
          rootValue: 37.5,
          remPrecision: 2,
          propsList: ["*"],
          // exclude: /node_modules|vant/i
        }
      },
      preset: {
        autoprefixer: true 
      }
    },
    transpile: [ /vant.*?less/ ], 
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            "style": (name) => {
              return `${name}/style/less.js`
            }
          },
          'vant'
        ]
      ]
    },
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `
              true; 
              @import "${resolve(
                "~/assets/variable.less"
              )}";
            `
          }
        }
      },
    },
  },
  server: {
    port: 4002,
    host: '0.0.0.0'
  },
  env: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://47.97.27.23' : 'http://47.97.27.23'
  },
  router: {
    base: process.env.NODE_ENV === "production" ? "/api/backend/movie5/" : "",
    middleware: ['auth']
  }
}
