import StockPreviousClose from '~/models/StockPreviousClose'
import StockDividendLogs from '~/models/StockDividendLogs'

export default interface IStockApi {
  previousClose: (ticker: string) => Promise<StockPreviousClose[]>
  portfolioDividends: (ticker: string) => Promise<StockDividendLogs>
}
