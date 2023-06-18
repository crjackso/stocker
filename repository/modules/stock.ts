import StockPreviousClose from '~/models/StockPreviousClose'
import StockDividendLogs from '~/models/StockDividendLogs'
import HttpFactory from '~/repository/factory'
import { IStockApi } from '~/types/Stocks'
import { IError } from '~/types'

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

  async portfolioDividends(): Promise<StockDividendLogs> {
    return await this.get<StockDividendLogs>('api/dividends')
  }
}

export default StockModule
