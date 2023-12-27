<template>
  <section>
    <page-header text="Stock Search" />

    <stocks-previous-close-form
      class="mb-3"
      :loading="loading"
      @submit="onPreviousCloseSubmit"
    />

    <v-divider></v-divider>

    <stocks-previous-close-card
      v-for="previousClose in previousCloseQuotes"
      :key="previousClose.ticker"
      :loading="loading"
      :previous-close="previousClose"
      class="my-3"
    />

    <div v-if="noResultsFound">No results found</div>
  </section>
</template>

<script setup lang="ts">
import StockPreviousClose from '~/models/StockPreviousClose'

const { $api } = useNuxtApp()
const previousCloseQuotes = ref<StockPreviousClose[]>()
const currentTickerSymbols = ref('')
const loading = ref(false)

useHead({
  title: 'Portfolios'
})

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const onPreviousCloseSubmit = async (tickerSymbols: string) => {
  loading.value = true
  currentTickerSymbols.value = tickerSymbols
  try {
    await sleep(2000)
    previousCloseQuotes.value = await $api.stocks.previousClose(tickerSymbols)
  } finally {
    loading.value = false
  }
}

const noResultsFound = computed(() => {
  return (
    !previousCloseQuotes.value?.length &&
    !loading.value &&
    currentTickerSymbols.value
  )
})
</script>
