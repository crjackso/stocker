<template>
  <section>
    <page-header text="Portfolios"></page-header>
    <v-text-field
      placeholder="Ticker Symbol"
      v-model="tickerEntry"
    />
    <v-btn @click="onSave">
      Search
    </v-btn>
    <v-btn @click="onDividendFetch">
      Dividend
    </v-btn>
    <stocks-previous-close-card
      v-if="stockPreviousClose"
      :previous-close="stockPreviousClose"
      />
  </section>
</template>

<script setup>
  const { $stockApi } = useNuxtApp()

  const stockPreviousClose = ref(undefined)
  const stockDividendLog = ref(undefined)
  const tickerEntry = ref(undefined)

  const tickerSymbol = computed(()=> {
    return tickerEntry.value?.toUpperCase()?.trim()
  })

  useHead({
    title: 'Portfolios'
  })

  const onSave = async()=> {
    stockPreviousClose.value = await $stockApi.previousClose(tickerSymbol.value)
  }

  const onDividendFetch = async()=> {
    stockDividendLog.value = await $stockApi.dividends(tickerSymbol.value)
  }
</script>
