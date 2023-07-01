<template>
  <div>
    <h1>Dividends Calendar</h1>
    <dividends-calendar :stock-dividend-logs="stockDividendLogs" />
  </div>
</template>

<script setup lang="ts">
import StockDividendLogs from '~/models/StockDividendLogs'
const { $api } = useNuxtApp()

useHead({
  title: 'Dividend Calendar'
})

// Data
const stockDividendLogs = ref<StockDividendLogs>(new StockDividendLogs())

// Methods
const fetchPortfolioDividends = async () => {
  // https://stackoverflow.com/questions/74759799/nuxt-3-ssr-usefetch-returning-null-on-page-refresh
  await nextTick()

  stockDividendLogs.value = await $api.stocks.portfolioDividends(portfolio)
}

const portfolio = 'avuv, gpn, mpq , schd, smh, tfc , tgt , vnq , voo , vti'

// Lifecycle
onMounted(async () => {
  await fetchPortfolioDividends()
})
</script>
