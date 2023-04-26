import PolygonApi from "~/lib/polygon/PolygonApi"
import StockApi from "~/lib/StockApi"

// const stockApi: StockApi = new PolygonApi()

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      stockApi: new PolygonApi(<string[]>nuxtApp.$portfolio)
    }
  }
})
