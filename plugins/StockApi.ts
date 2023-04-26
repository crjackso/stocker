import PolygonApi from "~/lib/PolygonApi"
import StockApi from "~/lib/StockApi"

const stockApi: StockApi = new PolygonApi()

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      stockApi
    }
  }
})
