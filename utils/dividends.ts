import _groupBy from 'lodash/groupBy'
import type { StockDividendLog } from '~/types/stocks'
import { toCurrency } from '~/utils/general'

export const payDates = (
  stockDividendLogs: StockDividendLog[]
): (Date | undefined)[] => {
  return stockDividendLogs
    .map((log: StockDividendLog) => {
      return log.payDate
    })
    .filter(Boolean)
}

export const totalCashAmount = (
  stockDividendLogs: StockDividendLog[]
): string => {
  const totalAmount = stockDividendLogs.reduce((amount, log) => {
    amount += log.cashAmount || 0
    return amount
  }, 0)

  return toCurrency(totalAmount)
}

export const groupedByDate = (
  stockDividendLogs: StockDividendLog[]
): { [payDate: string]: StockDividendLog[] } => {
  return _groupBy(stockDividendLogs, (log: StockDividendLog) => {
    return log.payDate
  })
}

export const forMonth = (
  stockDividendLogs: StockDividendLog[],
  month: number,
  year: number
): StockDividendLog[] => {
  return stockDividendLogs.filter((log: StockDividendLog) => {
    return (
      monthNumber(log.payDate) === month && getYear(log.payDate) === year
    )
  })
}

export const forDate = (
  stockDividendLogs: StockDividendLog[],
  date?: Date
): StockDividendLog[] => {
  if (!date) return []

  return stockDividendLogs.filter((log: StockDividendLog) => {
    return datesAreEqual(log.payDate, date)
  })
}
