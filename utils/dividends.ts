import type { StockDividendLog, Stock } from "~/types/stocks"

export const mapDividends = (dividends: StockDividendLog[]): StockDividendLog[] => {
  return dividends.map(dividend => mapDividend(dividend))
}

export const mapDividend = (dividend: StockDividendLog): StockDividendLog => {
  let stock: Stock | undefined = undefined

  if (dividend.stock) {
    stock = mapStock({ ...dividend.stock, tickerSymbol: dividend.tickerSymbol })
  }

  return {
    ...dividend,
    exDividendDate: formatDate(dividend.exDividendDate),
    cashAmount: Number(dividend.cashAmount),
    payDate: formatDate(dividend.payDate),
    stock
  }
}
