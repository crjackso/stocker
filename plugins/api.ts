import StockApi from '~/apis/StockApi'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: {
        stocks: new StockApi()
      }
    }
  }
})
