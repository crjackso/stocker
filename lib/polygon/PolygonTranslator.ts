import { IAggsPreviousClose, IDividendsResults } from "@polygon.io/client-js"
import * as secrets from '~/secrets.json' // TODO

class PolygonTranslator {
  public previousClose(data: IAggsPreviousClose) {
    const mostRecentClose = data.results?.find(Boolean)

    return new StockPreviousClose({
      price: <number>mostRecentClose?.c,
      asOfDateUnix: <number>mostRecentClose?.t
    })
  }

  public dividends(tickerSymbol: string, tickerDetails: any, data: IDividendsResults) {
    const mostRecentDividendLog = data.results?.find(Boolean)
    const stockDetails = this.stockDetails(tickerSymbol, tickerDetails)

    if (!mostRecentDividendLog?.ex_dividend_date) {
      return new StockDividendLog({
        tickerSymbol: tickerSymbol,
        stockDetails
      })
    } else {
      return new StockDividendLog({
        tickerSymbol,
        stockDetails,
        exDividendDate: mostRecentDividendLog.ex_dividend_date,
        payDate: mostRecentDividendLog.pay_date,
        cashAmount: mostRecentDividendLog.cash_amount
      })
    }
  }

  public stockDetails(tickerSymbol: string, tickerDetails: any) {
    return new StockDetails({
      companyName: tickerDetails.name,
      tickerSymbol: tickerSymbol,
      logoUrl: tickerDetails.branding?.logo_url?.concat(`?apiKey=${secrets.polygonApiKey}`)
    })
  }
}

export default PolygonTranslator
