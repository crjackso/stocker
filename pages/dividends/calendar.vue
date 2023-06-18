<template>
  <div>
    <h1>Dividends Calendar</h1>
    <dividends-calendar :stock-dividend-logs="stockDividendLogs" />
    <br />
    blah: {{ blah }}
  </div>
</template>

<script setup lang="ts">
import StockPreviousClose from '~/models/StockPreviousClose'
const { $api } = useNuxtApp()

useHead({
  title: 'Dividend Calendar'
})

// Data
const stockDividendLogs = ref(new StockDividendLogs())
const blah = ref<StockPreviousClose>()

// Methods
const fetchPortfolioDividends = async () => {
  try {
    // https://stackoverflow.com/questions/74759799/nuxt-3-ssr-usefetch-returning-null-on-page-refresh
    await nextTick()

    const previousClose: StockPreviousClose = await $api.stocks.previousClose(
      'AAPL'
    )
    blah.value = previousClose
    // stockApi.
    // await useFetch('/api/stocks', {
    //   onResponse({ response }) {
    //     const { _data } = response
    //     const logs = _data.stockDividendLogs.map(
    //       (log: any) => new StockDividendLog(log)
    //     )

    //
    //     stockDividendLogs.value = new StockDividendLogs(logs)

    //     return logs
    //   }
    // })
    // stockDividendLogs.value = data?.map((log) => {
    //   new StockDividendLog(log)
    // })
  } catch (error) {
    debugger
  }
}

// Lifecycle
onMounted(async () => {
  await fetchPortfolioDividends()
  // console.log('mounted - fetching')
  // // https://stackoverflow.com/questions/74759799/nuxt-3-ssr-usefetch-returning-null-on-page-refresh
  // await nextTick()
  // const { data } = await useFetch('/api/stocks')
  // blah.value = data
})

// const { data } = await useAsyncData(() => {
//   return $fetch('/api/users')
// })
</script>
