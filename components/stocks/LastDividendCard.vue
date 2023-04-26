<template>
  <div>
    Ticker Symbol: {{ tickerSymbol }}
    Ex-Dividend Date: {{ exDividendDate }}
    Pay Date: {{ payDate }}
  </div>
</template>

<script setup lang="ts">
import StockDividendLog from '~/models/StockDividendLog'

const props = defineProps({
  dividendLog: {
    type: StockDividendLog,
    required: true
  }
})

const exDividendDate = computed(() => {
  return props.dividendLog.exDividendDate
})

const payDate = computed(() => {
  return props.dividendLog.payDate
})

const tickerSymbol = computed(() => {
  return props.dividendLog.tickerSymbol
})

</script>
