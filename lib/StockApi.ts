interface StockApi {
  previousClose: (ticker: string) => Promise<StockPreviousClose>
  dividends: (ticker: string) => Promise<StockDividendLog>
}

export default StockApi
