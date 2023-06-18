import { $fetch, FetchOptions } from 'ohmyfetch'
import { defineNuxtPlugin } from '#app'
import StockModule from '~~/repository/modules/stock'
import { IApiInstance } from '~/types'

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.API_BASE_URL
  }

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions)

  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    stocks: new StockModule(apiFetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})
