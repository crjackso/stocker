<template>
  <div class="log-summary pt-2">
    <h3>Summary</h3>
    <data-points :data-points="summaryPoints" />
  </div>
</template>

<script lang="ts" setup>
import type { StockDividendLog } from '~/types/stocks'
import { totalCashAmount } from '~/utils/dividends'

const props = defineProps({
  stockDividendLogs: {
    type: Array<StockDividendLog>,
    required: true
  }
})

const summaryPoints = computed(() => {
  return [
    {
      label: 'Total Payment Amount',
      text: totalCashAmount(props.stockDividendLogs)
    }
  ]
})
</script>

<style scoped lang="scss">
.log-summary {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
</style>
