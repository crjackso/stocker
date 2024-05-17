<template>
  <section>
    <v-container>
      <v-row>
        <v-col
          v-for="stock in stocks"
          :key="stock.tickerSymbol"
          :sm="columnCount"
          cols="12"
        >
          <stocks-previous-close-card :stock="stock" :pending="pending" class="my-3" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import type { Stock } from '~/types/stocks'

const props = defineProps({
  stocks: {
    type: Array<Stock>,
    required: true
  },
  pending: { type: Boolean }
})

const columnCount = computed(() =>
  props.stocks.length === 1 ? 12 : 6
)
</script>

<style lang="scss" scoped></style>
