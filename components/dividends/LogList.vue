<template>
  <section>
    <h3>Breakdown By Date</h3>
    <v-list>
      <v-list-item
        v-for="(group, key) in groupedByDate"
        :key="key"
        :title="key"
        class="pt-3"
        elevation="2"
      >
        <template #title>
          <v-icon icon="fa-calendar-days" color="secondary" />
          <span class="pay-date-title px-2">{{ key }}</span>
        </template>

        <v-list-group value="Users" class="my-4">
          <template #activator>
            <v-list-item
              v-for="log in group"
              :key="log.tickerSymbol"
              :title="log.stock?.title"
              :subtitle="logCardSubtitle(log)"
            >
              <template #prepend>
                <v-img
                  v-if="log.stock?.logoUrl"
                  :src="log.stock?.logoUrl"
                  href="Company Logo"
                  width="50"
                  height="50"
                />
              </template>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list-item>
    </v-list>
  </section>
</template>

<script lang="ts" setup>
import useDividendsCalendar from '~/composables/dividends/useDividendsCalendar'
import type { StockDividendLog } from '~/types/stocks'
import { formatDate } from '~/utils/date'

const props = defineProps({
  stockDividendLogs: {
    type: Array<StockDividendLog>,
    required: true
  }
})

const {stockDividendLogs } = toRefs(props)
const { groupedByDate } = useDividendsCalendar(stockDividendLogs)

const logCardSubtitle = (stockDividendLog: StockDividendLog) => {
  return `Pay Date: ${formatDate(stockDividendLog.payDate)}`
}
</script>
