<template>
  <div>
    <h2>{{ title }}</h2>
    <v-btn
      class="d-block"
      @click="$emit('close')"
      v-if="inDayMode"
    >
      Close
    </v-btn>

    <span v-if="noDividends">
      No dividends exist for this date.
    </span>
    <ul>
      <li v-for="log in stockDividendLogs" :key="log.tickerSymbol">
        <div>
          {{ log.tickerSymbol }}: {{ log.payDate }}
        </div>
      </li>
    </ul>

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
  if (inDayMode.value) {
    return formattedPayDate.value
  } else {
    return `${month.value} ${year.value} Payments`
  }
})
const formattedPayDate = computed(() => {
  return formatDate(props.payDate)
})
</script>
