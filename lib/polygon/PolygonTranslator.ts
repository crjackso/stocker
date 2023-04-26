import { IAggsPreviousClose, IDividendsResults } from "@polygon.io/client-js"

class PolygonTranslator {
  public previousClose(data: IAggsPreviousClose) {
    const mostRecentClose = data.results?.find(Boolean)

    return new StockPreviousClose({
      price: <number>mostRecentClose?.c,
      asOfDateUnix: <number>mostRecentClose?.t
    })
  }

  public dividends(tickerSymbol: string, data: IDividendsResults) {
    const mostRecentDividendLog = data.results?.find(Boolean)

    if (!mostRecentDividendLog?.ex_dividend_date) {
      return new StockDividendLog({
        tickerSymbol: tickerSymbol
      })
    } else {
      return new StockDividendLog({
        tickerSymbol: <string>mostRecentDividendLog.ticker,
        exDividendDate: mostRecentDividendLog.ex_dividend_date,
        payDate: mostRecentDividendLog.pay_date
      })
    }
  }
}

export default PolygonTranslator
