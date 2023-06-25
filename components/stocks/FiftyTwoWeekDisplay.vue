<template>
  <div v-if="hasAllInformation">
    <strong data-fifty-two-week-header>52 Week High/Low Info:</strong>
    <v-slider
      readonly
      show-ticks
      hide-details
      :model-value="price"
      :max="high"
      :min="low"
      color="var(--secondary)"
    >
      <template #prepend>
        <span class="muted">{{ toCurrency(low) }}</span>
      </template>

      <template #append>
        <span class="muted">{{ toCurrency(high) }}</span>
      </template>

      <template #:thumb-label="{ modelValue }">
        {{ toCurrency(modelValue) }}
      </template>
    </v-slider>

    <data-points :data-points="relativePricePoints" class="py-0" />
  </div>
</template>

<script setup lang="ts">
import { toCurrency } from '~/utils/general'

const { percentageOff52WeekLow, percentageOff52WeekHigh } = useStocks()

const props = defineProps<{
  price: number | string
  low?: number
  high?: number
}>()

const hasAllInformation = computed(() => {
  return props.low && props.high
})

const relativePricePoints = computed(() => {
  return [
    {
      label: '% from 52 Week Low',
      text: percentageOff52WeekLow(props.price, props.low)
    },
    {
      label: '% from 52 Week High',
      text: percentageOff52WeekHigh(props.price, props.high)
    }
  ]
})
</script>
