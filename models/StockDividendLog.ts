class StockDividendLog {
  constructor({ exDividendDate, payDate }: { exDividendDate?: string, payDate?: string }) {
    this.exDividendDate = exDividendDate
    this.payDate = payDate
  }

  exDividendDate: string | undefined
  payDate: string | undefined
}

export default StockDividendLog
