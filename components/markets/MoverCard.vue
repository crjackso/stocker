<template>
  <v-container class="pa-0">
    <v-row no-gutters class="border-b">
      <v-col cols="12" sm="4">
        <p class="pt-3 font-weight-bold">{{ marketMover.tickerSymbol }}</p>
        <p class="font-size-small">{{ marketMover.companyName }}</p>
      </v-col>
      <v-col>
        <data-points :data-points="summaryPoints" row />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { MarketMover } from '~/types/markets'
import type { DataPoint } from '~/types'

const props = defineProps({
  marketMover: {
    type: Object as PropType<MarketMover>,
    required: true
  }
})

const price = computed(() => {
  return toCurrency(props.marketMover.price)
})

const priceChange = computed(() => {
  return toCurrency(props.marketMover.change)
})

const changePercentage = computed(() => {
  return toPercentage(props.marketMover.changesPercentage / 100, 2)
})

const changePercentageClass = computed(() => {
  return props.marketMover.changesPercentage > 0 ? 'positive' : 'negative'
})

const summaryPoints = computed((): Array<DataPoint> => {
  return [
    { label: 'Price', text: price.value },
    { label: 'Change', text: priceChange.value },
    { label: '% Change', text: changePercentage.value, className: changePercentageClass.value }
  ]
})
</script>

<style lang="scss">
.positive {
  color: var(--positive);
}
.negative {
  color: var(--negative);
}
</style>
