import StockPreviousClose from '~/models/StockPreviousClose'
import StockDividendLogs from '~/models/StockDividendLogs'
import StockModule from '~~/repository/modules/stock'

export interface IStockApi {
  previousClose: (ticker: string) => Promise<StockPreviousClose[]>
  portfolioDividends: (ticker: string) => Promise<StockDividendLogs>
}
