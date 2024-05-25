import useDividendsCalendar from '~/composables/dividends/useDividendsCalendar'
import stockDividendLogFactory from '~/tests/factories/stockDividendLog.factory'

const payDates = [ '2/3/2024', '1/2/2024', '11/3/2024', '12/1/2023' ]
const logs = payDates.map(payDate => stockDividendLogFactory.build({ payDate }))

describe('useDividendsCalendar', () => {
  const stockDividendLogs = ref(logs)

  describe('#activeCalendarDateFormatted', () => {
    it('returns the formatted string of `activeCalendarDate`', () => {
      const activeCalendarDate = ref(new Date('2024-02-09 00:00:00'))
      const { activeCalendarDateFormatted } = useDividendsCalendar(stockDividendLogs, activeCalendarDate)

      expect(activeCalendarDateFormatted.value).toEqual('2/9/2024')
    })
  })

  describe('#groupedByDate', () => {
    it('sorts groups by payDate in descending order', () => {
      const { groupedByDate } = useDividendsCalendar(stockDividendLogs)

      expect(Object.keys(groupedByDate.value)).toEqual([ '11/3/2024', '2/3/2024', '1/2/2024', '12/1/2023' ])
    })
  })

  describe('#activeMonthPayDates', () => {
    it('returns unique list of payDates for the current month of dividends', () => {
      const activeCalendarDate = ref(new Date('2024-02-09 00:00:00'))
      const visibleCalendarDate = ref(new Date('2/1/2024'))
      const { activeMonthPayDates } = useDividendsCalendar(stockDividendLogs, activeCalendarDate, visibleCalendarDate)

      expect(activeMonthPayDates.value).toEqual([ '2/3/2024' ])
    })
  })
})
