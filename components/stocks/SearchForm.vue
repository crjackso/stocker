<template>
  <section>
    <div v-if="error">
      An expected error occurred while fetching market movers.
      {{ error.message }}
    </div>

    <stocks-previous-close-form class="mb-3" :pending="pending" @submit="onTickerUpdate" />

    <v-divider />

    <div v-show="pending">Loading...</div>

    <stocks-stock-list :stocks="stocks" />

    <div v-if="noResultsFound" class="text-center">
      <v-icon icon="fa-circle-exclamation" color="primary" />
      No results found
    </div>
  </section>
</template>

<script setup lang="ts">
import gql from 'graphql-tag'
import useTickers from '~/composables/stocks/useTickers'
import type { Stock } from '~/types/stocks'

const tickers = ref('')

const noResultsFound = computed(() => {
  return !pending.value && tickers.value?.length && !stocks.value?.length
})

const formattedTickers = useTickers(tickers)

const query = gql`
  query stocks($input: StockWhereInput!) {
    getStocks(input: $input) {
      id
      assetType
      companyName
      fiftyTwoWeekLow
      fiftyTwoWeekHigh
      lastPrice
      lastPriceAsOfDate
      logoUrl
      tickerSymbol
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

const fetchOptions: GraphqlQueryOptions<Stock[]> = {
  default: () => [],
  transform: mapStocks,
  immediate: false
}

const pending = computed(() => {
  return status.value === 'pending'
})

const {
  data: stocks,
  status,
  error,
  refresh
} = await useGraphql<Stock[]>(`stocks:${tickers.value}`, query, variables, fetchOptions)

const onTickerUpdate = async (updatedTickers: string) => {
  tickers.value = updatedTickers
  await refresh()
}
</script>
