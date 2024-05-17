import _groupBy from 'lodash/groupBy'
import _uniq from 'lodash/uniq'
import { LogDetailModes } from '~/models/LogDetailMode'
import { type Nullable } from '~/types'
import type { StockDividendLog } from '~/types/stocks'
import { datesAreEqual, formatDate, monthYearMatch, parseDate } from '~/utils/date'

export default function useDividendsCalendar (
  logs: Ref<StockDividendLog[]>,
  activeCalendarDate: Ref<Date | undefined> = ref(undefined),
  visibleCalendarDate: Ref<Date | undefined> = ref(undefined)
) {
  const logDetailMode = ref(LogDetailModes.month)

  const forDate = (date: Date | string | undefined): StockDividendLog[] => {
    if (!date) return []

    return logs.value.filter((log) => {
      return datesAreEqual(log.payDate, date)
    })
  }

  const forMonth = (month?: number, year?: number): StockDividendLog[] => {
    if (!month || !year) return []
    return logs.value.filter((log: StockDividendLog) => monthYearMatch(log.payDate, month, year))
  }

  const groupedByDate = computed(() => {
    return _groupBy(sorted.value, (log: StockDividendLog) => {
      return formatDate(log.payDate)
    })
  })

  const sorted = computed(() => {
    return [ ...logs.value ].sort((log1: StockDividendLog, log2: StockDividendLog) => {
      return parseDate(log1.payDate)?.isBefore(parseDate(log2.payDate)) ? 1 : -1
    })
  })

  const activeMonth = computed(() => {
    return visibleCalendarDate.value?.getMonth()
  })

  const activeYear = computed(() => {
    return visibleCalendarDate.value?.getFullYear()
  })

  const activeCalendarDateFormatted = computed(() => {
    return formatDate(activeCalendarDate.value)
  })

  const activeDayDividendLogs = computed(() => {
    if (!activeCalendarDate?.value) return []

    return forDate(activeCalendarDate.value)
  })

  const activeMonthDividendLogs = computed(() => {
    return forMonth(activeMonth.value, activeYear.value)
  })

  const activeMonthPayDates = computed(() => {
    return _uniq(activeMonthDividendLogs.value.map((log) => log.payDate))
  })

  const activeDividendLogs = computed(() => {
    return logDetailMode.value === LogDetailModes.day
      ? activeDayDividendLogs.value
      : activeMonthDividendLogs.value
  })

  const activeModeDate = computed(() => {
    return activeCalendarDate.value || visibleCalendarDate.value || new Date()
  })

  const inDayMode = computed(() => {
    return logDetailMode.value === LogDetailModes.day
  })

  const hasDividends = computed(() => {
    return !!logs.value?.length
  })

  return {
    activeCalendarDate,
    activeCalendarDateFormatted,
    activeDividendLogs,
    activeModeDate,
    activeMonthPayDates,
    hasDividends,
    inDayMode,
    groupedByDate,
    logDetailMode,
    logs
  }
}
