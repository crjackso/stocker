import { Factory } from 'fishery'
import type { Stock } from "~/types/stocks"

export default Factory.define<Stock>(({ }) => ({
  tickerSymbol: 'TGT',
  assetType: 'CommonStock',
  companyName: 'Target Corporation',
  lastPrice: 109.2,
  lastPriceAsOfDate: new Date('3/4/2024'),
  fiftyTwoWeekHigh: 123,
  fiftyTwoWeekLow: 98.24
}))
