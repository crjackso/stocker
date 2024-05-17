export default defineNuxtPlugin({
  name: 'baseUrl',
  async setup() {
    const config = useRuntimeConfig()

    const baseURL = import.meta.server ?
      config.stockerApiUrl : config.public.stockerApiUrl

    return {
      provide: {
        baseURL
      }
    }
  }
})
