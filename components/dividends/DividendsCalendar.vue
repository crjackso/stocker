<template>
  <client-only>
  <v-container>
    <v-row>
      <v-col>
        <v-calendar
          class="dividend-calendar"
          title-position="left"
          :attributes="calendarAttributes"
          @dayclick="onDayClick"
          @did-move="onMonthChange"
        />
      </v-col>
      <v-col>
        <dividends-month-log
          :mode="logDetailMode"
          :stock-dividend-logs="activeDividendLogs"
          :pay-date="activeModeDate"
          @close="onDividendDayLogClose"
        />
      </v-col>
    </v-row>
  </v-container>
</client-only>
</template>

<script setup>
import { parseDate, datesAreEqual, currentDate } from '~/lib/utils/date'
import { groupBy } from '~/lib/utils/general'

// Props
const props = defineProps({
  stockDividendLogs: {
    type: Array,
    required: true,
    default () {
      return []
    }
  }
})

// Data
const visibleCalendarDate = ref(currentDate().toDate())
const activeCalendarDate = ref(undefined)
const activeMonth = ref(currentDate().month())
const LogDetailModes = {
  month: 'month',
  day: 'day'
}
const logDetailMode = ref(LogDetailModes.month)

// Computed
const calendarAttributes = computed(() => {
  const attributes = [
    {
      highlight: 'stocker-green',
      dates: activeMonthPayDates.value
    }
  ]

  if (activeCalendarDate.value) {
    attributes.push({
      highlight: 'stocker-blue',
      dates: [activeCalendarDate.value]
    })
  }

  return attributes
})

const dividendLogsByMonth = computed(() => {
  if (!props.stockDividendLogs) return []

  return groupBy(
    props.stockDividendLogs,
    (log) => {
      return log.payDate ? parseDate(log.payDate).month() : -1
    }
  )
})

const activeDayDividendLogs = computed(() => {
  if (!activeCalendarDate.value) return []

  return activeMonthDividendLogs.value.filter((stockDividendLog) => {
    return datesAreEqual(stockDividendLog.payDate, activeCalendarDate.value)
  })
})

const activeMonthDividendLogs = computed(() => {
  return dividendLogsByMonth.value[activeMonth.value] || []
})

const activeDividendLogs = computed(() => {
  return logDetailMode.value === LogDetailModes.day ? activeDayDividendLogs.value : activeMonthDividendLogs.value
})

const activeModeDate = computed(() => {
  return activeCalendarDate.value || visibleCalendarDate.value
})

const activeMonthPayDates = computed(() => {
  return activeMonthDividendLogs.value?.map((log) => log.payDate) || []
})

// Methods
const onDayClick = (calendarDay) => {
  logDetailMode.value = LogDetailModes.day
  activeCalendarDate.value = calendarDay.date
}

const onMonthChange = (page) => {
  const selectedPage = page[0]
  const selectedMonth = selectedPage.month - 1
  visibleCalendarDate.value = new Date(selectedPage.year, selectedMonth, 1)
  activeMonth.value = selectedMonth
}

const onDividendDayLogClose = () => {
  logDetailMode.value = LogDetailModes.month
  activeCalendarDate.value = undefined
}
</script>

<style scoped lang="scss">
:deep(.dividend-calendar .vc-weekday) {
  color: var(--primary);

  &.vc-weekday-7,
  &.vc-weekday-1 {
    color: #cccccc;
  }
}

:deep(.vc-stocker-green) {
  --vc-accent-600: var(--secondary);
}

:deep(.vc-stocker-blue) {
  --vc-accent-600: var(--primary);
}
</style>
