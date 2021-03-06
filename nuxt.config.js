import colors from 'vuetify/es5/util/colors'
import { internalIpV4 } from 'internal-ip'
export default async function () {
  const API_URL = process.env.API_URL || `http://${await internalIpV4()}:8000`
  return {
    head: {
      titleTemplate: '%s - school-frontend',
      title: 'school-frontend',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preload', as: 'image', href: '/logo.jpg' },
      ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/css/main.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/persistedState'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/vuetify
      '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      // https://go.nuxtjs.dev/pwa
      '@nuxtjs/pwa',
      // Nuxt Socket
      'nuxt-socket-io',
      // Client and server side cookies
      'cookie-universal-nuxt',
    ],
    io: {
      server: {
        cors: {
          origin: '*',
        },
      },
      sockets: [{ name: 'main', url: process.env.API_URL }],
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
      manifest: {
        lang: 'en',
      },
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
      icons: { iconfont: 'mdiSvg' },
      customVariables: ['~/assets/variables.scss'],
      theme: {
        themes: {
          dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3,
          },
        },
      },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    server: {
      host: '0.0.0.0',
    },
    publicRuntimeConfig: {
      apiURL: API_URL,
    },
  }
}
