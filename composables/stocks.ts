import { toPercentage } from '~/utils/general'

export const useStocks = () => {
  const percentageOff52WeekLow = (
    currentPrice: number | string | undefined,
    fiftyTwoWeekLow: number | string | undefined
  ): string | undefined => {
    if (!currentPrice || !fiftyTwoWeekLow) return undefined

    if (typeof currentPrice !== 'string') {
      currentPrice = currentPrice.toString()
    }

    if (typeof fiftyTwoWeekLow !== 'string') {
      fiftyTwoWeekLow = fiftyTwoWeekLow.toString()
    }

    return toPercentage(
      parseFloat(currentPrice) / parseFloat(fiftyTwoWeekLow) - 1
    )
  }

  const percentageOff52WeekHigh = (
    currentPrice: number | string | undefined,
    fiftyTwoWeekHigh: number | string | undefined
  ): string | undefined => {
    if (!currentPrice || !fiftyTwoWeekHigh) return undefined

    if (typeof currentPrice !== 'string') {
      currentPrice = currentPrice.toString()
    }

    if (typeof fiftyTwoWeekHigh !== 'string') {
      fiftyTwoWeekHigh = fiftyTwoWeekHigh.toString()
    }

    return toPercentage(
      1 - parseFloat(currentPrice) / parseFloat(fiftyTwoWeekHigh)
    )
  }

  return {
    percentageOff52WeekLow,
    percentageOff52WeekHigh
  }
}
