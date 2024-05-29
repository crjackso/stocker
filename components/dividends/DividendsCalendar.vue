<template>
  <div v-if="pending">Pending</div>
  <div v-if="error">
    An unexpected error occurred
    {{ error }}
  </div>
  <v-container v-else>
    <v-row>
      <v-col cols="12" md="4" class="calendar-container">
        <v-calendar
          class="dividend-calendar"
          title-position="left"
          :attributes="calendarAttributes"
          key="tickerSymbol"
          @dayclick="onDayChange"
          @did-move="onMonthChange"
        />
      </v-col>
      <v-col cols="12" md="8">
        <dividends-date-log
          :mode="logDetailMode"
          :stock-dividend-logs="activeDividendLogs"
          :pay-date="activeModeDate"
          @close="onDividendDayLogClose"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import useDividendFetch from '~/composables/dividends/useDividendFetch'
import useDividendsCalendar from '~/composables/dividends/useDividendsCalendar'
import { currentDate } from '~/utils/date'

const props = defineProps({
  tickerSymbols: {
    type: String,
    required: true
  }
})

const { stockDividendLogs, pending, error } = await useDividendFetch(props.tickerSymbols)
const visibleCalendarDate: Ref<Date> = ref(currentDate().toDate())
const activeCalendarDate: Ref<Date | undefined> = ref(undefined)
const LogDetailModes = {
  month: 'month',
  day: 'day'
}

const { activeCalendarDateFormatted, activeDividendLogs, activeModeDate, activeMonthPayDates, logDetailMode } =
  useDividendsCalendar(stockDividendLogs, activeCalendarDate, visibleCalendarDate)

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
      dates: [activeCalendarDateFormatted.value]
    })
  }

  return attributes
})

const onDayChange = (calendarDay: { date: Date }) => {
  logDetailMode.value = LogDetailModes.day
  activeCalendarDate.value = calendarDay.date
}

const onMonthChange = (page: Array<{ month: number; year: number }>) => {
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
