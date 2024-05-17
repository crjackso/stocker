import { useStocks } from '~/composables/stocks/useStocks'

describe('useStocks', () => {
  describe('#percentageOff52WeekLow', () => {
    it('returns percentage off yearly low', () => {
      const price = '10'
      const low = 7.5

      const { percentageOff52WeekLow } = useStocks()

      expect(percentageOff52WeekLow(price, low)).toEqual('33%')
    })
  })

  describe('#percentageOff52WeekHigh', () => {
    it('returns percentage off yearly high', () => {
      const price = 10
      const high = 12.5

      const { percentageOff52WeekLow } = useStocks()

      expect(percentageOff52WeekLow(price, high)).toEqual('-20%')
    })
  })
})
