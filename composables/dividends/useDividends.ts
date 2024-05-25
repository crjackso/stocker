import type { StockDividendLog } from "~/types/stocks"

export default function useDividends (logs: Ref<StockDividendLog[]>) {
  const totalCashAmount = computed((): string => {
    const totalAmount = logs.value.reduce((amount, log) => {
      amount += log.cashAmount || 0
      return amount
    }, 0)

    return toCurrency(totalAmount)
  })

  return {
    totalCashAmount
  }
}