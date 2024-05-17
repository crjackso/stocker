<template>
  <v-card
    class="mx-auto"
    max-width="368"
    :loading="loading && 'secondary'"
    :title="previousClose.tickerSymbol"
    :subtitle="companyName"
    :disabled="loading"
  >
    <v-divider color="var(--secondary)" thickness="4"/>

    <v-card-text>
      <div>
        <strong class="pr-3">Current Price:</strong>
        <span>{{ lastClosePrice }}</span>
      </div>

      <stocks-fifty-two-week-display
        :price="previousClose.lastPrice"
        :low="previousClose.fiftyTwoWeekLow"
        :high="previousClose.fiftyTwoWeekHigh"
        class="my-2"
      />
      <data-points :data-points="summaryPoints" />
    </v-card-text>

    <v-divider/>

    <v-card-actions>
      <v-btn>View Details </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { DataPoint } from '~/types'
import type { StockPreviousClose } from '~/types/stocks';
import useStockPreviousClose from '~/composables/stocks/useStockPreviousClose'

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
  return [{ label: 'As Of', text: asOfDate.value }]
})

const { previousClose } = toRefs(props)
const { asOfDate, companyName, lastClosePrice } = useStockPreviousClose(previousClose)

// const companyName = computed(() => {
//   return props.previousClose.companyProfile?.name
// })

// const lastClosePrice = computed(() => {
//   return toCurrency(props.previousClose.lastPrice)
// })

// const asOfDate = computed(() => {
//   return formatDate(props.previousClose.updatedAt)
// })
</script>

<style lang="scss" scoped>
:deep(.v-card-subtitle) {
  white-space: normal;
}
</style>
