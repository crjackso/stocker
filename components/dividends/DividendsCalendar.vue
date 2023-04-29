<template>
  <client-only>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="calendar-container">
          <v-calendar
            class="dividend-calendar"
            title-position="left"
            :attributes="calendarAttributes"
            @dayclick="onDayClick"
            @did-move="onMonthChange"
          />
        </v-col>
        <v-col cols="12" md="8">
          <dividends-log
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

<script setup lang="ts">
import { currentDate } from '~/lib/utils/date'
import StockDividendLogs from '~/models/StockDividendLogs'

// Props
const props = defineProps({
  stockDividendLogs: {
    type: StockDividendLogs,
    required: true
  }
})

// Data
const visibleCalendarDate = ref(currentDate().toDate())
const activeCalendarDate = ref(undefined)
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

const activeDayDividendLogs = computed(() => {
  return props.stockDividendLogs.forDate(
    activeCalendarDate.value
  ) as StockDividendLogs
})

const activeMonthDividendLogs = computed(() => {
  return props.stockDividendLogs.forMonth(activeMonth.value, activeYear.value)
})

const activeDividendLogs = computed(() => {
  return logDetailMode.value === LogDetailModes.day
    ? activeDayDividendLogs.value
    : activeMonthDividendLogs.value
})

const activeModeDate = computed(() => {
  return activeCalendarDate.value || visibleCalendarDate.value
})

const activeMonthPayDates = computed(() => {
  return activeMonthDividendLogs.value.payDates()
})

const activeMonth = computed(() => {
  return visibleCalendarDate.value.getMonth()
})

const activeYear = computed(() => {
  return visibleCalendarDate.value.getFullYear()
})

// Methods
const onDayClick = (calendarDay: any) => {
  logDetailMode.value = LogDetailModes.day
  activeCalendarDate.value = calendarDay.date
}

const onMonthChange = (page: any) => {
  const selectedPage = page[0]
  const selectedMonth = selectedPage.month - 1
  visibleCalendarDate.value = new Date(selectedPage.year, selectedMonth, 1)
  logDetailMode.value = LogDetailModes.month
  activeCalendarDate.value = undefined
}

const onDividendDayLogClose = () => {
  logDetailMode.value = LogDetailModes.month
  activeCalendarDate.value = undefined
}
</script>

<style scoped lang="scss">
.calendar-container {
  display: inline-table;
}
:deep(.dividend-calendar) {
  @media only screen and (max-width: 960px) {
    width: 100%;
  }
}
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
