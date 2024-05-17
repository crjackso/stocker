export default defineNuxtPlugin({
  name: 'api',
  dependsOn: ['baseUrl'],
  setup(nuxtApp) {
    const api = $fetch.create({
      baseURL: nuxtApp.$baseURL as string,
      onRequest({ request, options, error }) {
        // TODO
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          await navigateTo('/login')
        }
      }
    })

    return {
      provide: {
        api
      }
    }
  }
})
