<template>
  <section>
    <h3>Breakdown By Date</h3>
    <v-list>
      <v-list-item
        v-for="(group, key) in stockDividendLogsByDate"
        :key="key"
        :title="key"
        class="pt-3"
        elevation="2"
      >
        <template #title>
          <v-icon icon="fa-calendar-days" color="secondary"></v-icon>
          <span class="pay-date-title px-2">{{ key }}</span>
        </template>

        <v-list-group value="Users" class="my-4">
          <template #activator>
            <v-list-item
              v-for="log in group"
              :key="log.ticker"
              :title="log.name()"
              :subtitle="logCardSubtitle(log)"
            >
              <template #prepend>
                <v-img
                  v-if="log.stockDetails?.logoUrl"
                  :src="log.stockDetails?.logoUrl"
                  href="Company Logo"
                  width="50"
                  height="50"
                />
                <span v-else class="etf-label"> ETF </span>
              </template>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list-item>
    </v-list>
  </section>
</template>

<script lang="ts" setup>
import StockDividendLog from '~/models/StockDividendLog'

const props = defineProps({
  stockDividendLogs: {
    type: StockDividendLogs,
    required: true
  }
})

// Computed
const stockDividendLogsByDate = computed(() => {
  return sortedStockDividendLogs.value?.groupedByDate()
})

const sortedStockDividendLogs = computed(() => {
  return props.stockDividendLogs.sorted()
})

// Methods
const logCardSubtitle = (stockDividendLog: StockDividendLog) => {
  return `Pay Date: ${stockDividendLog.payDateFormatted}`
}
</script>
