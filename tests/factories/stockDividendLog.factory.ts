import { Factory } from 'fishery'
import type { StockDividendLog } from "~/types/stocks"
import stockFactory from '~/tests/factories/stock.factory'

const tickerSymbol = 'GOOG'

export default Factory.define<StockDividendLog>(({ }) => ({
  tickerSymbol,
  payDate: '3/9/2024',
  exDividendDate: '3/1/2024',
  cashAmount: 0.23,
  stock: stockFactory.build({
    tickerSymbol
  })
}))
