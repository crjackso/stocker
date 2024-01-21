// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/styles/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: ['@nuxtjs/device'],
  build: {
    transpile: [
      'vuetify',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },
  runtimeConfig: {
    stockerApiUrl: 'http://api:3011'
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
    }
  },
  components: [
    '~/components',
    { path: '~/components/global/', pathPrefix: false, extensions: ['vue'] }
  ],
  imports: {
    dirs: ['models', 'lib']
  }
})
