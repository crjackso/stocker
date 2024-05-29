export type Stock = {
  tickerSymbol: string
  companyName: string
  title?: string
  lastPrice: number
  lastPriceAsOfDate: Date | undefined
  updatedAt?: Date | undefined
  fiftyTwoWeekLow?: number
  fiftyTwoWeekHigh?: number
  logoUrl?: string
  assetType: string
}

export type StockDetails = {
  logoUrl: string
  companyName: string
  ticker: string
}

export type StockDividendLog = {
  tickerSymbol: string
  cashAmount?: number
  exDividendDate?: string
  payDate: string
  stock?: Stock
}

export type Portfolio = {
  title: string
  userId: number
  user?: typeof User
  createdAt?: Date
  stocks?: Stock[]
}
