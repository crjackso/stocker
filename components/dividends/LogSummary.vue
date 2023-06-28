<template>
  <div class="log-summary pt-2">
    <h3>Summary</h3>
    <data-points :data-points="summaryPoints" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  stockDividendLogs: {
    type: StockDividendLogs,
    required: true
  }
})

// Computed
const summaryPoints = computed(() => {
  return [
    {
      label: 'Total Payment Amount',
      text: props.stockDividendLogs.totalCashAmount()
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
