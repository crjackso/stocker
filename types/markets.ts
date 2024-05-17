export type MarketMover = {
  tickerSymbol: string
  companyName: string
  change: number
  price: number
  changesPercentage: number
}

export type MarketMoverResponse = {
  gainers: MarketMover[]
  losers: MarketMover[]
}
