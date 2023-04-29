import { toDate, formatDate } from "~/lib/utils/date"
import StockDetails from "./StockDetails"

class StockDividendLog {
  constructor(
    {
      tickerSymbol,
      exDividendDate,
      payDate,
      stockDetails
    }:
      {
        tickerSymbol: string,
        exDividendDate?: string,
        payDate?: string,
        stockDetails: StockDetails
      }
  ) {
    this.tickerSymbol = tickerSymbol
    this.exDividendDate = toDate(exDividendDate)
    this.payDate = toDate(payDate)
    this.payDateFormatted = formatDate(payDate)
    this.stockDetails = stockDetails
  }

  exDividendDate: Date | undefined
  payDate: Date | undefined
  stockDetails: StockDetails
  payDateFormatted: string | undefined
  tickerSymbol: string | undefined
}

export default StockDividendLog
