<template>
  <v-card
    class="mx-auto"
    max-width="368"
    :loading="pending"
    :disabled="pending"
  >
    <div v-if="stock.logoUrl">
      <v-img height="100" :src="stock.logoUrl" />
      <v-divider color="var(--secondary)" thickness="4"/>
    </div>

    <v-card-item>
      <v-card-title>{{ stock.tickerSymbol }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ stock.companyName }}</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div>
        <strong class="pr-3">Current Price:</strong>
        <span>{{ previousClosePriceFormatted }}</span>
      </div>

      <stocks-fifty-two-week-display :stock="stock" class="my-2" />

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
import useStock from '~/composables/stocks/useStock';
import type { DataPoint } from '~/types'
import type { Stock } from '~/types/stocks';

const props = defineProps({
  stock: {
    type: Object as PropType<Stock>,
    required: true
  },
  pending: {
    type: Boolean,
    default: false
  }
})

const {
  assetType,
  previousClosePriceFormatted,
  previousCloseAsOfDateFormatted
} = useStock(toRef(props.stock))

const summaryPoints = computed((): Array<DataPoint> => {
  return [
    { label: 'As Of', text: previousCloseAsOfDateFormatted.value },
    { label: 'Asset Type', text: assetType.value },
  ]
})
</script>

<style lang="scss" scoped>
:deep(.v-card-subtitle) {
  white-space: normal;
}
</style>
