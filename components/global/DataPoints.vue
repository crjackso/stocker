<template>
  <v-list>
    <v-list-item
      v-for="dataPoint in dataPoints"
      :key="dataPoint.label"
      :title="dataPoint.label"
      :subtitle="dataPoint.text"
    />
  </v-list>
</template>

<script setup lang="ts">
import type { DataPoint } from '~/types'

defineProps({
  dataPoints: {
    type: Array<DataPoint>,
    required: true
  }
})
</script>
