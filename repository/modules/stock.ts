import StockPreviousClose from '~/models/StockPreviousClose'
import StockDividendLogs from '~/models/StockDividendLogs'
import HttpFactory from '~/repository/factory'
import { IStockApi } from '~/types/Stocks'
import {
  IError,
  PortfolioDividendsResponse,
  StockDividendLogAttrs
} from '~/types'

class StockModule extends HttpFactory implements IStockApi {
  async previousClose(tickers: string): Promise<StockPreviousClose[]> {
    const response = await this.get<StockPreviousClose[] | IError>(
      'api/stocks',
      { tickers }
    )

    if ('error' in response) {
      throw new Error(response.error)
    }

    return response as StockPreviousClose[]
  }

  async portfolioDividends(tickers: string): Promise<StockDividendLogs> {
    const response = await this.get<PortfolioDividendsResponse>(
      'api/stocks/dividends',
      {
        tickers
      }
    )

    const { stockDividendLogs } = response
    return new StockDividendLogs({ stockDividendLogAttrs: stockDividendLogs })
  }
}

export default StockModule
