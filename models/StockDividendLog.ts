import StockDetails from './StockDetails'
import type { StockDividendLogAttrs } from '~/types'
import { toDate, formatDate } from '~/utils/date'

class StockDividendLog {
  constructor({
    ticker,
    exDividendDate,
    payDate,
    stockDetails,
    cashAmount
  }: StockDividendLogAttrs) {
    this.ticker = ticker
    this.exDividendDate = toDate(exDividendDate)
    this.payDate = toDate(payDate)
    this.payDateFormatted = formatDate(payDate)
    this.cashAmount = cashAmount

    if (stockDetails) {
      this.stockDetails = new StockDetails(stockDetails)
    }
  }

  cashAmount: number | undefined
  exDividendDate: Date | undefined
  payDate: Date | undefined
  stockDetails?: StockDetails
  payDateFormatted: string | undefined
  ticker: string

  public name(): string {
    return this.stockDetails?.fullName() || this.ticker
  }
}

export default StockDividendLog
