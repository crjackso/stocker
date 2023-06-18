import StockPreviousClose from '~/models/StockPreviousClose'
import StockDividendLogs from '~/models/StockDividendLogs'
import StockModule from '~~/repository/modules/stock'

/* API Gateway for Stocker */
export interface IApiInstance {
  stocks: StockModule
}

export interface IError {
  error: string
}

export type DataPoint = {
  label: string
  text: string | bool | number | undefined
}
