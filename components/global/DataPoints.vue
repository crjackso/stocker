<template>
  <v-list :class="pointsClass">
    <v-list-item
      v-for="dataPoint in dataPoints"
      :key="dataPoint.label"
      :title="dataPoint.label"
      :subtitle="dataPoint.text"
      :class="dataPoint.className || ''"
    />
  </v-list>
</template>

<script setup lang="ts">
import type { DataPoint } from '~/types'

const props = defineProps({
  dataPoints: {
    type: Array<DataPoint>,
    required: true
  },
  row: {
    type: Boolean
  }
})

const pointsClass = computed(() => {
  return props.row ? 'd-flex' : ''
})
</script>
