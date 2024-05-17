import type { StockDividendLog } from "~/types/stocks"

export default function useDividend (dividendLog: Ref<StockDividendLog>) {
  const payDateFormatted = computed(() => {
    return formatDate(dividendLog.value.payDate)
  })

  return {
    payDateFormatted
  }
}