<template>
  <section>
    <page-header text="Stock Search" />

    <stocks-previous-close-form
      class="mb-3"
      :loading="loading"
      @submit="onPreviousCloseSubmit"
    />

    <v-divider></v-divider>

    <stocks-portfolio-summary :tickers="currentTickerSymbols" />
  </section>
</template>

<script setup lang="ts">
const currentTickerSymbols = ref('')
const loading = ref(false)

useHead({
  title: 'Portfolios'
})

const onPreviousCloseSubmit = (tickerSymbols: string) => {
  currentTickerSymbols.value = tickerSymbols
}
</script>
