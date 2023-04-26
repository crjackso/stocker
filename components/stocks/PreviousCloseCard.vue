<template>
  <div>
    {{ lastClosePrice }}
    As of: {{ asOfDate  }}
  </div>
</template>

<script setup lang="ts">
  import StockPreviousClose from '~/models/StockPreviousClose'

  const props = defineProps({
    previousClose: {
      type: StockPreviousClose,
      required: true
    }
  })

  const lastClosePrice = computed(() => {
    return props.previousClose.price
  })

  const asOfDate = computed(() => {
    return props.previousClose.asOfDate()
  })

</script>
