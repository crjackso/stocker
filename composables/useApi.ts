import type { StockerFetchOptions } from '~/types'

export function useAPI<T>(
  url: string | (() => string),
  options: StockerFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api
  })
}