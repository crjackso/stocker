import useStock from '~/composables/stocks/useStock'
import stockFactory from '~/tests/factories/stock.factory'

describe('useStock', () => {
  describe('#assetType', () => {
    describe('when stock is undefined', () => {
      it('is N/A', () => {
        const { assetType } = useStock(ref(undefined))
        expect(assetType.value).toEqual('N/A')
      })
    })

    describe('when stock is defined', () => {
      it('is human readable form of asset type', () => {
        const { assetType } = useStock(ref(stockFactory.build()))
        expect(assetType.value).toEqual('Common Stock')
      })
    })
  })

  describe('percentageOff52WeekHigh', () => {
    it('calculates the percentage off of the fifty-two week high', () => {
      const stock = stockFactory.build({ lastPrice: 93.29, fiftyTwoWeekHigh: 94.14 })
      const { percentageOff52WeekHigh } = useStock(ref(stock))

      expect(percentageOff52WeekHigh.value).toEqual('1%')
    })

    describe('when previousClosePrice is undefined', () => {
      it('is N/A', () => {
        const stock = stockFactory.build({ lastPrice: null })
        const { percentageOff52WeekHigh } = useStock(ref(stock))

        expect(percentageOff52WeekHigh.value).toEqual('N/A')
      })
    })

    describe('when fiftyTwoWeekHigh is undefined', () => {
      it('is N/A', () => {
        const stock = stockFactory.build({ fiftyTwoWeekHigh: null })
        const { percentageOff52WeekHigh } = useStock(ref(stock))

        expect(percentageOff52WeekHigh.value).toEqual('N/A')
      })
    })
  })

  describe('percentageOff52WeekLow', () => {
    it('calculates the percentage off of the fifty-two week low', () => {
      const stock = stockFactory.build({ lastPrice: 93.29, fiftyTwoWeekLow: 69.96 })
      const { percentageOff52WeekLow } = useStock(ref(stock))

      expect(percentageOff52WeekLow.value).toEqual('33%')
    })

    describe('when previousClosePrice is undefined', () => {
      it('is N/A', () => {
        const stock = stockFactory.build({ lastPrice: null })
        const { percentageOff52WeekLow } = useStock(ref(stock))

        expect(percentageOff52WeekLow.value).toEqual('N/A')
      })
    })

    describe('when fiftyTwoWeekLow is undefined', () => {
      it('is N/A', () => {
        const stock = stockFactory.build({ fiftyTwoWeekLow: null })
        const { percentageOff52WeekLow } = useStock(ref(stock))

        expect(percentageOff52WeekLow.value).toEqual('N/A')
      })
    })
  })
})
