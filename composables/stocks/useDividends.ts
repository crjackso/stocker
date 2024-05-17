import _groupBy from 'lodash/groupBy'
import { LogDetailModes } from '~/models/LogDetailMode'
import { BooleanFilter, type Nullable } from '~/types'
import type { StockDividendLog } from '~/types/stocks'
import { currentDate, datesAreEqual, parseDate } from '~/utils/date'
import { toCurrency } from '~/utils/general'

export default function useDividends(
  dividendLogs: MaybeRef<StockDividendLog[]>
) {
  const logs = toRef(dividendLogs)
  const logDetailMode = ref(LogDetailModes.month)
  const visibleCalendarDate = ref(currentDate().toDate())
  const activeCalendarDate = ref<Date | undefined>(undefined)

  const forDate = (date: Nullable<Date>): StockDividendLog[] => {
    if (!date) return []

    return logs.value.filter((log) => {
      return datesAreEqual(log.payDate, date)
    })
  }

  const forMonth = (
    month: Nullable<number>,
    year: Nullable<number>
  ): StockDividendLog[] => {
    if (!month || !year) return []

    return logs.value.filter((log: StockDividendLog) => {
      if (!log) return false
      return (
        log.payDate?.getMonth() === month && log.payDate.getFullYear() === year
      )
    })
  }

  const totalCashAmount = computed((): string => {
    const totalAmount = logs.value.reduce((amount, log) => {
      amount += log.cashAmount || 0
      return amount
    }, 0)

    return toCurrency(totalAmount)
  })

  const groupedByMonth = () => {
    return _groupBy(logs.value, (log: StockDividendLog) => {
      return parseDate(log.payDate)?.month() || -1
    })
  }

  const groupedByDate = (): { [payDate: string]: StockDividendLog[] } => {
    return _groupBy(logs.value, (log: StockDividendLog) => {
      return log.payDate
    })
  }

  const sorted = (): StockDividendLog[] => {
    return logs.value.sort((log1: StockDividendLog, log2: StockDividendLog) => {
      return (<Date>log1.payDate).getTime() - (<Date>log2.payDate).getTime()
    })
  }

  const activeMonth = computed(() => {
    return visibleCalendarDate.value.getMonth()
  })

  const activeYear = computed(() => {
    return visibleCalendarDate.value.getFullYear()
  })

  const activeDayDividendLogs = computed(() => {
    return forDate(activeCalendarDate.value)
  })

  const activeMonthDividendLogs = computed(() => {
    return forMonth(activeMonth.value, activeYear.value)
  })

  const activeMonthPayDates = computed(() => {
    return payDates(activeMonthDividendLogs.value)
  })

  const payDates = (logs: StockDividendLog[]): Date[] => {
    return logs.map((log) => log.payDate).filter(BooleanFilter)
  }

  const activeDividendLogs = computed(() => {
    return logDetailMode.value === LogDetailModes.day
      ? activeDayDividendLogs.value
      : activeMonthDividendLogs.value
  })

  const activeModeDate = computed(() => {
    return activeCalendarDate.value || visibleCalendarDate.value
  })

  const hasDividends = computed(() => {
    return !!logs.value.length
  })

  const inDayMode = computed(() => {
    return logDetailMode.value === LogDetailModes.day
  })

  return {
    forDate,
    forMonth,
    logDetailMode,
    payDates,
    totalCashAmount,
    groupedByMonth,
    groupedByDate,
    sorted,
    activeCalendarDate,
    activeDayDividendLogs,
    activeDividendLogs,
    activeModeDate,
    activeMonthPayDates,
    activeMonthDividendLogs,
    hasDividends,
    inDayMode,
    visibleCalendarDate,
    logs
  }
}
