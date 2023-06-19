import { toPercentage } from '~/utils/general'

describe('general', () => {
  describe('#toPercentage', () => {
    it('returns formatted percentage from number', () => {
      expect(toPercentage(0.09324)).toEqual('9%')
    })

    describe('with precision', () => {
      it('returns percentage with given precision', () => {
        expect(toPercentage(0.06823, 2)).toEqual('6.82%')
      })
    })
  })
})
