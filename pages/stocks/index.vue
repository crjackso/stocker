<template>
  <section>
    <page-header text="Portfolios"></page-header>

    <stocks-previous-close-form class="mb-3" @submit="onPreviousCloseSubmit" />

    <v-divider></v-divider>

    <stocks-previous-close-card
      v-for="previousClose in previousCloseQuotes"
      :key="previousClose.ticker"
      class="my-3"
      :previous-close="previousClose"
    />
  </section>
</template>

<script setup lang="ts">
import StockPreviousClose from '~/models/StockPreviousClose'

const { $api } = useNuxtApp()
const previousCloseQuotes = ref<StockPreviousClose[]>()

useHead({
  title: 'Portfolios'
})

const onPreviousCloseSubmit = async (tickerSymbols: string) => {
  previousCloseQuotes.value = await $api.stocks.previousClose(tickerSymbols)
}
</script>
