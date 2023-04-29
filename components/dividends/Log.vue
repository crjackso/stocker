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

    <v-list lines="one">
      <v-list-item
        v-for="log in stockDividendLogs"
        :key="log.tickerSymbol"
        :title="log.stockDetails.fullName()"
        :subtitle="logCardSubtitle(log)"
        elevation="2"
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
    </v-list>
  </div>
</template>

<script lang="ts" setup>
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

:deep(.v-list-item__prepend) {
  padding-right: 10px;
}
</style>
