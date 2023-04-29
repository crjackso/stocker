interface StockApi {
  previousClose: (ticker: string) => Promise<StockPreviousClose>
  portfolioDividends: () => Promise<StockDividendLogs>
}

export default StockApi
