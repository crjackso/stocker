<template>
  <section>
    <div v-if="error">
      An expected error occurred while fetching market movers.
      {{ error.message }}
    </div>
    <div v-else>
      <markets-mover-list title="Market Gainers" :market-movers="marketMovers.gainers" gainers />
      <markets-mover-list title="Market Losers" :market-movers="marketMovers.losers" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { type MarketMoverResponse } from '~/types/markets'

const defaultMarketMoverResponse: MarketMoverResponse = {
  gainers: [],
  losers: []
}

const { data: marketMovers, error } = await useAPI<MarketMoverResponse>('/markets/movers', {
  default: () => defaultMarketMoverResponse
})
</script>
