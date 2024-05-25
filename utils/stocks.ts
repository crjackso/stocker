import type { Stock } from "~/types/stocks"

export const mapStocks = (stocks: Stock[]): (Stock | undefined)[] => {
  return stocks?.map(mapStock) || []
}

export const mapStock = (stock: Stock | undefined): Stock | undefined => {
  if (!stock) return

  return {
    ...stock,
    lastPriceAsOfDate: toDate(stock.lastPriceAsOfDate),
    lastPrice: Number(stock.lastPrice),
    title: `${ stock.companyName } (${ stock.tickerSymbol })`
  }
}