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
</script>

<style scoped>
h2 {
  display: inline;
}

.close-icon {
  display: inline;
  margin-left: -31px;
  margin-right: 7px;
}
</style>
