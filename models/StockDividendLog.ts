import { toDate } from "~/lib/utils/date"

class StockDividendLog {
  constructor(
    { exDividendDate,
      payDate,
      tickerSymbol
    }:
      {
        exDividendDate?: string,
        payDate?: string,
        tickerSymbol: string
      }
  ) {
    this.exDividendDate = toDate(exDividendDate)
    this.payDate = toDate(payDate)
    this.tickerSymbol = tickerSymbol
  }

  exDividendDate: Date | undefined
  payDate: Date | undefined
  tickerSymbol: string | undefined
}

export default StockDividendLog
