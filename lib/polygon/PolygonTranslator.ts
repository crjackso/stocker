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
    const exDate = mostRecentDividendLog?.ex_dividend_date

    return new StockDividendLog(new Date(exDate as string))
  }
}

export default PolygonTranslator
