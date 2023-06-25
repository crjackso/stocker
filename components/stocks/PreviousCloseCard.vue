<template>
  <v-card
    class="mx-auto"
    max-width="368"
    :loading="loading && 'secondary'"
    :title="previousClose.ticker"
    :subtitle="companyName"
    :disabled="loading"
  >
    <v-divider color="var(--secondary)" thickness="4"></v-divider>

    <v-card-text>
      <div>
        <strong class="pr-3">Current Price:</strong>
        <span>{{ previousClose.priceFormatted }}</span>
      </div>

      <stocks-fifty-two-week-display
        :price="previousClose.price"
        :low="previousClose.fiftyWeekLow"
        :high="previousClose.fiftyWeekHigh"
        class="my-2"
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
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const summaryPoints = computed((): Array<DataPoint> => {
  return [{ label: 'As Of', text: props.previousClose.asOfDate }]
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
