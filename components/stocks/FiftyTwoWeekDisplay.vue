<template>
  <div>
    <span>52 Week High/Low</span>
    <v-slider
      v-if="hasAllInformation"
      readonly
      show-ticks
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
  </div>
</template>

<script setup lang="ts">
import { toCurrency } from '~/lib/utils/general'

const props = defineProps<{
  price: number | string
  low?: number
  high?: number
}>()

const hasAllInformation = computed(() => {
  return props.low && props.high
})
</script>
