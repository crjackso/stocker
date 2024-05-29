import type { Stock } from "~/types/stocks"

export const mapStocks = (stocks: Stock[]): Stock[] => {
  return stocks.reduce((mapped: Stock[], stock) => {
    const mappedStock = mapStock(stock)
    if (mappedStock) {
      mapped.push(mappedStock)
    }
    return mapped
  }, [])
}

export const mapStock = (stock: Stock | undefined): Stock | undefined => {
  if (!stock) return

  return {
    ...stock,
    lastPriceAsOfDate: toDate(stock.lastPriceAsOfDate),
    lastPrice: Number(stock.lastPrice),
    title: `${stock.companyName} (${stock.tickerSymbol})`
  }
}