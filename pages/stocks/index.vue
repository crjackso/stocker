<template>
  <section>
    <page-header text="Stock Search"></page-header>

    <stocks-previous-close-form
      class="mb-3"
      @submit="onPreviousCloseSubmit"
      :loading="loading"
    />

    <v-divider></v-divider>

    <stocks-previous-close-card
      v-for="previousClose in previousCloseQuotes"
      :loading="loading"
      :key="previousClose.ticker"
      :previous-close="previousClose"
      class="my-3"
    />
  </section>
</template>

<script setup lang="ts">
import StockPreviousClose from '~/models/StockPreviousClose'

const { $api } = useNuxtApp()
const previousCloseQuotes = ref<StockPreviousClose[]>()
const loading = ref(false)

useHead({
  title: 'Portfolios'
})

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const onPreviousCloseSubmit = async (tickerSymbols: string) => {
  loading.value = true
  try {
    await sleep(2000)
    previousCloseQuotes.value = await $api.stocks.previousClose(tickerSymbols)
  } finally {
    loading.value = false
  }
}
</script>
