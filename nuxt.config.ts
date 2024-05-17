import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/styles/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/device',
    'nuxt-graphql-request',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config?.plugins?.push(vuetify({ autoImport: true }))
      })
    }
  ],
  build: {
    transpile: [
      'vuetify',
      'nuxt-graphql-request',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },
  runtimeConfig: {
    stockerApiUrl: 'http://api:3011',
    public: {
      stockerApiUrl: 'http://stocker.localhost/api',
      graphql: {
        clients: {
          default: {
            endpoint: 'http://stocker.localhost/api/graphql'
          }
        }
      }
    }
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/colors.scss" as *;'
        }
      }
    },
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  components: [
    '~/components',
    { path: '~/components/global/', pathPrefix: false, extensions: ['vue'] }
  ],
  imports: {
    dirs: ['models', 'lib']
  },
  alias: {
    // https://github.com/Gomah/nuxt-graphql-request/issues/56
    'cross-fetch': 'cross-fetch/dist/browser-ponyfill.js'
  },
  eslint: {
    config: {
      stylistic: true
    }
  }
})