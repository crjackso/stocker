<template>
  <div>
    <h1>
      Dividends Calendar
    </h1>
    <dividends-calendar :stock-dividend-logs="stockDividendLogs"/>
  </div>
</template>

<script setup>
const { $stockApi } = useNuxtApp()

useHead({
  title: 'Dividend Calendar'
})

// Data
const stockDividendLogs = ref([])

// Methods
const fetchPortfolioDividends = async () => {
  stockDividendLogs.value = await $stockApi.portfolioDividends()
}

// Lifecycle
onMounted(async () => {
  await fetchPortfolioDividends()
})

</script>
