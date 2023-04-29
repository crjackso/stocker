<template>
  <div :class="dataPointClass">
    <div class="stocker-data-point__key">
      {{ dataPoint.key }}<span v-if="isMobile">:</span>
    </div>
    <div class="stocker-data-point__value">
      {{ dataPoint.value }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataPoint: {
    type: Object,
    default() {
      return { key: '', value: '' }
    }
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const dataPointClass = computed(() => {
  return props.isMobile ? 'stocker-data-point-mobile' : 'stocker-data-point'
})
</script>

<style lang="scss" scoped>
.stocker-data-point__key {
  font-size: 16px;
}

.stocker-data-point {
  .stocker-data-point__value {
    font-size: 24px;
  }
}

.stocker-data-point-mobile {
  display: flex;
  justify-content: space-between;

  .stocker-data-point__value {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
