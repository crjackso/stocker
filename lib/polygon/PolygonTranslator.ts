import { IAggsPreviousClose, IDividendsResults } from "@polygon.io/client-js"

class PolygonTranslator {
  public previousClose(data: IAggsPreviousClose) {
    const mostRecentClose = data.results?.find(Boolean)

    return new StockPreviousClose({
      price: <number>mostRecentClose?.c,
      asOfDateUnix: <number>mostRecentClose?.t
    })
  }

  public dividends(data: IDividendsResults) {
    const mostRecentDividendLog = data.results?.find(Boolean)

    return new StockDividendLog({
      exDividendDate: mostRecentDividendLog?.ex_dividend_date,
      payDate: mostRecentDividendLog?.pay_date
    })
  }
}

export default PolygonTranslator
