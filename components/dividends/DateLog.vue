<template>
  <div>
    <v-icon
      v-if="inDayMode"
      icon="circle-xmark"
      role="button"
      color="secondary"
      class="close-icon"
      :title="closeIconTitle"
      @click="$emit('close')"
    />

    <h2>{{ title }}</h2>

    <div v-if="noDividends">No dividends exist for this date.</div>

    <template v-else>
      <dividends-log-summary
        class="my-4"
        :stock-dividend-logs="props.stockDividendLogs"
      />
      <dividends-log-list :stock-dividend-logs="props.stockDividendLogs" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { StockDividendLog } from '~/types/stocks'
import { formatDate, monthName } from '~/utils/date'

const props = defineProps({
  stockDividendLogs: {
    type: Array<StockDividendLog>,
    required: true
  },
  payDate: {
    type: Date,
    required: true
  },
  mode: {
    type: String,
    required: true,
    validator(value: string) {
      return ['month', 'day'].includes(value)
    }
  }
})

defineEmits(['close'])

const noDividends = computed(() => {
  return !props.stockDividendLogs?.length
})

const month = computed(() => {
  return monthName(props.payDate)
})

const year = computed(() => {
  return props.payDate?.getFullYear()
})

const inDayMode = computed(() => {
  return props.mode === 'day'
})

const closeIconTitle = computed(() => {
  return `Close the the detail screen for ${formattedPayDate.value}`
})

const title = computed(() => {
  let date = ''
  if (inDayMode.value) {
    date = `${formattedPayDate.value}`
  } else {
    date = `${month.value} ${year.value}`
  }
  return `Payments for ${date}`
})

const formattedPayDate = computed(() => {
  return formatDate(props.payDate, 'MMMM D, YYYY')
})
</script>

<style scoped lang="scss">
h2 {
  display: inline;
}

.close-icon {
  display: inline;
  margin-left: -31px;
  margin-right: 7px;
}

:deep(.pay-date-title) {
  font-size: 1.2em;
}

:deep(.v-list-item__prepend) {
  padding-right: 10px;
}
</style>
