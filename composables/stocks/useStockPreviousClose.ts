import type { StockPreviousClose } from "~/types/stocks";

export default function useStockPreviousClose(stockPreviousClose: Ref<StockPreviousClose>) {
  const companyName = computed(() => {
    return stockPreviousClose.value.companyProfile?.name
  })

  const lastClosePrice = computed(() => {
    return toCurrency(stockPreviousClose.value.lastPrice)
  })

  const asOfDate = computed(() => {
    return formatDate(stockPreviousClose.value.updatedAt)
  })

  return {
    asOfDate,
    lastClosePrice,
    companyName
  }
}
