<template>
  <client-only>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="calendar-container">
          <v-calendar
            class="dividend-calendar"
            title-position="left"
            :attributes="calendarAttributes"
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
  </client-only>
</template>

<script setup lang="ts">
import gql from 'graphql-tag'
import type { StockDividendLog } from '~/types/stocks'
import { currentDate } from '~/utils/date'
import { payDates, forMonth, forDate } from '~/utils/dividends'

const { $api } = useNuxtApp()

const props = defineProps({
  tickerSymbols: {
    type: String,
    required: true
  }
})

// const stockDividendLogs: Ref<StockDividendLog[]> = ref([])
const visibleCalendarDate = ref(currentDate().toDate())
const activeCalendarDate: Ref<Date | undefined> = ref(undefined)
const LogDetailModes = {
  month: 'month',
  day: 'day'
}
const logDetailMode = ref(LogDetailModes.month)

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
  if (!stockDividendLogs.value?.length) return []
  return forDate(stockDividendLogs.value, activeCalendarDate.value)
})

const activeMonthDividendLogs = computed(() => {
  if (!stockDividendLogs.value?.length) return []
  return forMonth(stockDividendLogs.value, activeMonth.value, activeYear.value)
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
  return payDates(activeMonthDividendLogs.value)
})

const activeMonth = computed(() => {
  return visibleCalendarDate.value.getMonth()
})

const activeYear = computed(() => {
  return visibleCalendarDate.value.getFullYear()
})

// Methods
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

const formattedTickers = computed(() => {
  return props.tickerSymbols.split(',').map((item) => item.trim())
})

const variables = computed(() => {
  return {
    input: {
      tickerSymbol: {
        in: formattedTickers.value
      }
    }
  }
})

const query = gql`
  query getDividends($input: DividendWhereInput!) {
    getDividends(input: $input) {
      id
      tickerSymbol
      payDate
      cashAmount
      exDividendDate
    }
  }
`

const fetchDividendLogs = async (): Promise<StockDividendLog[]> => {
  return await $api.query<StockDividendLog[]>(query, variables.value)
}

const { data: stockDividendLogs } = await useAsyncData<StockDividendLog[]>(
  fetchDividendLogs
)
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
