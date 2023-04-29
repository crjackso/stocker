<template>
  <div class="log-summary pt-2">
    <h3>Summary</h3>
    <data-point v-for="point in dataPoints" :dataPoint="point" />
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
const dataPoints = computed(() => {
  return [
    {
      key: 'Total Payment Amount',
      value: props.stockDividendLogs.totalCashAmount()
    }
  ]
})

// Methods
</script>

<style scoped lang="scss">
.log-summary {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
</style>
