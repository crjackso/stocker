import BaseApi from './BaseApi'
import StockPreviousClose from '~/models/StockPreviousClose'
import StockDividendLogs from '~/models/StockDividendLogs'
import type { IError, PortfolioDividendsResponse } from '~/types'
import type IStockApi from '~/types/IStockApi'

class StockApi extends BaseApi implements IStockApi {
  async previousClose(tickers: string): Promise<StockPreviousClose[]> {
    const response = await this.get<StockPreviousClose[] | IError>(
      '/api/stocks',
      {
        tickers
      }
    )

    if ('error' in response) {
      throw new Error(response.error)
    }

    return response as StockPreviousClose[]
  }

  async portfolioDividends(tickers: string): Promise<StockDividendLogs> {
    const response = await this.get<PortfolioDividendsResponse>(
      '/api/stocks/dividends',
      {
        tickers
      }
    )

    const { stockDividendLogs } = response
    return new StockDividendLogs({ stockDividendLogAttrs: stockDividendLogs })
  }
}

export default StockApi
