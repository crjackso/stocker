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
    this.exDividendDate = exDividendDate
    this.payDate = payDate
    this.tickerSymbol = tickerSymbol
  }

  exDividendDate: string | undefined
  payDate: string | undefined
  tickerSymbol: string | undefined
}

export default StockDividendLog
