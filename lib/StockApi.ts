interface StockApi {
  previousClose: (ticker: string) => Promise<StockPreviousClose>
  portfolioDividends: () => Promise<StockDividendLog[]>
}

export default StockApi
