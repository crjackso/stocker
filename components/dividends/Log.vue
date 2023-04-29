<template>
  <div>
    <v-icon
      v-if="inDayMode"
      icon="circle-xmark"
      role="button"
      color="primary"
      class="close-icon"
      @click="$emit('close')"
    />

    <h2>{{ title }}</h2>

    <div v-if="noDividends">
      No dividends exist for this date.
    </div>

    <v-list>
      <v-list-item
        v-for="(group, key) in stockDividendLogsByDate"
        :title="key"
        class="pt-3"
        elevation="2"
      >
        <template v-slot:title>
          <v-icon icon="fa-calendar-days" color="secondary"></v-icon>
          <span class="pay-date-title px-2">{{ key }}</span>
        </template>
        <v-list-group value="Users" class="my-4">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-for="log in group"
              :key="log.tickerSymbol"
              :title="log.stockDetails.fullName()"
              :subtitle="logCardSubtitle(log)"
            >
              <template v-slot:prepend>
                <v-img
                  v-if="log.stockDetails?.logoUrl"
                  :src="log.stockDetails?.logoUrl"
                  href="Company Logo"
                  width="50"
                  height="50"
                />
                <span v-else class="etf-label">
                  ETF
                </span>
              </template>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import { groupBy } from '~/lib/utils/general'
import { formatDate, monthName } from '~/lib/utils/date'
import StockDividendLog from '~/models/StockDividendLog'

const props = defineProps({
  stockDividendLogs: {
    type: Array<StockDividendLog>,
    required: true
  },
  payDate: {
    type: Date,
    required: true
  },
  mode: {
    type: String,
    validator(value: string) {
      return ['month', 'day'].includes(value)
    }
  }
})

// Computed
const noDividends = computed(() => {
  return !props.stockDividendLogs?.length
})

const month = computed(() => {
  return monthName(props.payDate)
})

const year = computed(() => {
  return props.payDate?.getFullYear()
})

const inDayMode = computed(() => {
  return props.mode === 'day'
})

const title = computed(() => {
  let date = ''
  if (inDayMode.value) {
    date = `${formattedPayDate.value}`
  } else {
    date = `${month.value} ${year.value}`
  }
  return `Payments for ${date}`
})

const formattedPayDate = computed(() => {
  return formatDate(props.payDate)
})

const sortedStockDividendLogs = computed(() => {
  return props.stockDividendLogs.sort((log1: StockDividendLog, log2: StockDividendLog) => {
    return (<Date>log1.payDate).getTime() - (<Date>log2.payDate).getTime()
  })
})

const stockDividendLogsByDate = computed(() => {
  return groupBy(sortedStockDividendLogs.value, (log: StockDividendLog) => {
    return log.payDateFormatted
  })
})

// Methods
const logCardSubtitle = (stockDividendLog: StockDividendLog) => {
  return `Pay Date: ${stockDividendLog.payDateFormatted}`
}
</script>

<style scoped lang="scss">
h2 {
  display: inline;
}

.close-icon {
  display: inline;
  margin-left: -31px;
  margin-right: 7px;
}

.etf-label {
  width: 50px;
}

:deep(.pay-date-title) {
  font-size: 1.2em;
}

:deep(.v-list-item__prepend) {
  padding-right: 10px;
}
</style>
