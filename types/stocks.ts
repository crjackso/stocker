export type StockDetailsAttrs = {
  companyName: string
  ticker: string
  logoUrl: string
}

export type StockDividendLogAttrs = {
  ticker: string
  stockDetails?: StockDetailsAttrs
  exDividendDate?: string
  payDate?: string
  cashAmount?: number
}

export type PortfolioDividendsResponse = {
  stockDividendLogs: StockDividendLogAttrs[]
}

export type CompanyProfile = {
  tickerSymbol: string
  name: string
}

export type StockPreviousClose = {
  tickerSymbol: string
  lastPrice: number
  updatedAt: string
  fiftyTwoWeekLow?: number
  fiftyTwoWeekHigh?: number
  companyProfile?: CompanyProfile
}

export type StockDetails = {
  logoUrl: string
  companyName: string
  ticker: string
}

export type StockDividendLog = {
  tickerSymbol: string
  cashAmount?: number
  exDividendDate?: Date
  payDate: Date
  stockDetails?: StockDetails
}
