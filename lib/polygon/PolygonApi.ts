import { IRestClient, restClient } from '@polygon.io/client-js'
import PolygonTranslator from './PolygonTranslator'
import StockApi from '~/lib/StockApi'
import * as secrets from '~/secrets.json'

// Polygon Stock Api
// https://github.com/polygon-io/client-js
class PolygonApi implements StockApi {
  constructor() {
    this.translator = new PolygonTranslator()
    if (!secrets.polygonApiKey) throw new Error('Please configure Polygon API key')
    this.rest = restClient(secrets.polygonApiKey)
  }

  private rest: IRestClient
  private translator: PolygonTranslator

  public async previousClose(ticker: string): Promise<StockPreviousClose> {
    if (!ticker) throw new Error('Please specify a ticker')

    console.log(`Fetching details for ticker ${ticker}`)
    try {
      const previousCloseData = await this.rest.stocks.previousClose(ticker)
      return this.translator.previousClose(previousCloseData)
    } catch (error) {
      console.error('An error happened:', error)
      throw error
    }
  }

  public async dividends(ticker: string): Promise<StockDividendLog> {
    if (!ticker) throw new Error('Please specify a ticker')

    console.log(`Fetching dividends for ticker ${ticker}`)
    try {
      const query = { ticker }
      const dividendData = await this.rest.reference.dividends(query)
      return this.translator.dividends(dividendData)
    } catch (error) {
      console.error('An error happened:', error)
      throw error
    }
  }
}

export default PolygonApi
