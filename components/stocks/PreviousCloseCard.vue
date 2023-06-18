<template>
  <v-card
    class="mx-auto"
    max-width="368"
    :title="previousClose.ticker"
    :subtitle="companyName"
  >
    <v-divider color="var(--secondary)" thickness="4"></v-divider>

    <v-card-text>
      <v-card-item
        class="pa-0"
        title="Current Price"
        :subtitle="previousClose.priceFormatted"
      />

      <div>
        <strong class="pr-3">Current Price:</strong>
        <span>{{ previousClose.priceFormatted }}</span>
      </div>

      <stocks-fifty-two-week-display
        :price="previousClose.price"
        :low="previousClose.fiftyWeekLow"
        :high="previousClose.fiftyWeekHigh"
      />
      <data-points :data-points="summaryPoints" />
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn>View Details </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import StockPreviousClose from '~/models/StockPreviousClose'
import { DataPoint } from '~/types'

const props = defineProps({
  previousClose: {
    type: Object as PropType<StockPreviousClose>,
    required: true
  }
})

const summaryPoints = computed((): Array<DataPoint> => {
  return [
    { label: 'Price', text: props.previousClose.priceFormatted },
    { label: '52 Week Low', text: props.previousClose.fiftyWeekLow },
    { label: '52 Week High', text: props.previousClose.fiftyWeekHigh }
  ]
})

const companyName = computed(() => {
  return props.previousClose.companyProfile?.name
})
</script>

<style lang="scss" scoped>
:deep(.v-card-subtitle) {
  white-space: normal;
}
</style>
