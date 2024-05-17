<template>
  <stocks-previous-close-form
    class="mb-3"
    :pending="pending"
    @submit="onTickerUpdate"
  />

  <v-divider />

  <div v-show="pending">Loading...</div>

  <section v-if="previousCloseQuotes">
    <stocks-portfolio-summary :previous-close-quotes="previousCloseQuotes" />

    <div v-if="noResultsFound" class="text-center">
      <v-icon icon="fa-circle-exclamation" color="primary" />
      No results found
    </div>

    <div v-if="error">An error occurred: {{ error }}</div>
  </section>

  <div v-if="error">Something Happened! {{ error }}</div>
</template>

<script setup lang="ts">
import { gql } from 'graphql-tag'
import type { StockPreviousClose } from '~/types/stocks'

const { $api } = useNuxtApp()
const tickers = ref('')

const noResultsFound = computed(() => {
  return (
    !pending.value &&
    tickers.value?.length &&
    !previousCloseQuotes.value?.length
  )
})

const query = gql`
  query stocks($input: StockWhereInput!) {
    getStocks(input: $input) {
      id
      tickerSymbol
      companyName
      lastPrice
      fiftyTwoWeekLow
      fiftyTwoWeekHigh
      updatedAt
    }
  }
`

const variables = computed(() => {
  return {
    input: {
      tickerSymbol: {
        in: formattedTickers.value
      }
    }
  }
})

const formattedTickers = computed(() => {
  return tickers.value.split(',').map((item) => item.trim())
})

const fetchStocks = async (): Promise<StockPreviousClose[]> => {
  return await $api.query<StockPreviousClose[]>(query, variables.value)
}

const {
  data: previousCloseQuotes,
  error,
  pending,
  refresh
} = await useAsyncData<StockPreviousClose[]>(fetchStocks)

const onTickerUpdate = async (updatedTickers: string) => {
  tickers.value = updatedTickers
  await refresh()
}
</script>
