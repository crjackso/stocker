<template>
  <section>
    <div v-if="error">{{ error }}</div>
    <div v-if="pending">Loading...</div>

    <div v-if="portfolio">
      <h1>Portfolio: {{ portfolio.title }}</h1>
      <stocks-stock-list :stocks="stocks" />
    </div>
  </section>
</template>

<script setup lang="ts">
import gql from 'graphql-tag'
import type { Nullable } from '~/types'
import type { Portfolio } from '~/types/stocks'
import { mapPortfolio } from '~/utils/transformers/portfolios'

const portfolioId = 1 // TODO

const query = gql`
  query getPortfolio($id: Int!) {
    getPortfolio(id: $id) {
      id
      title
      user {
        id
        email
      }
      stocks {
        id
        tickerSymbol
        assetType
        lastPrice
        lastPriceAsOfDate
      }
    }
  }
`

const variables = computed(() => {
  return {
    id: portfolioId
  }
})

const fetchOptions = {
  lazy: true,
  transform: (portfolio: Nullable<Portfolio>): Nullable<Portfolio> => {
    return mapPortfolio(portfolio)
  }
}

const stocks = computed(() => {
  return portfolio.value?.stocks || []
})

const {
  data: portfolio,
  pending,
  error
} = await useGraphql<Nullable<Portfolio>>(`portfolio:${portfolioId}`, query, variables, fetchOptions)
</script>
