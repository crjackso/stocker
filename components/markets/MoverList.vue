<template>
  <section>
    <v-list v-model:opened="open" density="compact" :lines="false" max-width="450">
      <v-list-group :value="title" class="pa-0" prepend-icon="fa-chart-line">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="title" class="pa-0" :class="headerClass"></v-list-item>
        </template>

        <markets-mover-card v-for="mover in trimmedMarketMovers" :key="mover.tickerSymbol" :market-mover="mover" />
      </v-list-group>
    </v-list>
  </section>
</template>

<script setup lang="ts">
import type { MarketMover } from '~/types/markets'

const MOVER_LIMIT = 60

const props = defineProps({
  marketMovers: {
    type: Array<MarketMover>,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  gainers: {
    type: Boolean
  }
})

const open = ref([props.title])

const headerClass = computed(() => {
  return props.gainers ? 'positive' : 'negative'
})

const trimmedMarketMovers = computed(() => {
  return props.marketMovers.slice(0, MOVER_LIMIT)
})
</script>

<style lang="scss">
::v-bind .v-list-group__header {
  &.positive {
    color: var(--positive);
  }
}
</style>
