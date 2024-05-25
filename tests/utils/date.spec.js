import { toDate, datesAreEqual, monthName } from '~/utils/date'

describe('date', () => {
  describe('#toDate', () => {
    it('returns Date instance from string', () => {
      const date = toDate('2024-05-16T00:00:00.000Z')
      const isDate = Object.prototype.toString.call(date) === '[object Date]'

      expect(isDate).toBeTruthy()
    })
  })

  describe('#monthName', () => {
    it('returns the full month name associated with the given date', () => {
      expect(monthName('4/2/2024')).toEqual('April')
    })
  })

  describe('#datesAreEqual', () => {
    describe('when either of the dates are undefined', () => {
      it('returns false', () => {
        expect(datesAreEqual(new Date('4/1/2024 11:24:00PM'), undefined)).toBeFalsy()
        expect(datesAreEqual(undefined, new Date('4/1/2024 11:24:00PM'))).toBeFalsy()
      })
    })

    describe('when dates have the same month and year', () => {
      it('returns true', () => {
        expect(datesAreEqual(new Date('4/1/2024 11:24:00PM'), new Date('4/1/2024:T00:00:00Z'))).toBeTruthy()
      })
    })
  })
})