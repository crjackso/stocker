import CompanyProfile from './CompanyProfile'
import { toCurrency } from '~/utils/general'

class StockPreviousClose {
  constructor({
    ticker,
    price,
    asOfDate,
    fiftyWeekLow,
    fiftyWeekHigh,
    companyProfile
  }: {
    ticker: string
    price: number
    asOfDate: string
    fiftyWeekLow?: number
    fiftyWeekHigh?: number
    companyProfile?: CompanyProfile
  }) {
    this.ticker = ticker
    this.price = price
    this.fiftyWeekLow = fiftyWeekLow
    this.fiftyWeekHigh = fiftyWeekHigh
    this.companyProfile = companyProfile
    this.asOfDate = asOfDate

    this.priceFormatted = toCurrency(price)
    this.fiftyWeekLowFormatted = this.fiftyWeekLow
      ? toCurrency(fiftyWeekLow)
      : undefined
    this.fiftyWeekHighFormatted = this.fiftyWeekHigh
      ? toCurrency(fiftyWeekHigh)
      : undefined
  }

  ticker: string
  price: number
  priceFormatted: string
  asOfDate: string
  fiftyWeekLow?: number
  fiftyWeekHigh?: number
  fiftyWeekLowFormatted?: string
  fiftyWeekHighFormatted?: string
  companyProfile?: CompanyProfile
}

export default StockPreviousClose
