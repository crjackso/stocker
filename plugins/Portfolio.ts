import portfolio from '~/portfolio.json'

export default defineNuxtPlugin(() => {
  return {
    provide: { portfolio }
  }
})
