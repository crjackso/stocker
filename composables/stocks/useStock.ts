import { type Stock } from "~/types/stocks"
import { toCurrency, toPercentage } from "~/utils/general"

const AssetTypes: Record<string, string> = {
  ETF: 'ETF',
  CommonStock: 'Common Stock'
}

export default function useStock (stock: Ref<Stock>) {
  const assetType = computed(() => {
    if (!stock.value?.assetType) return 'N/A'
    return AssetTypes[ stock.value.assetType ]
  })

  const previousClosePrice = computed(() => {
    return stock.value?.lastPrice
  })

  const previousClosePriceFormatted = computed(() => {
    return toCurrency(previousClosePrice.value)
  })

  const previousCloseAsOfDate = computed(() => {
    return stock.value?.lastPriceAsOfDate
  })

  const previousCloseAsOfDateFormatted = computed(() => {
    return formatDate(stock.value?.lastPriceAsOfDate)
  })

  const fiftyTwoWeekHigh = computed(() => {
    return stock.value?.fiftyTwoWeekHigh
  })

  const fiftyTwoWeekLow = computed(() => {
    return stock.value?.fiftyTwoWeekLow
  })

  const fiftyTwoWeekHighFormatted = computed(() => {
    return toCurrency(fiftyTwoWeekHigh.value)
  })

  const fiftyTwoWeekLowFormatted = computed(() => {
    return toCurrency(fiftyTwoWeekLow.value)
  })

  const percentageOff52WeekLow = computed(() => {
    if (!previousClosePrice.value || !fiftyTwoWeekLow.value) return 'N/A'
    return toPercentage(previousClosePrice.value / fiftyTwoWeekLow.value - 1)
  })

  const percentageOff52WeekHigh = computed(() => {
    if (!previousClosePrice.value || !fiftyTwoWeekHigh.value) return 'N/A'
    return toPercentage(1 - previousClosePrice.value / fiftyTwoWeekHigh.value)
  })

  return {
    assetType,
    fiftyTwoWeekHigh,
    fiftyTwoWeekHighFormatted,
    fiftyTwoWeekLow,
    fiftyTwoWeekLowFormatted,
    previousClosePrice,
    previousCloseAsOfDate,
    previousCloseAsOfDateFormatted,
    previousClosePriceFormatted,
    percentageOff52WeekHigh,
    percentageOff52WeekLow
  }
}