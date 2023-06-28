import { StockDividendLogAttrs } from '~/types'
import StockDetails from './StockDetails'
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
    this.stockDetails = new StockDetails(stockDetails)
    this.cashAmount = cashAmount
  }

  cashAmount: number | undefined
  exDividendDate: Date | undefined
  payDate: Date | undefined
  stockDetails: StockDetails
  payDateFormatted: string | undefined
  ticker: string | undefined
}

export default StockDividendLog
