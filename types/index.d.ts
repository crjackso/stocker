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

export interface StockDetailsAttrs {
  companyName: string
  ticker: string
  logoUrl: string
}

export interface StockDividendLogAttrs {
  ticker: string
  stockDetails: StockDetailsAttrs
  exDividendDate?: string
  payDate?: string
  cashAmount?: number
}

export type PortfolioDividendsResponse = {
  stockDividendLogs: StockDividendLogAttrs[]
}
