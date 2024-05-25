<template>
  <div v-if="hasAllInformation">
    <strong data-fifty-two-week-header>52 Week High/Low Info:</strong>
    <v-slider
      readonly
      show-ticks
      hide-details
      :model-value="previousClosePrice"
      :max="fiftyTwoWeekHigh"
      :min="fiftyTwoWeekLow"
      color="var(--secondary)"
    >
      <template #prepend>
        <span class="muted">{{ fiftyTwoWeekLowFormatted }}</span>
      </template>

      <template #append>
        <span class="muted">{{ fiftyTwoWeekHighFormatted }}</span>
      </template>

      <template #thumb-label="{ modelValue }">
        {{ toCurrency(modelValue) }}
      </template>
    </v-slider>

    <data-points :data-points="relativePricePoints" class="py-0" />
  </div>
</template>

<script setup lang="ts">
import type { Stock } from '~/types/stocks'
import useStock from '~/composables/stocks/useStock'
import { toCurrency } from '~/utils/general'

const props = defineProps({
  stock: {
    type: Object as PropType<Stock>,
      required: true
    }
  })

const {
  fiftyTwoWeekHigh,
  fiftyTwoWeekLow,
  fiftyTwoWeekLowFormatted,
  fiftyTwoWeekHighFormatted,
  percentageOff52WeekLow,
  percentageOff52WeekHigh,
  previousClosePrice
} = useStock(toRef(props.stock))

const hasAllInformation = computed(() => {
  return fiftyTwoWeekHigh.value && fiftyTwoWeekLow.value
})

const relativePricePoints = computed(() => {
  return [
    {
      label: '% from 52 Week Low',
      text: percentageOff52WeekLow.value
    },
    {
      label: '% from 52 Week High',
      text: percentageOff52WeekHigh.value
    }
  ]
})
</script>
